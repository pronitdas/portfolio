import React from 'react';

export function Loading(): React.ReactElement {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <div className="text-electric-blue text-2xl font-mono animate-pulse">
        Loading Cosmic System...
      </div>
    </div>
  )
} 