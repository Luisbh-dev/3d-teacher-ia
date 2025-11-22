import { RoundedBox } from '@react-three/drei'

export const Classroom = () => {
  return (
    <group position={[0, -2, 0]}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#8d6e63" roughness={0.8} />
      </mesh>

      {/* Walls */}
      <group position={[0, 5, 0]}>
        {/* Back Wall (Behind Blackboard) */}
        <mesh position={[0, 0, -3.2]} receiveShadow>
          <boxGeometry args={[15, 10, 0.5]} />
          <meshStandardMaterial color="#f5f5f5" />
        </mesh>
        
        {/* Left Wall */}
        <mesh position={[-7.25, 0, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
          <boxGeometry args={[15, 10, 0.5]} />
          <meshStandardMaterial color="#e0f7fa" />
        </mesh>
        
        {/* Right Wall */}
        <mesh position={[7.25, 0, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
          <boxGeometry args={[15, 10, 0.5]} />
          <meshStandardMaterial color="#e0f7fa" />
        </mesh>
      </group>

      {/* Ceiling */}
      <mesh position={[0, 10, 0]} rotation={[Math.PI / 2, 0, 0]}>
         <planeGeometry args={[15, 15]} />
         <meshStandardMaterial color="#fff" />
      </mesh>

      {/* Baseboards/Trim */}
      <mesh position={[0, 0.25, -3]} receiveShadow>
         <boxGeometry args={[15, 0.5, 0.2]} />
         <meshStandardMaterial color="#5d4037" />
      </mesh>

      {/* Desks Rows */}
      <Desk position={[-2.5, 0, 2]} />
      <Desk position={[2.5, 0, 2]} />
      
      <Desk position={[-2.5, 0, 5]} />
      <Desk position={[2.5, 0, 5]} />

      {/* Decorations */}
      {/* Plant in corner */}
      <group position={[-6, 0, -2]}>
        <mesh position={[0, 0.5, 0]}>
           <cylinderGeometry args={[0.4, 0.3, 1, 16]} />
           <meshStandardMaterial color="#d35400" />
        </mesh>
        <mesh position={[0, 1.5, 0]}>
           <dodecahedronGeometry args={[0.8]} />
           <meshStandardMaterial color="#27ae60" />
        </mesh>
      </group>

    </group>
  )
}

const Desk = ({ position }) => {
    return (
        <group position={position}>
            {/* Desk Table */}
            <RoundedBox args={[2.2, 0.1, 1.2]} radius={0.05} position={[0, 1.2, 0]}>
                <meshStandardMaterial color="#d7ccc8" />
            </RoundedBox>
            {/* Legs */}
            <mesh position={[-1, 0.6, -0.5]}>
                <cylinderGeometry args={[0.05, 0.05, 1.2]} />
                <meshStandardMaterial color="#5d4037" />
            </mesh>
             <mesh position={[1, 0.6, -0.5]}>
                <cylinderGeometry args={[0.05, 0.05, 1.2]} />
                <meshStandardMaterial color="#5d4037" />
            </mesh>
             <mesh position={[-1, 0.6, 0.5]}>
                <cylinderGeometry args={[0.05, 0.05, 1.2]} />
                <meshStandardMaterial color="#5d4037" />
            </mesh>
             <mesh position={[1, 0.6, 0.5]}>
                <cylinderGeometry args={[0.05, 0.05, 1.2]} />
                <meshStandardMaterial color="#5d4037" />
            </mesh>

            {/* Chair */}
             <group position={[0, 0, 0.8]}>
                {/* Seat */}
                <RoundedBox args={[0.8, 0.1, 0.8]} radius={0.05} position={[0, 0.8, 0]}>
                     <meshStandardMaterial color="#8d6e63" />
                </RoundedBox>
                {/* Back */}
                <RoundedBox args={[0.8, 0.8, 0.1]} radius={0.05} position={[0, 1.2, 0.35]}>
                     <meshStandardMaterial color="#8d6e63" />
                </RoundedBox>
                {/* Legs */}
                <mesh position={[-0.35, 0.4, -0.35]}>
                    <cylinderGeometry args={[0.04, 0.04, 0.8]} />
                    <meshStandardMaterial color="#3e2723" />
                </mesh>
                <mesh position={[0.35, 0.4, -0.35]}>
                    <cylinderGeometry args={[0.04, 0.04, 0.8]} />
                    <meshStandardMaterial color="#3e2723" />
                </mesh>
                <mesh position={[-0.35, 0.4, 0.35]}>
                    <cylinderGeometry args={[0.04, 0.04, 0.8]} />
                    <meshStandardMaterial color="#3e2723" />
                </mesh>
                <mesh position={[0.35, 0.4, 0.35]}>
                    <cylinderGeometry args={[0.04, 0.04, 0.8]} />
                    <meshStandardMaterial color="#3e2723" />
                </mesh>
             </group>
        </group>
    )
}
