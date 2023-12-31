import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useCharacterAnimations } from "./contexts/CharacterAnimations";

const MuscleManColor = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "../public/models/MuscleManColor.gltf"
  );
  const { setAnimations, animationIndex } = useCharacterAnimations();
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    setAnimations(names);
  }, [names]);

  useEffect(() => {
    actions[names[animationIndex]].reset().fadeIn(0.5).play();
    return () => {
      actions[names[animationIndex]].fadeOut(0.5);
    };
  }, [animationIndex]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="low%20poly%20assembledobj" rotation={[Math.PI / 2, 0, 0]}>
          <group name="Group10538" />
          <group name="Group10647" />
          <group name="Group17276" />
          <group name="Group24301" />
          <group name="Group24342" />
          <group name="Group3006" />
          <group name="Group3021" />
          <group name="Group3036" />
          <group name="Group3051" />
          <group name="Group3066" />
          <group name="Group3081" />
          <group name="Group3096" />
          <group name="Group3111" />
          <group name="Group3126" />
          <group name="Group3141" />
          <group name="Group42757" />
          <group name="Group60759" />
          <group name="Group65292" />
          <group name="Group7965" />
        </group>
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="Group105381"
            geometry={nodes.Group105381.geometry}
            material={materials.defaultMat}
            skeleton={nodes.Group105381.skeleton}
          />
          <skinnedMesh
            name="Group106471"
            geometry={nodes.Group106471.geometry}
            material={materials["defaultMat.001"]}
            skeleton={nodes.Group106471.skeleton}
          />
          <skinnedMesh
            name="Group172761"
            geometry={nodes.Group172761.geometry}
            material={materials["defaultMat.016"]}
            skeleton={nodes.Group172761.skeleton}
          />
          <skinnedMesh
            name="Group243011"
            geometry={nodes.Group243011.geometry}
            material={materials["defaultMat.017"]}
            skeleton={nodes.Group243011.skeleton}
          />
          <skinnedMesh
            name="Group243421"
            geometry={nodes.Group243421.geometry}
            material={materials["defaultMat.018"]}
            skeleton={nodes.Group243421.skeleton}
          />
          <skinnedMesh
            name="Group30061"
            geometry={nodes.Group30061.geometry}
            material={materials["defaultMat.002"]}
            skeleton={nodes.Group30061.skeleton}
          />
          <skinnedMesh
            name="Group30211"
            geometry={nodes.Group30211.geometry}
            material={materials["defaultMat.003"]}
            skeleton={nodes.Group30211.skeleton}
          />
          <skinnedMesh
            name="Group30361"
            geometry={nodes.Group30361.geometry}
            material={materials["defaultMat.004"]}
            skeleton={nodes.Group30361.skeleton}
          />
          <skinnedMesh
            name="Group30511"
            geometry={nodes.Group30511.geometry}
            material={materials["defaultMat.005"]}
            skeleton={nodes.Group30511.skeleton}
          />
          <skinnedMesh
            name="Group30661"
            geometry={nodes.Group30661.geometry}
            material={materials["defaultMat.006"]}
            skeleton={nodes.Group30661.skeleton}
          />
          <skinnedMesh
            name="Group30811"
            geometry={nodes.Group30811.geometry}
            material={materials["defaultMat.007"]}
            skeleton={nodes.Group30811.skeleton}
          />
          <skinnedMesh
            name="Group30961"
            geometry={nodes.Group30961.geometry}
            material={materials["defaultMat.008"]}
            skeleton={nodes.Group30961.skeleton}
          />
          <skinnedMesh
            name="Group31111"
            geometry={nodes.Group31111.geometry}
            material={materials["defaultMat.009"]}
            skeleton={nodes.Group31111.skeleton}
          />
          <skinnedMesh
            name="Group31261"
            geometry={nodes.Group31261.geometry}
            material={materials["defaultMat.010"]}
            skeleton={nodes.Group31261.skeleton}
          />
          <skinnedMesh
            name="Group31411"
            geometry={nodes.Group31411.geometry}
            material={materials["defaultMat.011"]}
            skeleton={nodes.Group31411.skeleton}
          />
          <skinnedMesh
            name="Group427571"
            geometry={nodes.Group427571.geometry}
            material={materials["defaultMat.014"]}
            skeleton={nodes.Group427571.skeleton}
          />
          <skinnedMesh
            name="Group607591"
            geometry={nodes.Group607591.geometry}
            material={materials["defaultMat.015"]}
            skeleton={nodes.Group607591.skeleton}
          />
          <skinnedMesh
            name="Group79651"
            geometry={nodes.Group79651.geometry}
            material={materials["defaultMat.012"]}
            skeleton={nodes.Group79651.skeleton}
          />
        </group>
      </group>
    </group>
  );
};

export default MuscleManColor;

useGLTF.preload("./models/MuscleManColor.gltf");
