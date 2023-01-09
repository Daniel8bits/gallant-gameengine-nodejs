import Texture from "../appearance/Texture";
import Gallant from "../../src/core/Gallant";
import { gl } from "../gl/GLUtils";
class Buffer {
    _buffer;
    _texture;
    constructor(width = Gallant.CANVAS.width, height = Gallant.CANVAS.height) {
        this._buffer = gl.createFramebuffer();
        this._texture = new Texture(width, height);
    }
    init() {
        this.bind();
        this._texture.create();
        this.bindTexture();
        this.unbind();
    }
    bindTexture() {
        gl.bindTexture(gl.TEXTURE_2D, this._texture.getProgram());
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this._texture.getWidth(), this._texture.getHeight(), 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    }
    bind() {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._buffer);
    }
    unbind() {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    getTexture() {
        return this._texture;
    }
    getBuffer() {
        return this._buffer;
    }
}
export default Buffer;
