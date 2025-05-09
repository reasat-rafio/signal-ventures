import {
    BufferGeometry,
    Color,
    Float32BufferAttribute,
    LineBasicMaterial,
    LineSegments,
} from 'three'

class LineWidthGridHelper extends LineSegments {
    constructor(
        lineWidth: number = 1,
        size = 10,
        divisions = 10,
        color1: Color | number = 0x444444,
        color2: Color | number = 0x888888,
    ) {
        color1 = new Color(color1)
        color2 = new Color(color2)

        const center = divisions / 2
        const step = size / divisions
        const halfSize = size / 2

        const vertices: any = [],
            colors = []

        for (let i = 0, j = 0, k = -halfSize; i <= divisions; i++, k += step) {
            vertices.push(-halfSize, 0, k, halfSize, 0, k)
            vertices.push(k, 0, -halfSize, k, 0, halfSize)

            const color = i === center ? color1 : color2

            color.toArray(colors, j)
            j += 3
            color.toArray(colors, j)
            j += 3
            color.toArray(colors, j)
            j += 3
            color.toArray(colors, j)
            j += 3
        }

        const geometry = new BufferGeometry()
        geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))
        geometry.setAttribute('color', new Float32BufferAttribute(colors, 3))

        const material = new LineBasicMaterial({
            color: color1,
            linewidth: lineWidth,
            linecap: 'round', //ignored by WebGLRenderer
            linejoin: 'round', //ignored by WebGLRenderer
        })

        super(geometry, material)

        this.type = 'GridHelper'
    }
}

export { LineWidthGridHelper }
