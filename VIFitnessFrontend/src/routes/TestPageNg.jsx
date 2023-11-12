import Experience from "../components/Experience";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Interface from "../components/Interface";
import { MantineProvider } from "@mantine/core";
import { CharacterAnimationsProvider } from "../components/contexts/CharacterAnimations.jsx";

const TestPageNg = () => {
  return (
    <div style={{ overflow: "auto" }}>
      <MantineProvider>
        <CharacterAnimationsProvider>
          <Canvas
            style={{
              position: "absolute",
              zIndex: "10",
              width: "40%",
              height: "80%",
              transform: "translate(0%, 10%)",
            }}
            shadows
            camera={{ position: [0, 3, 18], fov: 8 }}
          >
            <Experience />
          </Canvas>
          <Interface />
        </CharacterAnimationsProvider>
      </MantineProvider>
    </div>
  );
};

export default TestPageNg;
