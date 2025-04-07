'use client'

import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { JobPlanet } from './JobPlanet'
import { Sun } from './Sun'

// Define the JobData type (consider moving to a central types file)
interface JobData {
  company: string
  position: string
  period: string
  projects: Array<{
    name: string
    description: string
    technologies: string[]
  }>
  languages: string[]
  achievements: string[]
}

// Define languageColors type
interface LanguageColors {
  [key: string]: string;
}

const languageColors: LanguageColors = {
  JavaScript: '#f7df1e',
  Python: '#3776ab',
  Java: '#007396',
  TypeScript: '#3178c6',
  'C++': '#00599c',
  Go: '#00add8',
  SQL: '#f29111',
  HTML: '#e34c26',
  CSS: '#264de4',
  Ruby: '#cc342d',
  Swift: '#ffac45',
  Kotlin: '#f18e33',
  Rust: '#dea584',
  PHP: '#777bb4',
  'C#': '#68217a',
  Scala: '#dc322f',
  R: '#276dc3',
  Dart: '#00b4ab',
  Lua: '#000080',
  Perl: '#39457e',
}

// Use JobData type for jobData array
const jobData: JobData[] = [
  {
    company: 'Ola',
    position: 'SDE 3',
    period: 'Aug 2023 - Present',
    projects: [
      {
        name: 'Mobility Solutions',
        description: 'Developed advanced ride-sharing algorithms',
        technologies: ['Python', 'TensorFlow', 'PostgreSQL']
      },
      {
        name: 'Data Analytics Platform',
        description: 'Built real-time analytics dashboard for business insights',
        technologies: ['React', 'Node.js', 'Kafka', 'Elasticsearch']
      },
      {
        name: 'Driver Optimization System',
        description: 'Implemented ML-based driver allocation system',
        technologies: ['Python', 'scikit-learn', 'Redis']
      }
    ],
    languages: ['JavaScript', 'Python', 'Java', 'SQL'],
    achievements: [
      'Improved ride matching efficiency by 30%',
      'Reduced data processing latency by 50%',
      'Led a team of 5 developers for the analytics platform project'
    ]
  },
  {
    company: 'Tardis Solutions',
    position: 'Senior Consultant',
    period: 'Apr 2023 - Present',
    projects: [
      {
        name: 'Geospatial Transformation',
        description: 'Developed a cutting-edge GIS platform for urban planning',
        technologies: ['React', 'Mapbox GL', 'Node.js', 'PostGIS']
      },
      {
        name: 'Digital Twin Solution',
        description: 'Created a digital twin system for smart city management',
        technologies: ['Three.js', 'WebGL', 'Express.js', 'MongoDB']
      },
      {
        name: 'IoT Data Visualization',
        description: 'Built real-time IoT data visualization dashboard',
        technologies: ['D3.js', 'Socket.io', 'InfluxDB']
      }
    ],
    languages: ['TypeScript', 'JavaScript', 'Python', 'SQL'],
    achievements: [
      'Successfully delivered projects for 3 major metropolitan cities',
      'Reduced data processing time for geospatial queries by 40%',
      'Presented innovative solutions at 2 international smart city conferences'
    ]
  },
  {
    company: 'Autodesk',
    position: 'Senior Software Engineer',
    period: 'Jun 2022 - Jun 2023',
    projects: [
      {
        name: 'AutoCAD Core Engine Optimization',
        description: 'Improved performance of core CAD algorithms',
        technologies: ['C++', 'OpenGL', 'CUDA']
      },
      {
        name: '3D Modeling Tools Enhancement',
        description: 'Developed new features for 3D modeling suite',
        technologies: ['C++', 'Qt', 'Python']
      },
      {
        name: 'Cloud Rendering Pipeline',
        description: 'Implemented cloud-based rendering system for large-scale projects',
        technologies: ['AWS', 'Docker', 'Kubernetes', 'Python']
      }
    ],
    languages: ['C++', 'Python', 'JavaScript', 'GLSL'],
    achievements: [
      'Optimized CAD engine resulting in 25% faster load times',
      'Contributed to 5 patents in 3D modeling technologies',
      'Reduced cloud rendering costs by 35% through efficient resource allocation'
    ]
  },
  {
    company: 'Velotio Technologies',
    position: 'Senior Software Engineer',
    period: 'Jun 2021 - Apr 2022',
    projects: [
      {
        name: 'Microservices Architecture',
        description: 'Designed and implemented microservices-based backend',
        technologies: ['Go', 'gRPC', 'Docker', 'Kubernetes']
      },
      {
        name: 'Cloud Infrastructure Automation',
        description: 'Developed IaC solutions for cloud resource management',
        technologies: ['Terraform', 'AWS', 'Python']
      },
      {
        name: 'Real-time Data Processing Pipeline',
        description: 'Built scalable data processing system using stream processing',
        technologies: ['Apache Kafka', 'Apache Flink', 'Elasticsearch']
      }
    ],
    languages: ['Go', 'Python', 'JavaScript', 'HCL'],
    achievements: [
      'Reduced deployment time by 70% through CI/CD pipeline optimization',
      'Implemented auto-scaling solution resulting in 40% cost savings',
      'Mentored junior developers in microservices architecture and best practices'
    ]
  },
  {
    company: 'GeoSpoc',
    position: 'Technical Lead',
    period: 'Sep 2019 - Jun 2021',
    projects: [
      {
        name: 'Geospatial Analytics Platform',
        description: 'Led development of a comprehensive geospatial analytics solution',
        technologies: ['React', 'Node.js', 'PostGIS', 'Mapbox GL']
      },
      {
        name: 'Drone Data Processing Pipeline',
        description: 'Designed automated pipeline for processing and analyzing drone imagery',
        technologies: ['Python', 'OpenCV', 'GDAL', 'AWS S3']
      },
      {
        name: 'Location Intelligence API',
        description: 'Developed RESTful API for location-based services and analysis',
        technologies: ['Express.js', 'MongoDB', 'Redis', 'Nginx']
      }
    ],
    languages: ['JavaScript', 'Python', 'SQL', 'Bash'],
    achievements: [
      'Grew the development team from 3 to 12 members',
      'Increased API performance by 200% through caching and optimization',
      'Successfully delivered projects for 5 Fortune 500 companies'
    ]
  }
]

// Define props type
interface CosmicSystemProps {
  setSelectedObject: (job: JobData | null) => void;
}

export function CosmicSystem({ setSelectedObject }: CosmicSystemProps): React.ReactElement {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001
    }
  })

  return (
    <group ref={groupRef}>
      <Sun position={[0, 0, 0]} />
      {jobData.map((job, index) => {
        const primaryLanguage = job.languages[0]
        const color = languageColors[primaryLanguage] || '#ffffff'
        const orbitRadius = 40 + (index * 5) // Increasing radius for each job
        const orbitSpeed = 0.001 / (index + 1) // Slower speed for outer orbits
        
        return (
          <JobPlanet
            key={job.company}
            job={job}
            color={color}
            orbitRadius={orbitRadius}
            orbitSpeed={orbitSpeed}
            position={[
              Math.cos(index * (Math.PI * 2 / jobData.length)) * orbitRadius,
              0,
              Math.sin(index * (Math.PI * 2 / jobData.length)) * orbitRadius
            ]}
            setSelectedObject={setSelectedObject}
          />
        )
      })}
    </group>
  )
} 