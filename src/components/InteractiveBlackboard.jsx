import { useRef, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

export const InteractiveBlackboard = () => {
    const [drawings, setDrawings] = useState([])
    const isDrawing = useRef(false)
    const { raycaster, camera, scene } = useThree()
    const planeRef = useRef()

    const handlePointerDown = (e) => {
        e.stopPropagation() 
        isDrawing.current = true
        const point = e.point
        setDrawings(prev => [...prev, [point]])
    }

    const handlePointerMove = (e) => {
        if (!isDrawing.current) return
        e.stopPropagation()
        
        const point = e.point
        
        setDrawings(prev => {
            const newDrawings = [...prev]
            const currentLine = newDrawings[newDrawings.length - 1]
            if (currentLine && currentLine.length > 0) {
                const lastPoint = currentLine[currentLine.length - 1]
                if (point.distanceTo(lastPoint) < 0.05) return prev
            }
            
            if (newDrawings.length > 0) {
                newDrawings[newDrawings.length - 1] = [...currentLine, point]
            }
            return newDrawings
        })
    }

    const handlePointerUp = () => {
        isDrawing.current = false
    }

    return (
        <group position={[0, 2, -2.75]}> 
            {/* Invisible Drawing Plane */}
            <mesh 
                ref={planeRef}
                position={[0, 0, 0.15]} 
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                // visible={true} needs to be visible for raycasting, opacity 0 makes it invisible to eye
            >
                <planeGeometry args={[4.8, 2.8]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>

            {/* Render Lines */}
            {drawings.map((points, i) => (
                 points.length > 1 && (
                    <Line 
                        key={i} 
                        points={points} 
                        color="white" 
                        lineWidth={3} 
                        opacity={0.8}
                        transparent
                    />
                 )
            ))}
        </group>
    )
}
