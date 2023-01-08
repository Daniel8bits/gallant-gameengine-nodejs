export var gl = null;
class GLUtils {
    static init(canvas) {
        if (!canvas) {
            canvas = document.createElement('canvas');
            document.body.appendChild(canvas);
        }
        gl = canvas.getContext('webgl');
        if (gl === undefined) {
            throw new Error('Unable to initialize WebGL!');
        }
        return canvas;
    }
    static drawByIndices(iboLength) {
        gl.drawElements(gl.TRIANGLES, iboLength, gl.UNSIGNED_SHORT, 0);
    }
    static draw(vaoLength) {
        gl.drawArrays(gl.TRIANGLES, 0, vaoLength);
    }
    static drawBuffer(attachments) {
    }
}
export default GLUtils;
