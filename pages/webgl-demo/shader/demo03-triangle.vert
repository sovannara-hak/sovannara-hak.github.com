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

