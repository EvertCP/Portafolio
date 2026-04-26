import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { useTexture, Environment, Lightformer, RenderTexture, PerspectiveCamera, Text } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

extend({ MeshLineGeometry, MeshLineMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: any;
    meshLineMaterial: any;
  }
}
useTexture.preload(
  'https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/SOT1hmCesOHxEYxL7vkoZ/c57b29c85912047c414311723320c16b/band.jpg'
);

export default function HeroBadge3D({
  firstName = 'Evert',
  lastName = 'Cardenas',
}: {
  firstName?: string;
  lastName?: string;
}) {
  return (
    <div className="relative w-full max-w-2xl h-[520px] sm:h-[620px] lg:h-[calc(100vh-10rem)]">
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-blue-600 to-purple-600 blur-3xl opacity-20" />
      <div className="relative w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 11], fov: 25 }}
          className="w-full h-full"
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={Math.PI} />
          <Physics debug={false} interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
            <Band firstName={firstName} lastName={lastName} />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Canvas>
      </div>
    </div>
  );
}

function Band({
  firstName = 'Evert',
  lastName = 'Cardenas',
  maxSpeed = 50,
  minSpeed = 10,
}: {
  firstName: string;
  lastName: string;
  maxSpeed?: number;
  minSpeed?: number;
}) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);
  const badgeMap = useRef<THREE.Texture | null>(null);
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const segmentProps: any = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 2,
    linearDamping: 2,
  };
  const texture: any = useTexture(
    'https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/SOT1hmCesOHxEYxL7vkoZ/c57b29c85912047c414311723320c16b/band.jpg'
  );
  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState<any>(false);
  const [hovered, hover] = useState(false);
  const nameKey = `${firstName}-${lastName}`;
  const bigLetters = `${(firstName?.[0] ?? '').toUpperCase()}${(lastName?.[0] ?? '').toUpperCase()}P`.slice(0, 3);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.125, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref: any) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }

    if (fixed.current) {
      [j1, j2].forEach((ref: any) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 5.25, 0]} scale={1.15}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => ((e.target as any).releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e: any) =>
              ((e.target as any).setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))))
            }
          >
            <mesh>
              <boxGeometry args={[1.6, 2.25, 0.02]} />
              <meshPhysicalMaterial
                color="black"
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.5}
              />
            </mesh>
            <mesh position={[0, 0, 0.011]}>
              <planeGeometry args={[1.6, 2.25]} />
              <meshStandardMaterial roughness={0.35} metalness={0.1} side={THREE.DoubleSide}>
                <RenderTexture ref={badgeMap} attach="map" anisotropy={16}>
                  <PerspectiveCamera makeDefault fov={40} position={[0, 0, 5]} />
                  <mesh>
                    <planeGeometry args={[1.6, 2.25]} />
                    <meshBasicMaterial color="black" />
                  </mesh>
                  <group key={nameKey}>
                    <Text color="white" fontSize={0.12} position={[-0.95, 1.35, 0]} anchorX="left" anchorY="top">
                      Portafolio
                    </Text>
                    <Text color="white" fontSize={0.12} position={[0.95, 1.35, 0]} anchorX="right" anchorY="top">
                      2026
                    </Text>

                    <Text color="white" fontSize={0.9} position={[-0.25, 0.4, 0]} anchorX="center" anchorY="middle">
                      {bigLetters[0]}
                    </Text>
                    <Text color="white" fontSize={0.9} position={[0.05, 0.05, 0]} anchorX="center" anchorY="middle">
                      {bigLetters[1]}
                    </Text>
                    <Text color="white" fontSize={0.9} position={[0.35, -0.3, 0]} anchorX="center" anchorY="middle">
                      {bigLetters[2]}
                    </Text>

                    <Text color="white" fontSize={0.14} position={[-0.95, -1.05, 0]} anchorX="left" anchorY="bottom">
                      Software Developer
                    </Text>
                    <Text color="white" fontSize={0.18} position={[-0.95, -1.32, 0]} anchorX="left" anchorY="bottom">
                      {firstName}
                    </Text>
                    <Text color="white" fontSize={0.18} position={[-0.95, -1.5, 0]} anchorX="left" anchorY="bottom">
                      {lastName}
                    </Text>
                  </group>
                </RenderTexture>
              </meshStandardMaterial>
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={texture}
          repeat={[-3, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
