var gl;
var theProgram;

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

function shaderStruct(type, shaderFileName, ready){
    this.type = type;
    this.shaderFileName = shaderFileName;
    this.shader = null;
    this.ready = ready;
}

function getShaderFromFiles(shaderList, drawFunction){
    for ( i = 0; i < shaderList.length; i++){
        getShaderFromFile(shaderList, i, drawFunction);
    }
}

function getShaderFromFile(shaderList, shaderIndex, drawFunction){
    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if (request.readyState == 4 && request.status != 404){
            initShader(shaderList, shaderIndex, request.responseText, drawFunction);
        }
    }

    request.open('GET', shaderList[shaderIndex].shaderFileName, true);
    request.send();
}

function initShader(shaderList, shaderIndex, strShaderSource, drawFunction){
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

    drawFunction();
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

