import Texture from "../appearance/Texture";
import { gl } from "../gl/GLUtils";
import Gallant from "../core/Gallant";
class Framebuffer {
    _fbo;
    _rbo;
    _attachment;
    _texture;
    constructor(attachemnt, width = Gallant.CANVAS.width, height = Gallant.CANVAS.height) {
        this._attachment = attachemnt;
        this._texture = new Texture(width, height);
    }
    bindTexture() {
        gl.bindTexture(gl.TEXTURE_2D, this._texture.getProgram());
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this._texture.getWidth(), this._texture.getHeight(), 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    }
    create() {
        gl.viewport(0, 0, this._texture.getWidth(), this._texture.getHeight());
        this._fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._fbo);
        this._texture.create();
        this.bindTexture();
        gl.framebufferTexture2D(gl.FRAMEBUFFER, this._attachment, gl.TEXTURE_2D, this._texture.getProgram(), 0);
        this._rbo = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, this._rbo);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this._texture.getWidth(), this._texture.getHeight());
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this._rbo);
        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_COMPLETE) {
            console.log("Error at Framebuffer setting.");
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, Gallant.CANVAS.width, Gallant.CANVAS.height);
    }
    bind() {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._fbo);
        gl.viewport(0, 0, this._texture.getWidth(), this._texture.getHeight());
        Gallant.glSetClearColor();
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
    unbind() {
        this._texture.unbind();
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, Gallant.CANVAS.width, Gallant.CANVAS.height);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
    destroy() {
        gl.deleteFramebuffer(this._fbo);
        gl.deleteRenderbuffer(this._rbo);
    }
    storeBuffer() {
        const data = new Uint8Array(this._texture.getWidth() * this._texture.getHeight() * 4);
        gl.readPixels(0, 0, this._texture.getWidth(), this._texture.getHeight(), gl.RGBA, gl.UNSIGNED_BYTE, data);
        this._texture.setData(data);
    }
    getTexture() {
        return this._texture;
    }
    getAttachemnt() {
        return this._attachment;
    }
}
export default Framebuffer;
