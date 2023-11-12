import { OrbitControls } from "@react-three/drei";
import React from "react";

const Experience = () => {
  return (
    <>
      <OrbitControls/>
        <mesh>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>
    </>
  );
};

export default Experience;
