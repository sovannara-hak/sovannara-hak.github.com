var gl;
var theProgram;
var positionsBufferObject;
var vertexPositions = [
    0.75, 0.75, 0.0, 1.0,
	0.75, -0.75, 0.0, 1.0,
	-0.75, -0.75, 0.0, 1.0
];

function getShaderStrFromFile(fileName){
    var request = new XMLHttpRequest();

    request.onreadystatechange = function (){
        if (request.readyState == 4 && request.status != 404){
            return request.responseText;
        }
    }

    request.open('GET', fileName, false);
    request.send();
    return request.onreadystatechange();
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

function initProgram(){
    //create shader
    var strVertexShader = getShaderStrFromFile("shader/demo01-triangle.vert");
    var strFragmentShader = getShaderStrFromFile("shader/demo01-triangle.frag");

    var vertexShader = createShader(gl.VERTEX_SHADER, strVertexShader);
    var fragmentShader = createShader(gl.FRAGMENT_SHADER, strFragmentShader);

    //create the program
    theProgram = gl.createProgram();

    gl.attachShader(theProgram, vertexShader)
    gl.attachShader(theProgram, fragmentShader)

    gl.linkProgram(theProgram);

    //check link status
    if (!gl.getProgramParameter(theProgram, gl.LINK_STATUS)){
        alert("Could not initialise shaders");
    }
    //delete shader
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

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
        gl.attachShader(theProgram, shaderList[i])
    }

    gl.linkProgram(theProgram);

    //check link status
    if (!gl.getProgramParameter(theProgram, gl.LINK_STATUS)){
        alert("Could not initialise shaders");
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
    initProgram();

    //set the vertices data
    initVertexBuffer();

    draw();
}
