import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Cylinder, Trail } from '@react-three/drei'
import * as THREE from 'three'

export const Avatar = ({ isSpeaking, isListening, isLoading }) => {
  const groupRef = useRef()
  const bodyRef = useRef()
  const headRef = useRef()
  const leftHandRef = useRef()
  const rightHandRef = useRef()
  
  // Random blinking
  const [blink, setBlink] = useState(false)
  useEffect(() => {
    const blinkLoop = () => {
        setBlink(true)
        setTimeout(() => setBlink(false), 150)
        setTimeout(blinkLoop, 2000 + Math.random() * 3000)
    }
    const t = setTimeout(blinkLoop, 2000)
    return () => clearTimeout(t)
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    // Floating animation for entire group
    if (groupRef.current) {
        if (isLoading) {
             // Thinking animation
             groupRef.current.position.y = 0.4 + Math.sin(t * 10) * 0.05
             groupRef.current.rotation.y += 0.05
        } else {
             groupRef.current.position.y = 0.4 + Math.sin(t * 1) * 0.1
             groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.05
        }
    }

    // Head looking at mouse (disable if thinking to look confused/busy)
    if (headRef.current) {
        if (isLoading) {
            headRef.current.rotation.x = Math.sin(t * 10) * 0.1
            headRef.current.rotation.y = 0
        } else {
            const targetX = state.mouse.y * 0.3
            const targetY = state.mouse.x * 0.3
            headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetX, 0.1)
            headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetY, 0.1)
        }
    }

    // Hands animation
    if (leftHandRef.current && rightHandRef.current) {
        // Idle floating hands
        leftHandRef.current.position.y = -0.5 + Math.sin(t * 2 + 1) * 0.05
        rightHandRef.current.position.y = -0.5 + Math.sin(t * 2 + 2) * 0.05
        
        if (isSpeaking) {
            // Expressive hands when speaking
            rightHandRef.current.position.x = 0.6 + Math.sin(t * 10) * 0.1
            rightHandRef.current.rotation.z = Math.sin(t * 10) * 0.2
        }
    }
  })

  const primaryColor = isLoading ? "#f1c40f" : "#00a8ff" // Yellow when loading, otherwise Blue
  const baseColor = "#ffffff"
  const screenColor = "#111111"

  return (
    <group ref={groupRef} position={[0, 0.4, 0]}>
      
      {/* --- HEAD --- */}
      <group ref={headRef}>
          {/* Main Head Shape - Capsule-like */}
          <mesh>
              <boxGeometry args={[0.8, 0.7, 0.7]} />
              {/* Make it rounder */}
              <meshStandardMaterial color={baseColor} />
          </mesh>
          {/* Add subdivision modifier effect manually by using a rounded box if available, or just smooth sphere */}
          <Sphere args={[0.55, 32, 32]} scale={[1, 0.85, 0.85]}>
             <meshStandardMaterial color={baseColor} roughness={0.2} metalness={0.1} />
          </Sphere>

          {/* Screen Face */}
          <group position={[0, 0, 0.38]}>
             {/* Visor Glass */}
             <mesh>
                <planeGeometry args={[0.6, 0.35]} />
                <meshStandardMaterial color={screenColor} roughness={0.2} metalness={0.8} />
             </mesh>
             
             {/* Rounded Bezel for visor */}
             <mesh position={[0, 0, -0.01]}>
                <boxGeometry args={[0.65, 0.4, 0.1]} />
                <meshStandardMaterial color="#333" />
             </mesh>

             {/* Eyes */}
             <group position={[0, 0.05, 0.01]}>
                {/* Left Eye */}
                <mesh position={[-0.15, 0, 0]} scale={[1, blink ? 0.1 : 1, 1]}>
                    <circleGeometry args={[0.06, 32]} />
                    <meshBasicMaterial color={primaryColor} toneMapped={false} />
                </mesh>
                {/* Right Eye */}
                <mesh position={[0.15, 0, 0]} scale={[1, blink ? 0.1 : 1, 1]}>
                    <circleGeometry args={[0.06, 32]} />
                    <meshBasicMaterial color={primaryColor} toneMapped={false} />
                </mesh>
             </group>

             {/* Mouth (Audio Viz) */}
             {isSpeaking && (
                 <mesh position={[0, -0.1, 0.01]}>
                    <planeGeometry args={[0.2, 0.02]} />
                    <meshBasicMaterial color={primaryColor} toneMapped={false} />
                 </mesh>
             )}
          </group>

          {/* Antenna / Accessory */}
          <group position={[0, 0.5, 0]}>
              <Cylinder args={[0.02, 0.02, 0.3]} position={[0, 0.15, 0]}>
                  <meshStandardMaterial color="#333" />
              </Cylinder>
              <Sphere args={[0.08]} position={[0, 0.3, 0]}>
                  <meshStandardMaterial color={isListening ? "#ff4757" : primaryColor} emissive={isListening ? "#ff4757" : primaryColor} emissiveIntensity={0.5} />
              </Sphere>
          </group>
      </group>

      {/* --- BODY --- */}
      <group ref={bodyRef} position={[0, -0.8, 0]}>
          {/* Main Body - Floating below head */}
          <Sphere args={[0.4, 32, 32]} scale={[1, 1.2, 1]}>
              <meshStandardMaterial color={baseColor} roughness={0.2} />
          </Sphere>
          
          {/* Core Light */}
          <mesh position={[0, 0, 0.35]}>
              <circleGeometry args={[0.12, 32]} />
              <meshStandardMaterial color="#333" />
          </mesh>
          <mesh position={[0, 0, 0.36]}>
              <circleGeometry args={[0.08, 32]} />
              <meshBasicMaterial color={primaryColor} toneMapped={false} />
          </mesh>
      </group>

      {/* --- HANDS (Floating) --- */}
      <group position={[0, -0.2, 0]}>
          {/* Left Hand */}
          <group ref={leftHandRef} position={[-0.6, -0.5, 0.2]}>
              <Sphere args={[0.12, 16, 16]}>
                  <meshStandardMaterial color={baseColor} />
              </Sphere>
          </group>

          {/* Right Hand (Holding Tablet/Book) */}
          <group ref={rightHandRef} position={[0.6, -0.5, 0.2]}>
              <Sphere args={[0.12, 16, 16]}>
                  <meshStandardMaterial color={baseColor} />
              </Sphere>
              
              {/* Holographic Tablet/Book */}
              <group position={[0, 0.2, 0]} rotation={[-0.5, 0, 0]}>
                  <mesh>
                      <boxGeometry args={[0.4, 0.5, 0.02]} />
                      <meshStandardMaterial color="#333" />
                  </mesh>
                  <mesh position={[0, 0, 0.02]}>
                      <planeGeometry args={[0.36, 0.46]} />
                      <meshBasicMaterial color={primaryColor} transparent opacity={0.3} side={THREE.DoubleSide} />
                  </mesh>
              </group>
          </group>
      </group>

    </group>
  )
}
