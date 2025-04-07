const orbitVertex = `
attribute float position;
uniform float dashScale;
uniform float dashSize;
uniform float dashOffset;
varying float vPosition;

void main() {
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const orbitFragment = `
uniform vec3 color;
uniform float opacity;
uniform float time;
uniform float dashScale;
uniform float dashSize;
uniform float dashOffset;
varying float vPosition;

void main() {
  // Animated dash pattern
  float pattern = fract((vPosition + dashOffset + time * 0.2) * dashScale);
  float dash = smoothstep(dashSize, dashSize + 0.05, pattern) * 
               smoothstep(1.0, 1.0 - 0.05, pattern);
  
  // Glow effect
  float glow = smoothstep(0.5, 0.0, abs(pattern - 0.5)) * 0.5;
  
  // Combine
  vec3 finalColor = color * (1.0 + glow);
  float finalOpacity = opacity * dash;
  
  gl_FragColor = vec4(finalColor, finalOpacity);
}
`;

export { orbitVertex, orbitFragment }; 