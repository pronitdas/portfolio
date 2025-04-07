import React from 'react';
import { useGame } from '../contexts/GameContext';

interface ProgressHUDProps {
  className?: string;
}

export function ProgressHUD({ className = '' }: ProgressHUDProps) {
  const { state, getProgress } = useGame();
  const progress = getProgress();
  
  return (
    <div className={`fixed bottom-5 left-5 bg-black/50 text-white p-3 rounded-lg ${className}`}>
      <div className="mb-2">
        <span className="font-bold">Exploration Progress: </span>
        <span>{Math.round(progress)}%</span>
      </div>
      
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500" 
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="mt-2 text-sm">
        <span>{state.discoveredCount} of {state.totalSkills} skills discovered</span>
      </div>
      
      {/* Show discovered skills */}
      {state.discoveredCount > 0 && (
        <div className="mt-4">
          <h3 className="font-bold mb-2">Discovered Skills:</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(state.skills)
              .filter(skill => skill.discovered)
              .map(skill => (
                <div 
                  key={skill.id}
                  className="text-xs p-2 bg-white/10 rounded flex items-center gap-2"
                >
                  <div 
                    className={`w-2 h-2 rounded-full ${
                      skill.category === 'frontend' ? 'bg-cyan-500' :
                      skill.category === 'backend' ? 'bg-fuchsia-500' :
                      skill.category === 'devops' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                  />
                  <span>{skill.name}</span>
                  <span className="ml-auto opacity-50">Lv.{skill.level}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
} 