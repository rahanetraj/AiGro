import { Float, Sphere, Torus } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const AICore = () => {
  const group = useRef();
  const rings = useRef([]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.1;
    }
    rings.current.forEach((ring, i) => {
      ring.rotation.x = t * (0.05 + i * 0.02);
    });
  });

  return (
    <group ref={group}>
      <Sphere args={[1.2, 32, 32]}>
        <meshStandardMaterial
          color="#84cc16"
          emissive="#bef264"
          emissiveIntensity={1.5}
          metalness={0.9}
          roughness={0.1}
        />
      </Sphere>

      {[1.8, 2.6, 3.4].map((radius, i) => (
        <mesh
          key={i}
          ref={(el) => (rings.current[i] = el)}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <Torus args={[radius, 0.04, 16, 32]} />
          <meshStandardMaterial
            color="#bef264"
            emissive="#bef264"
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <Float key={i} speed={2} floatIntensity={0.5} rotationIntensity={0.5}>
            <mesh position={[Math.cos(angle) * 3.5, Math.sin(angle) * 3.5, 0]}>
              <boxGeometry args={[0.4, 0.4, 0.4]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive="#84cc16"
                emissiveIntensity={0.8}
                metalness={0.8}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
};

export default AICore;
