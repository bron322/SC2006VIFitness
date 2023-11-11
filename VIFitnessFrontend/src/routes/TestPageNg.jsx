import Experience from "../components/Experience.jsx";
import { Canvas } from "@react-three/fiber";
import React from "react";

const TestPageNg = () => {
  return (
    <Canvas style={{ position: "absolute", zIndex: "20", width: "80%", height: "90%"}} 
    shadows camera={{ position: [3, 3, 3], fov: 30 }}>
      <color attach="background" args={["#ececec"]} />
      <Experience />
    </Canvas>
  );
};

export default TestPageNg;
