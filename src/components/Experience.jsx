import { Environment, ContactShadows, Float } from '@react-three/drei'
import { Avatar } from './Avatar'
import { Classroom } from './Classroom'
import { InteractiveBlackboard } from './InteractiveBlackboard'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const Blackboard = () => {
    return (
        <group position={[0, 2, -2.8]}>
            {/* Frame */}
            <mesh>
                <boxGeometry args={[5.2, 3.2, 0.1]} />
                <meshStandardMaterial color="#5d4037" />
            </mesh>
            {/* Board */}
            <mesh position={[0, 0, 0.06]}>
                <boxGeometry args={[5, 3, 0.01]} />
                <meshStandardMaterial color="#2c3e50" roughness={0.8} />
            </mesh>
            {/* Chalk tray */}
            <mesh position={[0, -1.5, 0.2]}>
                <boxGeometry args={[5, 0.1, 0.3]} />
                <meshStandardMaterial color="#5d4037" />
            </mesh>
        </group>
    )
}

export const Experience = ({ isLoading, isListening, isSpeaking }) => {
  return (
    <>
      <Environment preset="city" />
      
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      
      {/* Classroom Environment */}
      <Classroom />

      <Blackboard />
      <InteractiveBlackboard />

      <Avatar 
        isLoading={isLoading} 
        isListening={isListening} 
        isSpeaking={isSpeaking} 
      />

      <ContactShadows 
        opacity={0.5} 
        scale={10} 
        blur={2.5} 
        far={4} 
        resolution={256} 
        color="#000000" 
      />
    </>
  )
}
