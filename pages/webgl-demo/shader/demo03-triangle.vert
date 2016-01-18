attribute vec4 position;
attribute vec4 color;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec4 theColor;

void main()
{
    gl_Position = uPMatrix * uMVMatrix * position;
    theColor = color;
}

