var positionsBufferObject;
var vertexPositions = [
    0.75, 0.75, 0.0, 1.0,
	0.75, -0.75, 0.0, 1.0,
	-0.75, -0.75, 0.0, 1.0
];

function initVertexBuffer(){
    positionsBufferObject = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionsBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositions), gl.STATIC_DRAW);
}

function startGL(){
    //create shaders
    var vertexShaderStruct = new shaderStruct(gl.VERTEX_SHADER, "shader/demo01-triangle.vert", false);
    var fragmentShaderStruct = new shaderStruct(gl.FRAGMENT_SHADER, "shader/demo01-triangle.frag", false);

    var shaderList = [vertexShaderStruct, fragmentShaderStruct];

    //compile shaders from files
    getShaderFromFiles(shaderList, draw);
}

function draw(){
        //set the vertices data
        initVertexBuffer();

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(theProgram);

        //find the location of the first attribute of the vertex shader
        var positionLocation = gl.getAttribLocation(theProgram, "position");

        gl.bindBuffer(gl.ARRAY_BUFFER, positionsBufferObject);
        //enable the first attribute of the vertex shader
        gl.enableVertexAttribArray(positionLocation);
        //index, number of values, type, false, 0 space between values, offset
        gl.vertexAttribPointer(positionLocation, 4, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 3);

}

function demo01_main(canvas_name){
    //init gl
    webGLStart(canvas_name);

    //create the shader program
    startGL();
}
