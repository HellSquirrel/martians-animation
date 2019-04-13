import math from 'mathjs';

export const createShader = (gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
};

export const createProgram = (gl, vertexShader, fragmentShader) => {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
};

export const drawRandomRect = gl => {
    const startX = math.random(-1, 1);
    const startY = math.random(-1, 1);
    const width = math.random(0, 1);
    const heigth = math.random(0, 1);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        //new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),

        new Float32Array([
            startX,
            startY,
            startX + width,
            startY,
            startX,
            startY + heigth,

            startX,
            startY + heigth,
            startX + width,
            startY,
            startX + width,
            startY + heigth
        ]),
        gl.STATIC_DRAW
    );

    gl.drawArrays(gl.TRIANGLES, 0, 6);
};