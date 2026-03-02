'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, MeshTransmissionMaterial, RoundedBox, useCursor } from '@react-three/drei'
import { Physics, RigidBody, BallCollider } from '@react-three/rapier'
import { Suspense, useRef, useState } from 'react'
import * as THREE from 'three'

// Shared mouse position
const mousePosition = new THREE.Vector2(0, 0)

function FloatingShape({ position, geometry }: { position: [number, number, number], geometry: 'box' | 'sphere' }) {
  const rigidBodyRef = useRef<any>(null)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)
  const { camera, size } = useThree()

  // Update on every frame to apply magnetic force toward cursor
  useFrame(() => {
    if (!rigidBodyRef.current) return

    const shapePos = rigidBodyRef.current.translation()

    // Convert 2D mouse to 3D world position
    const vector = new THREE.Vector3(
      (mousePosition.x / size.width) * 2 - 1,
      -(mousePosition.y / size.height) * 2 + 1,
      0.5
    )
    vector.unproject(camera)
    vector.sub(camera.position).normalize()
    const distance = (shapePos.z - camera.position.z) / vector.z
    const mousePos3D = new THREE.Vector3().copy(camera.position).add(vector.multiplyScalar(distance))

    // Calculate direction and distance to mouse
    const direction = {
      x: mousePos3D.x - shapePos.x,
      y: mousePos3D.y - shapePos.y,
      z: 0
    }

    const dist = Math.sqrt(direction.x ** 2 + direction.y ** 2)

    // Apply FASTER magnetic force (attraction) when mouse is near
    if (dist < 8) {
      const forceMagnitude = (1 - dist / 8) * 0.25 // Much stronger and more responsive
      const force = {
        x: direction.x * forceMagnitude,
        y: direction.y * forceMagnitude,
        z: 0
      }
      rigidBodyRef.current.applyImpulse(force, true)
    }
  })

  const handlePointerDown = (e: any) => {
    e.stopPropagation()
    if (rigidBodyRef.current) {
      // Add bigger impulse when clicked
      const impulse = {
        x: (Math.random() - 0.5) * 4,
        y: Math.random() * 3 + 1,
        z: (Math.random() - 0.5) * 4
      }
      rigidBodyRef.current.applyImpulse(impulse, true)
    }
  }

  // Animate color between green and yellow-green
  const colorRef = useRef(new THREE.Color('#10B981'))
  const [currentColor, setCurrentColor] = useState('#10B981')

  useFrame((state) => {
    // Color cycling (matches gradient animation)
    const time = state.clock.elapsedTime * 0.3
    const cycle = (Math.sin(time) + 1) / 2

    const green = new THREE.Color('#10B981')  // Emerald
    const yellowGreen = new THREE.Color('#84CC16')  // Lime

    colorRef.current.lerpColors(green, yellowGreen, cycle)
    setCurrentColor('#' + colorRef.current.getHexString())
  })

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position}
      restitution={0.9}
      friction={0.1}
      linearDamping={0.2}
      angularDamping={0.3}
    >
      <group
        onPointerDown={handlePointerDown}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {geometry === 'box' ? (
          <RoundedBox args={[1.2, 1.2, 1.2]} radius={0.15}>
            <MeshTransmissionMaterial
              color={currentColor}
              transmission={0.95}
              thickness={0.3}
              roughness={0.05}
              envMapIntensity={1.5}
              clearcoat={1}
              clearcoatRoughness={0}
              transparent
              opacity={hovered ? 0.9 : 0.7}
              ior={1.5}
            />
          </RoundedBox>
        ) : (
          <mesh>
            <sphereGeometry args={[0.7, 32, 32]} />
            <MeshTransmissionMaterial
              color={currentColor}
              transmission={0.95}
              thickness={0.3}
              roughness={0.05}
              envMapIntensity={1.5}
              clearcoat={1}
              clearcoatRoughness={0}
              transparent
              opacity={hovered ? 0.9 : 0.7}
              ior={1.5}
            />
          </mesh>
        )}
      </group>
      <BallCollider args={[geometry === 'box' ? 0.85 : 0.7]} />
    </RigidBody>
  )
}

// Component to track mouse movement
function MouseTracker() {
  const { size } = useThree()

  useFrame((state) => {
    // Update mouse position from pointer
    mousePosition.x = state.pointer.x * size.width / 2 + size.width / 2
    mousePosition.y = -state.pointer.y * size.height / 2 + size.height / 2
  })

  return null
}

function Scene() {
  return (
    <>
      <MouseTracker />
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <pointLight position={[-10, -10, -10]} intensity={0.6} />
      <pointLight position={[0, 5, 5]} intensity={0.8} color="#10B981" />

      <Physics gravity={[0, -1.5, 0]}>
        {/* Invisible floor */}
        <RigidBody type="fixed" position={[0, -5, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial transparent opacity={0} />
          </mesh>
        </RigidBody>

        {/* Invisible walls to keep shapes in bounds */}
        <RigidBody type="fixed" position={[0, 0, -8]}>
          <mesh>
            <boxGeometry args={[30, 20, 0.1]} />
            <meshStandardMaterial transparent opacity={0} />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" position={[0, 0, 8]}>
          <mesh>
            <boxGeometry args={[30, 20, 0.1]} />
            <meshStandardMaterial transparent opacity={0} />
          </mesh>
        </RigidBody>

        {/* Floating shapes - reduced to 5 and better spread out */}
        <FloatingShape position={[-5, 3, 1]} geometry="sphere" />
        <FloatingShape position={[5, 2, -1]} geometry="box" />
        <FloatingShape position={[-3, 0, 2]} geometry="box" />
        <FloatingShape position={[4, -1, -2]} geometry="sphere" />
        <FloatingShape position={[0, 1, 0]} geometry="box" />
      </Physics>
    </>
  )
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 45 }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
