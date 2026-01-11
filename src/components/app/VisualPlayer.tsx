import React, { useState, useEffect } from 'react';
import { VisualExplanationScene } from '../../types';
import * as ttsService from '../../services/ttsService';
import Card from '../common/Card';
import Button from '../common/Button';

interface VisualPlayerProps {
  scenes: VisualExplanationScene[];
  language: string;
}

const VisualPlayer: React.FC<VisualPlayerProps> = ({ scenes, language }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentScene = scenes[currentSceneIndex];

  useEffect(() => {
    if (isPlaying) {
      const utterance = ttsService.speak(currentScene.narration, {
        onEnd: () => {
          if (currentSceneIndex < scenes.length - 1) {
            setCurrentSceneIndex(prev => prev + 1);
          } else {
            setIsPlaying(false);
          }
        }
      });
      return () => ttsService.cancel();
    }
  }, [currentSceneIndex, isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      ttsService.cancel();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  return (
    <Card className="overflow-hidden !p-0 bg-black">
      <div className="relative aspect-video flex items-center justify-center overflow-hidden">
        <img 
          src={`data:image/jpeg;base64,${currentScene.imageBytes}`} 
          className="w-full h-full object-cover animate-pulse" 
          alt="Scene illustration"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
          <p className="text-xl md:text-2xl font-medium text-white drop-shadow-lg leading-relaxed">
            {currentScene.narration}
          </p>
        </div>
      </div>
      
      <div className="bg-slate-900 p-4 flex items-center justify-between">
        <div className="flex space-x-2">
          {scenes.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${i === currentSceneIndex ? 'w-8 bg-violet-500' : 'w-2 bg-slate-700'}`}
            />
          ))}
        </div>
        <div className="flex space-x-4">
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-white hover:bg-slate-800"
            onClick={() => setCurrentSceneIndex(Math.max(0, currentSceneIndex - 1))}
            disabled={currentSceneIndex === 0}
          >
            Prev
          </Button>
          <Button 
            size="sm" 
            onClick={togglePlay}
            className="min-w-[100px]"
          >
            {isPlaying ? 'Pause' : 'Play Video'}
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-white hover:bg-slate-800"
            onClick={() => setCurrentSceneIndex(Math.min(scenes.length - 1, currentSceneIndex + 1))}
            disabled={currentSceneIndex === scenes.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default VisualPlayer;