var gl;
var programList = [];

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

function ShaderObject (){
    this.type = null;
    this.strSource = null;
    this.shader = null;
}

function readShaderSource(filepath, shaderType){
    return new Promise(function(compileShaderCallback, rejectCallback){
        var shader = new ShaderObject();
        shader.type = shaderType;

        var request = new XMLHttpRequest();

        request.onreadystatechange = function(){
            //When reading finished use content of the shader
            //-->compile
            if(request.readyState == 4){
                if(request.status == 200){
                    shader.strSource = request.responseText;
                    compileShaderCallback(shader);
                }
                else{
                    rejectCallback(Error("cannot read shader "+filepath));
                }
            }
        }

        request.open('GET', filepath, true);
        request.send();
    });
}

/*
 * return a compiled shader
 * params shader: a structure with .type is the shader type
 *                and .strSource is the content of the shader
 */
function compileShader(shaderStruct){
    shaderStruct.shader = gl.createShader(shaderStruct.type);
    gl.shaderSource(shaderStruct.shader, shaderStruct.strSource);

    gl.compileShader(shaderStruct.shader);

    if (!gl.getShaderParameter(shaderStruct.shader, gl.COMPILE_STATUS)){
        alert(gl.getShaderInfoLog(shaderStruct.shader));
    }
}

function createProgram(shaderList){
    var currentProgramIndex = programList.push(gl.createProgram());
    shaderList.forEach(function (shader){
        gl.attachShader(programList[currentProgramIndex-1], shader.shader);
    });

    gl.linkProgram(programList[currentProgramIndex-1]);

    //check link status
    if (!gl.getProgramParameter(programList[currentProgramIndex-1], gl.LINK_STATUS)){
        alert("Could not initialise shaders");
    }
    
    //delete shader
    shaderList.forEach(function (shader){
        gl.deleteShader(shader.shader);
    });
}

