import { Canvas } from '@react-three/fiber'
import { Experience } from './components/Experience'
import { UI } from './components/UI'
import { Suspense } from 'react'
import { useChat } from './hooks/useChat'

function App() {
  const chat = useChat()

  return (
    <>
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 30 }}
      >
        <color attach="background" args={['#eceff1']} />
        <Suspense fallback={null}>
          <Experience {...chat} />
        </Suspense>
      </Canvas>
      <UI {...chat} />
    </>
  )
}

export default App
