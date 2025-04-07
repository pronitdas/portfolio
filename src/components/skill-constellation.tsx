'use client'

import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGame } from '../contexts/GameContext'

interface SkillConstellationProps {
  interactable?: boolean;
}

// Define skill data with positions and connections
const skillData = [
  // Frontend
  { name: 'React', position: [15, 20, -40], group: 'frontend', level: 0.9 },
  { name: 'TypeScript', position: [12, 18, -45], group: 'frontend', level: 0.85 },
  { name: 'HTML/CSS', position: [18, 22, -42], group: 'frontend', level: 0.8 },
  { name: 'Next.js', position: [16, 16, -48], group: 'frontend', level: 0.75 },
  { name: 'Redux', position: [10, 25, -43], group: 'frontend', level: 0.7 },
  
  // Backend
  { name: 'Node.js', position: [-20, 15, -35], group: 'backend', level: 0.85 },
  { name: 'Python', position: [-25, 10, -38], group: 'backend', level: 0.8 },
  { name: 'Express', position: [-18, 12, -40], group: 'backend', level: 0.75 },
  { name: 'MongoDB', position: [-22, 18, -35], group: 'backend', level: 0.7 },
  { name: 'PostgreSQL', position: [-15, 20, -36], group: 'backend', level: 0.65 },
  
  // DevOps
  { name: 'Docker', position: [5, -10, -40], group: 'devops', level: 0.8 },
  { name: 'AWS', position: [0, -15, -42], group: 'devops', level: 0.7 },
  { name: 'CI/CD', position: [-5, -12, -45], group: 'devops', level: 0.65 },
  
  // Graphics
  { name: 'Three.js', position: [18, -20, -35], group: 'graphics', level: 0.75 },
  { name: 'WebGL', position: [22, -18, -38], group: 'graphics', level: 0.6 },
  { name: 'Canvas', position: [15, -15, -40], group: 'graphics', level: 0.65 },
]

// Define connections between related skills
const connections = [
  ['React', 'TypeScript'],
  ['React', 'Redux'],
  ['React', 'Next.js'],
  ['TypeScript', 'Next.js'],
  ['HTML/CSS', 'React'],
  ['Node.js', 'Express'],
  ['Node.js', 'MongoDB'],
  ['Python', 'PostgreSQL'],
  ['Docker', 'AWS'],
  ['Docker', 'CI/CD'],
  ['Three.js', 'WebGL'],
  ['Three.js', 'Canvas'],
  ['React', 'Three.js'],
  ['Node.js', 'TypeScript'],
  ['Python', 'Docker'],
]

export function SkillConstellation({ interactable = true }: SkillConstellationProps) {
  const { state, discoverSkill } = useGame();
  
  // Create points for all skills
  const skillPoints = useMemo(() => {
    const points: THREE.Points[] = [];
    const positions: number[] = [];
    const colors: number[] = [];
    const sizes: number[] = [];
    
    Object.values(state.skills).forEach(skill => {
      // Add to positions array
      positions.push(...skill.position);
      
      // Set color based on category
      const colorMap = {
        frontend: new THREE.Color(0x00ffff),
        backend: new THREE.Color(0xff00ff),
        devops: new THREE.Color(0xffff00),
        graphics: new THREE.Color(0x00ff00)
      };
      
      const color = colorMap[skill.category];
      colors.push(color.r, color.g, color.b);
      
      // Size based on skill level and discovery state
      const size = skill.discovered ? skill.level * 0.3 : 0.4;
      sizes.push(size);
    });
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    
    const material = new THREE.PointsMaterial({
      size: 1,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8
    });
    
    points.push(new THREE.Points(geometry, material));
    return points;
  }, [state.skills]);
  
  // Create connections between related skills
  const connectionLines = useMemo(() => {
    const lines: THREE.Line[] = [];
    const connections = [
      ['react', 'typescript'],
      ['nodejs', 'python'],
      ['react', 'nodejs'],
    ];
    
    connections.forEach(([from, to]) => {
      if (state.skills[from] && state.skills[to]) {
        const fromPos = state.skills[from].position;
        const toPos = state.skills[to].position;
        
        // Only show connection if at least one skill is discovered
        const isVisible = state.skills[from].discovered || state.skills[to].discovered;
        
        if (isVisible) {
          const points = [
            new THREE.Vector3(...fromPos),
            new THREE.Vector3(...toPos)
          ];
          
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({ 
            color: 0x3388ff,
            transparent: true,
            opacity: 0.3,
            linewidth: 1
          });
          
          lines.push(new THREE.Line(geometry, material));
        }
      }
    });
    
    return lines;
  }, [state.skills]);
  
  // Add twinkling effect for stars
  useFrame(({ clock }) => {
    skillPoints.forEach(points => {
      if (!points.geometry.attributes.size) return;
      
      const sizes = points.geometry.attributes.size;
      
      for (let i = 0; i < sizes.count; i++) {
        const skill = Object.values(state.skills)[i];
        
        if (skill.discovered) {
          // Discovered stars pulse gently
          const pulse = Math.sin(clock.getElapsedTime() * 2 + i) * 0.1 + 0.9;
          sizes.array[i] = skill.level * 0.3 * pulse;
        } else {
          // Undiscovered stars twinkle randomly
          const twinkle = Math.sin(clock.getElapsedTime() * 3 + i * 1.5) * 0.3 + 0.7;
          sizes.array[i] = 0.4 * twinkle;
        }
      }
      
      sizes.needsUpdate = true;
    });
  });
  
  // Handle interaction with stars
  const handleStarClick = (event: any) => {
    if (!interactable) return;
    
    event.stopPropagation();
    const { index } = event;
    
    if (index !== undefined) {
      const skillIds = Object.keys(state.skills);
      const skillId = skillIds[index];
      
      if (skillId) {
        discoverSkill(skillId);
      }
    }
  };
  
  return (
    <>
      {/* Stars */}
      {skillPoints.map((points, i) => (
        <primitive key={`stars-${i}`} object={points} onClick={handleStarClick} />
      ))}
      
      {/* Connections */}
      {connectionLines.map((line, i) => (
        <primitive key={`connection-${i}`} object={line} />
      ))}
    </>
  );
} 