---
title: Webgl Demo
layout: default
---
<script type="text/javascript">
    var gl;

    function webGLStart() {
        var canvas = document.getElementById("webgl-canvas");
        try{
            initGL(canvas);

            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
        }
        catch(e){
            alert(e);
        }

    }

    function initGL(canvas) {
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
</script>

<div>
<center>
<canvas id="webgl-canvas" style="border: none;" width="500" height="500"></canvas>
</center>

<script type="text/javascript">
    webGLStart();
</script>
</div>
