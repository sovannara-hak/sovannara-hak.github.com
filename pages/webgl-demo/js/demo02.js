var positionsBufferObject;
var vertexPositions = [
    0.75, 0.75, 0.0, 1.0,
	0.75, -0.75, 0.0, 1.0,
	-0.75, -0.75, 0.0, 1.0
];

var vertexData = [
    0.0, 0.5, 0.0, 1.0,
    0.5, -0.366, 0.0, 1.0,
    -0.5, -0.366, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 1.0
];

function initVertexBuffer(){
    positionsBufferObject = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionsBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
}

function startGL(){
    //create the promise of getting shaders contents
    var vertexShaderPromise = readShaderSource("shader/demo02-triangle.vert", gl.VERTEX_SHADER);
    var fragmentShaderPromise = readShaderSource("shader/demo02-triangle.frag", gl.FRAGMENT_SHADER);


    //compile shaders when promises are settled
    vertexShaderPromise.then(compileShader);
    fragmentShaderPromise.then(compileShader);

    //When all shaders are compiled,
    //we push a program containing those shaders into the list
    //and then we call the draw function
    Promise.all([vertexShaderPromise, fragmentShaderPromise])
        .then(createProgram)
        .then(draw);
}

function draw(){
        //set the vertices data
        initVertexBuffer();

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        //Only one program, so we use the first one in the list
        gl.useProgram(programList[0]);

        //find the location of the first attribute of the vertex shader
        var positionLocation = gl.getAttribLocation(programList[0], "position");

        //find the location of the color attribute
        var colorLocation = gl.getAttribLocation(programList[0], "color");

        gl.bindBuffer(gl.ARRAY_BUFFER, positionsBufferObject);
        //enable the first attribute of the vertex shader
        gl.enableVertexAttribArray(positionLocation);

        //enable the color attribute
        gl.enableVertexAttribArray(colorLocation);

        //index, number of values, type, false, 0 space between values, offset
        //vertexData: [vertex1_pos, vertex2_pos, vertex3_pos, 
        gl.vertexAttribPointer(positionLocation, 4, gl.FLOAT, false, 0, 0);
        //             vertex1_color, vertex2_color, vertex3_color]
        gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 48);

        gl.drawArrays(gl.TRIANGLES, 0, 3);

}

function demo02_main(canvas_name){
    //init gl
    webGLStart(canvas_name);

    //create the shader program
    startGL();
}
