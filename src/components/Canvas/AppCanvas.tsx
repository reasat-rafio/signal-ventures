import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useCtx } from '../../../store'

const COLORS: { [key: string]: THREE.Color } = {
    codGray: new THREE.Color(0x000),
    codBlue: new THREE.Color(0x0e1c3d),
    brightTurquoise: new THREE.Color(0x39f5e6),
    wewak: new THREE.Color(0xffd8bb),
    mandy: new THREE.Color(0xe84971),
}

function Grid() {
    const SIZE = 80
    const SEGMENTS = 60
    const gridRef: any = useRef<THREE.GridHelper>()

    useFrame(({ clock }) => {
        gridRef.current.position.z = (clock.getElapsedTime() % 1) * (SIZE / SEGMENTS)
    })
    return (
        <gridHelper
            ref={gridRef}
            position={[0, -5, 0]}
            args={[SIZE, SEGMENTS, COLORS.brightTurquoise, COLORS.brightTurquoise]}
        />
    )
}

export const AppCanvas: React.FC = ({}) => {
    const {
        state: { darkMode },
    } = useCtx()

    return (
        <div className="z-1 bottom-10 fixed w-screen h-full">
            <Canvas camera={{ position: [0, 0, 15] }}>
                <fog
                    attach="fog"
                    args={darkMode ? [COLORS.codGray, 5, 30] : [COLORS.codBlue, 5, 30]}
                />

                <Grid />
            </Canvas>
        </div>
    )
}
