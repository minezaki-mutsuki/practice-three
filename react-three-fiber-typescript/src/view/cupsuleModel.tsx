import { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import THREE from "three";
import { Html } from "@react-three/drei";

export type CapsuleModelProps = {
  color: string;
  distance: number;
  renderDistance: number;
  position: [number, number, number];
  onClick?: () => void;
};

export const CapsuleModel: React.FC<CapsuleModelProps> = ({
  color,
  distance,
  renderDistance,
  position,
  onClick,
}) => {
  const ref = useRef<THREE.Mesh | null>(null);
  useFrame(() => {
    if (ref.current == null) {
      return;
    }
    ref.current.rotation.z += 0.003;
    ref.current.rotation.y += 0.002;
  });

  return (
    <>
      <mesh>
        <Html
          className="text-2xl"
          center
          distanceFactor={10}
          position={[
            position[0],
            position[1] +
              20 / (100 / renderDistance) +
              (renderDistance >= 5 ? 25 / renderDistance : 0),
            position[2],
          ]}
        ></Html>
      </mesh>
    </>
  );
};
