import { GoogleGenAI, Type, Chat, GenerateContentResponse } from "@google/genai";
import { 
    QuizQuestion, Subject, ClassLevel, WrittenFeedback, 
    VisualExplanationScene, QuizDifficulty
} from "../types";

const API_KEY = process.env.API_KEY;
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const checkAiService = () => {
    if (!ai) throw new Error("Gemini AI service is not configured. The API_KEY is missing.");
};

const withTimeout = <T>(promise: Promise<T>, ms: number, context: string): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      const timeoutId = setTimeout(() => reject(new Error(`${context} timed out.`)), ms);
      promise.then((res) => { clearTimeout(timeoutId); resolve(res); }, (err) => { clearTimeout(timeoutId); reject(err); });
    });
};

// --- VIDEO GENERATION LOGIC ---
const demoVideoSchema = {
    type: Type.ARRAY,
    description: "An array of 7-8 scenes for a professional 4-minute summary video.",
    items: {
        type: Type.OBJECT,
        properties: {
            narration: { type: Type.STRING, description: "Detailed educational narration (min 100 words)." },
            image_prompt: { type: Type.STRING, description: "4K educational illustration prompt." },
        },
        required: ["narration", "image_prompt"]
    }
};

export const generateSingleDemoVideo = async (sourceText: string, language: string, classLevel: ClassLevel): Promise<VisualExplanationScene[]> => {
    checkAiService();
    const prompt = `Create a 4-minute chapter summary for ${classLevel}. Language: ${language}.
    Distill this text into 7-8 scenes with 100+ word narrations each:
    ${sourceText}`;
    
    const response: GenerateContentResponse = await withTimeout(ai!.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { responseMimeType: "application/json", responseSchema: demoVideoSchema }
    }), 240000, `Video Creation`);
    
    const blueprints = JSON.parse(response.text);
    const scenes: VisualExplanationScene[] = [];

    for (const bp of blueprints) {
        try {
            const imgResp = await withTimeout(ai!.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: [{ text: bp.image_prompt }],
            }), 70000, 'Image Gen');
            const part = imgResp.candidates?.[0]?.content?.parts.find(p => p.inlineData);
            if (part?.inlineData) scenes.push({ narration: bp.narration, imageBytes: part.inlineData.data });
        } catch (e) { console.error("Scene failed", e); }
    }
    return scenes;
};

// --- CONTENT RETRIEVAL ---
export const fetchChapterContent = async (classLevel: string, subject: string, info: string, details: string): Promise<string> => {
    checkAiService();
    const response = await ai!.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Comprehensive 2000-word explanation of ${info} for ${subject}, ${classLevel}.`,
        config: { tools: [{ googleSearch: {} }] }
    });
    return response.text;
};

export const createChatSession = (subject: Subject, classLevel: string, text: string) => {
    checkAiService();
    return ai!.chats.create({ 
        model: 'gemini-3-flash-preview',
        config: { systemInstruction: `You are StuBro AI tutoring ${classLevel} in ${subject}. Base context: ${text.substring(0, 1000)}` }
    });
};
