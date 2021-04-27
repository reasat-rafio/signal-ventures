import { useRef } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import * as THREE from 'three'
import { useCtx } from '../../../store'
import { LineWidthGridHelper } from './LineWidthGridHelper'

extend({ LineWidthGridHelper })

const COLORS: { [key: string]: THREE.Color } = {
    codGray: new THREE.Color(0x000),
    codBlack: new THREE.Color(0xffffff),
    brightTurquoise: new THREE.Color(0x39f5e6),
    blackWaves: new THREE.Color(0x000),
    wewak: new THREE.Color(0xffd8bb),
    mandy: new THREE.Color(0xe84971),
}

const SIZE = 80
const SEGMENTS = 60
const LINEWIDTH = 3
// function Grid({ darkMode }) {
//     const gridRef: any = useRef<LineWidthGridHelper>()

//     useFrame(({ clock }) => {
//         if (gridRef.current) {
//             gridRef.current.position.z = (clock.getElapsedTime() % 1) * (SIZE / SEGMENTS)
//         }
//     })
//     return (
//         <lineWidthGridHelper
//             ref={gridRef}
//             position={[0, -5, 0]}
//             args={
//                 darkMode
//                     ? [LINEWIDTH, SIZE, SEGMENTS, COLORS.brightTurquoise, COLORS.brightTurquoise]
//                     : [LINEWIDTH, SIZE, SEGMENTS, COLORS.blackWaves, COLORS.blackWaves]
//             }
//         />
//     )
// }

function Grid({ darkMode }) {
    const gridRef: any = useRef<LineWidthGridHelper>()

    useFrame(({ clock }) => {
        if (gridRef.current) {
            gridRef.current.position.z = (clock.getElapsedTime() % 1) * (SIZE / SEGMENTS)
        }
    })
    return (
        <gridHelper
            ref={gridRef}
            position={[0, -5, 0]}
            args={
                darkMode
                    ? [SIZE, SEGMENTS, COLORS.brightTurquoise, COLORS.brightTurquoise]
                    : [SIZE, SEGMENTS, COLORS.blackWaves, COLORS.blackWaves]
            }
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
                    args={darkMode ? [COLORS.codGray, 5, 30] : [COLORS.codBlack, 5, 30]}
                />

                <Grid darkMode={darkMode} />
            </Canvas>
        </div>
    )
}
