import { OrbitControls } from "@react-three/drei";
import { useCharacterAnimations } from "./contexts/CharacterAnimations";
// import Woman from "./Woman";

// import MuscleMan2 from "./MuscleMan2";
import MuscleManColor from "./MuscleManColor";
import MuscleManFinal from "./MuscleManFinal";

const Experience = () => {
  return (
    <>
      <OrbitControls autoRotate={true}/>
      <ambientLight />
      <directionalLight
        position={[-5, 5, 5]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <group position={[0, -1, 0]}>
        <MuscleManFinal />
      </group>
      <mesh
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[0, -1, 0]}
        receiveShadow
      >
        <planeGeometry args={[10, 10, 1, 1]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </>
  );
};

export default Experience;
