---
title: Webgl Demo 3
layout: default
---

<script type="text/javascript" src="js/libs/gl-matrix-min.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/demo03.js"></script>

### WebGL Demos 03:

Animation test and computation of colors in the fragment shader.

#### Shaders:

<p>
<div class="row">
<div class="col-md-5">
Vertex shader:<br>
{% highlight glsl %}
attribute vec4 position;
attribute vec4 color;
attribute vec4 color2;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec4 theColor;
varying vec4 theColor2;

void main()
{
    gl_Position = uPMatrix * uMVMatrix * position;
    theColor = color;
    theColor2 = color2;
}
{% endhighlight %}
</div>
<div class="col-md-5">
Fragment shader:<br>
{% highlight glsl %}
precision mediump float;

varying vec4 theColor;
varying vec4 theColor2;

uniform float uFragLoopDuration;
uniform float uFragTime;

const float PI = 3.141592653589793238462643383;

void main()
{
    float currTime = mod(uFragTime, uFragLoopDuration);
    float currInterp = abs(sin( (currTime / uFragLoopDuration) * PI ));

    gl_FragColor = mix(theColor, theColor2, currInterp);
}
{% endhighlight %}
</div>
</div>
</p>

#### Rendering: 

<p>
<div>
<canvas id="webgl03-canvas" style="border: none;" width="500" height="500"></canvas>

<script type="text/javascript">
    demo03_main("webgl03-canvas");
</script>
</div>
</p>

<div class="row">
  <div class="col-md-5">
    <a href="demo02.html">Previous demo</a>
  </div>
  <div class="col-md-5">
  </div>
</div>
