var gl;
var theProgram;
var positionsBufferObject;
var vertexPositions = [
    0.75, 0.75, 0.0, 1.0,
	0.75, -0.75, 0.0, 1.0,
	-0.75, -0.75, 0.0, 1.0
];

function shaderStruct(type, shaderFileName, ready){
    this.type = type;
    this.shaderFileName = shaderFileName;
    this.shader = null;
    this.ready = ready;
}

function getShaderFromFiles(shaderList){
    for ( i = 0; i < shaderList.length; i++){
        getShaderFromFile(shaderList, i);
    }
}

function getShaderFromFile(shaderList, shaderIndex){
    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if (request.readyState == 4 && request.status != 404){
            initShader(shaderList, shaderIndex, request.responseText);
        }
    }

    request.open('GET', shaderList[shaderIndex].shaderFileName, true);
    request.send();
}

function initShader(shaderList, shaderIndex, strShaderSource){
    //shader compilation
    shaderList[shaderIndex].shader = createShader(shaderList[shaderIndex].type, strShaderSource);
    shaderList[shaderIndex].ready = true;

    //check if all shaders are compiled
    for ( i = 0; i < shaderList.length; i++ ){
        if ( shaderList[i].ready == false ){
            return;
        }
    }
    //All shaders are ready, create the program
    createProgram(shaderList);

    //set the vertices data
    initVertexBuffer();

    draw();
}

function webGLStart(canvas_name) {
    //get canvas
    var canvas = document.getElementById(canvas_name);
    try{
        initGL(canvas);
    }
    catch(e){
        alert(e);
    }
}

function initGL(canvas) {
    //get rendering context for webgl
    gl = canvas.getContext("webgl");
    if (gl) {
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;

        console.log(gl);
    }
    else{
        throw new Error("Your browser doesn't support WebGL");
    }
}

function startGL(){
    //create shaders
    var vertexShaderStruct = new shaderStruct(gl.VERTEX_SHADER, "shader/demo01-triangle.vert", false);
    var fragmentShaderStruct = new shaderStruct(gl.FRAGMENT_SHADER, "shader/demo01-triangle.frag", false);

    var shaderList = [vertexShaderStruct, fragmentShaderStruct];

    //compile shaders from files
    getShaderFromFiles(shaderList);
}

function createShader(shaderType, strShaderFile){
    var shader = gl.createShader(shaderType);
    gl.shaderSource(shader, strShaderFile);

    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

function createProgram(shaderList){
    theProgram = gl.createProgram();

    for(i = 0; i < shaderList.length; i++){
        gl.attachShader(theProgram, shaderList[i].shader)
    }

    gl.linkProgram(theProgram);

    //check link status
    if (!gl.getProgramParameter(theProgram, gl.LINK_STATUS)){
        alert("Could not initialise shaders");
    }
    
    //delete shader
    for ( i = 0; i < shaderList.length; i++ ){
        gl.deleteShader(shaderList[i].shader);
    }
}

function initVertexBuffer(){
    positionsBufferObject = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionsBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositions), gl.STATIC_DRAW);
}

function draw(){
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
