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

var vertexPositionAttribute;
var vertexColorAttribute;
var pMatrixUniform;
var mvMatrixUniform;

function initShaderAttrib(){
    //find the location of the first attribute of the vertex shader
    vertexPositionAttribute = gl.getAttribLocation(programList[0], "position");

    //find the location of the color attribute
    vertexColorAttribute = gl.getAttribLocation(programList[0], "color");

    //init uniforms
    //We must use program to get uniforms location
    gl.useProgram(programList[0]);

    pMatrixUniform = gl.getUniformLocation(programList[0], "uPMatrix");
    mvMatrixUniform = gl.getUniformLocation(programList[0], "uMVMatrix");
}

function initVertexBuffer(){
    positionsBufferObject = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionsBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
}

var pMatrix = mat4.create();
var mvMatrix = mat4.create();

var mvMatrixStack = [];

function setMatrixUniforms(){
    gl.uniformMatrix4fv(pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(mvMatrixUniform, false, mvMatrix);
}

var rotationSpeed = degToRad(50);
var currentTriangleAngle = degToRad(0);
var lastTime = 0;

function mvPushMatrix(){
    var copy = mat4.create();
    mat4.copy(mvMatrix, copy);
    mvMatrixStack.push(copy);
}

function mvPopMatrix(){
    if(mvMatrixStack.length == 0){
        throw "Invalid popMatrix";
    }
    mvMatrix = mvMatrixStack.pop();
}

function degToRad(d) {
    return d * Math.PI / 180;
}

function tick(){
    requestAnimationFrame(initTime);
    requestAnimationFrame(draw);
}

function initTime(now){
    now *= 0.001;
    lastTime = now;
}

function startGL(){
    //create the promise of getting shaders contents
    var vertexShaderPromise = readShaderSource("shader/demo03-triangle.vert", gl.VERTEX_SHADER);
    var fragmentShaderPromise = readShaderSource("shader/demo03-triangle.frag", gl.FRAGMENT_SHADER);


    //compile shaders when promises are settled
    vertexShaderPromise.then(compileShader);
    fragmentShaderPromise.then(compileShader);

    //When all shaders are compiled,
    //we push a program containing those shaders into the list
    //and then we call the draw function
    Promise.all([vertexShaderPromise, fragmentShaderPromise])
        .then(createProgram)
        .then(tick);
}

function draw(now){
    now *= 0.001;
    var deltaTime = now - lastTime;
    lastTime = now;

    //set the vertices data
    initVertexBuffer();
    initShaderAttrib();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.viewport(0.0, 0.0, gl.viewportWidth, gl.viewportHeight);

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
    mat4.identity(mvMatrix);

    setMatrixUniforms();

    //Only one program, so we use the first one in the list
    gl.useProgram(programList[0]);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionsBufferObject);
    //enable the first attribute of the vertex shader
    gl.enableVertexAttribArray(vertexPositionAttribute);

    //enable the color attribute
    gl.enableVertexAttribArray(vertexColorAttribute);

    //index, number of values, type, false, 0 space between values, offset
    //vertexData: [vertex1_pos, vertex2_pos, vertex3_pos, 
    gl.vertexAttribPointer(vertexPositionAttribute, 4, gl.FLOAT, false, 0, 0);
    //             vertex1_color, vertex2_color, vertex3_color]
    gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 48);

    //Draw a rotating triangle
    mvPushMatrix();
    currentTriangleAngle += rotationSpeed * deltaTime
    mat4.translate(mvMatrix, mvMatrix, [-0.5, 0.0, 0.0]);
    mat4.rotate(mvMatrix, mvMatrix, currentTriangleAngle, [0, 1, 0]);

    setMatrixUniforms();

    gl.drawArrays(gl.TRIANGLES, 0, 3);
    mvPopMatrix();

    //Draw a fixed triangle
    mvPushMatrix();
    mat4.translate(mvMatrix, mvMatrix, [0.5, 0.0, 0.0]);
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    mvPopMatrix();

    requestAnimationFrame(draw);
}

function demo03_main(canvas_name){
    //init gl
    webGLStart(canvas_name);

    //create the shader program
    startGL();
}
