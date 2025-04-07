const planetVertex = `
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const planetFragment = `
uniform vec3 glowColor;
uniform float time;
uniform vec3 baseColor;
uniform float noiseScale;
uniform float glowIntensity;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

// Simplex noise function
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
    dot(x12.zw, x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  // Compute Fresnel term for atmospheric glow
  vec3 viewDirection = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - max(0.0, dot(viewDirection, vNormal)), 3.0);
  
  // Create procedural texture using simplex noise
  float noise1 = snoise(vUv * noiseScale + vec2(time * 0.1, 0.0));
  float noise2 = snoise(vUv * noiseScale * 2.0 + vec2(0.0, time * 0.05));
  float combined = (noise1 * 0.5 + noise2 * 0.5) * 0.5 + 0.5; // Normalize to 0-1
  
  // Create texture patterns
  vec3 textureColor = mix(baseColor * 0.7, baseColor, combined);
  
  // Add detail pattern
  float detail = snoise(vUv * noiseScale * 4.0 + vec2(time * 0.2, time * 0.1));
  detail = (detail * 0.5 + 0.5) * 0.3;
  textureColor = mix(textureColor, baseColor * 1.2, detail);
  
  // Combine texture with atmospheric glow
  vec3 finalColor = mix(textureColor, glowColor, fresnel * glowIntensity);
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export { planetVertex, planetFragment }; 