import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { 
    ClassLevel, Subject, VisualExplanationScene
} from "../types";

const API_KEY = process.env.API_KEY;
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const checkAiService = () => {
    if (!ai) throw new Error("Gemini AI service not configured. Check VITE_API_KEY environment variable.");
};

const withTimeout = <T>(promise: Promise<T>, ms: number, context: string): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      const timeoutId = setTimeout(() => reject(new Error(`${context} timed out.`)), ms);
      promise.then((res) => { clearTimeout(timeoutId); resolve(res); }, (err) => { clearTimeout(timeoutId); reject(err); });
    });
};

const demoVideoSchema = {
    type: Type.ARRAY,
    description: "An array of 7-8 scenes for a professional 4-minute summary video.",
    items: {
        type: Type.OBJECT,
        properties: {
            narration: { 
                type: Type.STRING, 
                description: "A VERY LONG, deeply detailed educational narration (at least 100-120 words). Explain concepts slowly and thoroughly to ensure the demo feels like a full lesson." 
            },
            image_prompt: { 
                type: Type.STRING, 
                description: "A high-quality 4K educational illustration prompt. Style: 'Cinematic digital art, professional educational poster, vibrant colors, clear focal point'." 
            },
        },
        required: ["narration", "image_prompt"]
    }
};

export const generateSingleDemoVideo = async (sourceText: string, language: string, classLevel: ClassLevel): Promise<VisualExplanationScene[]> => {
    checkAiService();
    const prompt = `You are a world-class educational content creator. Create a 4-minute chapter summary DEMO for a ${classLevel} student.
    Task: Distill the provided text into exactly 7 or 8 scenes.
    
    CRITICAL: Each scene MUST have a very lengthy narration (minimum 100 words per scene). Speak like a patient tutor explaining deep details. This is necessary to reach a 4-minute video duration.
    
    Language: ${language === 'hi' ? 'Hinglish (Hindi written in English alphabet)' : 'Professional Academic English'}.

    ---CHAPTER SOURCE---
    ${sourceText}
    ---END SOURCE---`;
    
    const response: GenerateContentResponse = await withTimeout(ai!.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { 
            responseMimeType: "application/json", 
            responseSchema: demoVideoSchema 
        }
    }), 240000, `Demo Video Creation`);
    
    const sceneBlueprints = JSON.parse(response.text);
    const successfulScenes: VisualExplanationScene[] = [];

    // Process images sequentially to ensure stability
    for (const blueprint of sceneBlueprints) {
        try {
            const imageResponse = await withTimeout(ai!.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: [{ text: blueprint.image_prompt }],
            }), 70000, 'Image Illustration');
            
            const part = imageResponse.candidates?.[0]?.content?.parts.find(p => p.inlineData);
            if (part?.inlineData) {
                 successfulScenes.push({
                     narration: blueprint.narration,
                     imageBytes: part.inlineData.data,
                 });
            }
        } catch (imgErr) {
            console.error("Image gen failed for one scene, skipping to keep the demo moving...", imgErr);
        }
    }
    
    if (successfulScenes.length < 3) throw new Error("Could not generate enough scenes for the demo video. Please try again.");
    return successfulScenes;
};

export const fetchChapterContent = async (classLevel: string, subject: string, info: string, details: string): Promise<string> => {
    checkAiService();
    const response = await ai!.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide a massive, detailed, 2000-word explanation of the chapter: ${info} for ${subject}, ${classLevel}. Include all core definitions and examples.`,
        config: { tools: [{ googleSearch: {} }] }
    });
    return response.text;
};

export const createChatSession = (subject: Subject, classLevel: string, text: string) => {
    checkAiService();
    return ai!.chats.create({ 
        model: 'gemini-3-flash-preview',
        config: {
            systemInstruction: `You are StuBro AI, a tutor for ${classLevel}. Use this text as your base knowledge: ${text.substring(0, 1000)}`
        }
    });
};