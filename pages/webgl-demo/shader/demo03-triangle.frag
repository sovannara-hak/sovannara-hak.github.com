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

