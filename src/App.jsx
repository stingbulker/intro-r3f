import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { useRef, useState } from "react";
import {
  MeshWobbleMaterial,
  OrbitControls,
  useHelper,
} from "@react-three/drei";
import { DirectionalLightHelper } from "three";
import { useControls } from "leva";

const Cube = ({ position, size, color }) => {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 2;
    ref.current.rotation.y += delta * 2;
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
  });
  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Sphere = ({ position, size, color }) => {
  const ref = useRef();

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useFrame((state, delta) => {
    const speed = isHovered ? 1 : 0.2;
    ref.current.rotation.y += delta * speed;
  });
  return (
    <mesh
      position={position}
      ref={ref}
      onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
      scale={isClicked ? 2 : 1}
    >
      <sphereGeometry args={size} />
      <meshStandardMaterial color={isHovered ? "red" : "cyan"} wireframe />
    </mesh>
  );
};

const Torus = ({ position, size, color }) => {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 2;
    ref.current.rotation.y += delta * 2;
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
  });
  return (
    <mesh position={position} ref={ref}>
      <torusGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const TorusKnot = ({ position, size}) => {
  const ref = useRef();
  const { color, radius } = useControls({
    color: "lightblue",
    radius: {
      value: 5,
      min: 1,
      max: 10,
      step: 0.5,
    },
  });
  // useFrame((state, delta) => {
  //   ref.current.rotation.x += delta * 2;
  //   ref.current.rotation.y += delta * 2;
  //   ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
  // });
  return (
    <mesh position={position} ref={ref}>
      <torusKnotGeometry radius={5} args={[...size]} />
      {/* <meshStandardMaterial color={color} /> */}
      <MeshWobbleMaterial factor={5} speed={2} color={color} />
    </mesh>
  );
};

const Scene = () => {
  const directionalLightRef = useRef();
  const { lightColor, lightIntensity } = useControls({
    lightColor: "white",
    lightIntensity: {
      value: 0.5,
      min: 0,
      max: 5,
      step: 0.1,
    },
  });
  useHelper(directionalLightRef, DirectionalLightHelper, 0.5);
  return (
    <>
      <directionalLight
        position={[0, 0, 2]}
        intensity={lightIntensity}
        ref={directionalLightRef}
        color={lightColor}
      />
      <ambientLight intensity={0.1} />
      {/* <group position={[0,-1,0]}>
      <Cube position={[1, 0, 0]} color={"yellow"} size={[1, 1, 1]} />
      <Cube position={[-1, 0, 0]} color={"blue"} size={[1, 1, 1]} />
      <Cube position={[1, 2, 0]} color={"green"} size={[1, 1, 1]} />
      <Cube position={[-1, 2, 0]} color={"red"} size={[1, 1, 1]} />
    </group> */}
      {/* <Cube position={[0,0,0]} size={[1,1,1]} color={'orange'}/> */}
      {/* <Sphere position={[0, 0, 0]} size={[1, 30, 30]} color={"orange"} /> */}
      {/* <Torus position={[2, 0, 0]} size={[0.875, 0.1, 30, 30]} color={"blue"} /> */}
      <TorusKnot position={[0, 0, 0]} size={[1, 0.1, 1000, 50]} color={"red"} />
      <OrbitControls enableZoom={false} />
    </>
  );
};

const App = () => {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
};

export default App;
