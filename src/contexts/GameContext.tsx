import React, { createContext, useContext, useState, useReducer } from 'react';

// Define types
type SkillCategory = 'frontend' | 'backend' | 'devops' | 'graphics';
type SkillLevel = 1 | 2 | 3 | 4 | 5;

interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  description: string;
  discovered: boolean;
  position: [number, number, number]; // 3D coordinates
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  type: 'success' | 'failure' | 'secret';
}

interface GameState {
  skills: Record<string, Skill>;
  achievements: Record<string, Achievement>;
  discoveredCount: number;
  totalSkills: number;
  activeChallenge: string | null;
  playerPosition: [number, number, number];
  gameProgress: number; // 0-100%
}

// Initial state with skills and achievements
const initialState: GameState = {
  skills: {
    // Frontend skills
    'react': {
      id: 'react',
      name: 'React',
      category: 'frontend',
      level: 5,
      description: 'Advanced component architecture and state management',
      discovered: false,
      position: [10, 5, 3]
    },
    'typescript': {
      id: 'typescript',
      name: 'TypeScript',
      category: 'frontend',
      level: 4,
      description: 'Type-safe development with advanced generics',
      discovered: false,
      position: [8, 7, 2]
    },
    // Backend skills
    'nodejs': {
      id: 'nodejs',
      name: 'Node.js',
      category: 'backend',
      level: 4,
      description: 'Server-side JavaScript runtime',
      discovered: false,
      position: [-8, 3, 5]
    },
    'python': {
      id: 'python',
      name: 'Python',
      category: 'backend',
      level: 3,
      description: 'Versatile programming language',
      discovered: false,
      position: [-6, 5, 4]
    },
  },
  achievements: {
    'first-discovery': {
      id: 'first-discovery',
      title: 'First Contact',
      description: 'Discovered your first skill',
      unlocked: false,
      type: 'success'
    },
    'frontend-master': {
      id: 'frontend-master',
      title: 'Frontend Master',
      description: 'Discovered all frontend skills',
      unlocked: false,
      type: 'success'
    },
    'backend-master': {
      id: 'backend-master',
      title: 'Backend Master',
      description: 'Discovered all backend skills',
      unlocked: false,
      type: 'success'
    }
  },
  discoveredCount: 0,
  totalSkills: 0,
  activeChallenge: null,
  playerPosition: [0, 0, 0],
  gameProgress: 0
};

// Actions
type GameAction = 
  | { type: 'DISCOVER_SKILL'; skillId: string }
  | { type: 'UNLOCK_ACHIEVEMENT'; achievementId: string }
  | { type: 'START_CHALLENGE'; challengeId: string }
  | { type: 'COMPLETE_CHALLENGE'; success: boolean }
  | { type: 'UPDATE_PLAYER_POSITION'; position: [number, number, number] };

// Reducer
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'DISCOVER_SKILL':
      if (state.skills[action.skillId].discovered) return state;
      
      const newDiscoveredCount = state.discoveredCount + 1;
      const newProgress = (newDiscoveredCount / state.totalSkills) * 100;
      
      return {
        ...state,
        skills: {
          ...state.skills,
          [action.skillId]: {
            ...state.skills[action.skillId],
            discovered: true
          }
        },
        discoveredCount: newDiscoveredCount,
        gameProgress: newProgress
      };
    
    case 'UNLOCK_ACHIEVEMENT':
      return {
        ...state,
        achievements: {
          ...state.achievements,
          [action.achievementId]: {
            ...state.achievements[action.achievementId],
            unlocked: true
          }
        }
      };
    
    case 'START_CHALLENGE':
      return {
        ...state,
        activeChallenge: action.challengeId
      };
    
    case 'COMPLETE_CHALLENGE':
      return {
        ...state,
        activeChallenge: null
      };
    
    case 'UPDATE_PLAYER_POSITION':
      return {
        ...state,
        playerPosition: action.position
      };
      
    default:
      return state;
  }
}

// Create context
interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  discoverSkill: (skillId: string) => void;
  unlockAchievement: (achievementId: string) => void;
  getProgress: () => number;
  getDiscoveredSkills: () => Skill[];
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Provider component
export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, {
    ...initialState,
    totalSkills: Object.keys(initialState.skills).length
  });
  
  const discoverSkill = (skillId: string) => {
    dispatch({ type: 'DISCOVER_SKILL', skillId });
    
    // Auto-unlock achievements based on conditions
    if (state.discoveredCount === 0) {
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId: 'first-discovery' });
    }
    
    // Check for category completion achievements
    const categorySkills = Object.values(state.skills).filter(
      skill => skill.category === state.skills[skillId].category
    );
    
    const allCategoryDiscovered = categorySkills.every(skill => 
      skill.id === skillId ? true : skill.discovered
    );
    
    if (allCategoryDiscovered) {
      const categoryAchievementMap: Record<SkillCategory, string> = {
        frontend: 'frontend-master',
        backend: 'backend-master',
        devops: 'devops-master',
        graphics: 'graphics-master'
      };
      
      const achievementId = categoryAchievementMap[state.skills[skillId].category];
      if (achievementId && state.achievements[achievementId]) {
        dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId });
      }
    }
  };
  
  const unlockAchievement = (achievementId: string) => {
    dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId });
  };
  
  const getProgress = () => state.gameProgress;
  
  const getDiscoveredSkills = () => 
    Object.values(state.skills).filter(skill => skill.discovered);
  
  return (
    <GameContext.Provider 
      value={{
        state,
        dispatch,
        discoverSkill,
        unlockAchievement,
        getProgress,
        getDiscoveredSkills
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

// Hook for using the game context
export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
} 