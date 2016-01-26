---
title: Webgl Demo
layout: default
---
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/demo01.js"></script>

### WebGL Demos 01:

Those pages illustrate some mini-tests I wrote in order to learn WebGL.

#### Shaders:

Simple use of shaders to draw a simple shape.

<p>
<div class="row">
<div class="col-md-5">
Vertex shader:<br>
{% highlight glsl %}
attribute vec4 position;

void main()
{
    gl_Position = position;
}
{% endhighlight %}
</div>
<div class="col-md-5">
Fragment shader:<br>
{% highlight glsl %}
precision mediump float;

void main()
{
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
{% endhighlight %}
</div>
</div>
</p>

#### Rendering: 

<p>
<canvas id="webgl01-canvas" style="border: none;" width="500" height="500"></canvas>
<script type="text/javascript">
demo01_main("webgl01-canvas");
</script>
</p>

<div class="row">
  <div class="col-md-5">
  </div>
  <div class="col-md-5">
    <a href="demo02.html">Next demo</a>
  </div>
</div>
