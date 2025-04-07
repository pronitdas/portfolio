import React, { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';

interface AchievementNotificationProps {
  className?: string;
}

export function AchievementNotification({ className = '' }: AchievementNotificationProps) {
  const { state } = useGame();
  const [notification, setNotification] = useState<{
    achievementId: string;
    visible: boolean;
  } | null>(null);
  
  // Monitor achievements and show notifications
  useEffect(() => {
    const unlockedAchievements = Object.values(state.achievements)
      .filter(achievement => achievement.unlocked);
    
    // Check localStorage to see which ones we've already notified about
    const notifiedAchievements = JSON.parse(
      localStorage.getItem('notifiedAchievements') || '[]'
    );
    
    // Find first achievement that hasn't been notified yet
    const newAchievement = unlockedAchievements.find(
      achievement => !notifiedAchievements.includes(achievement.id)
    );
    
    if (newAchievement) {
      // Show notification
      setNotification({
        achievementId: newAchievement.id,
        visible: true
      });
      
      // Hide after 5 seconds
      const timeout = setTimeout(() => {
        setNotification(prev => 
          prev && prev.achievementId === newAchievement.id 
            ? { ...prev, visible: false } 
            : prev
        );
        
        // Update localStorage
        localStorage.setItem(
          'notifiedAchievements', 
          JSON.stringify([...notifiedAchievements, newAchievement.id])
        );
      }, 5000);
      
      return () => clearTimeout(timeout);
    }
  }, [state.achievements]);
  
  if (!notification || !notification.visible) return null;
  
  const achievement = state.achievements[notification.achievementId];
  
  return (
    <div 
      className={`
        fixed top-5 right-5 
        bg-black/80 text-white 
        p-4 rounded-lg 
        border-2 border-cyan-500 
        animate-fadeIn
        ${className}
      `}
    >
      <h3 className="text-xl font-bold mb-2">
        {achievement.type === 'success' && '🏆 '}
        {achievement.type === 'failure' && '💡 '}
        {achievement.type === 'secret' && '🔍 '}
        {achievement.title}
      </h3>
      <p className="text-sm opacity-80">{achievement.description}</p>
    </div>
  );
} 