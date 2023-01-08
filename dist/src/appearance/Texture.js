import { gl } from "../gl/GLUtils";
class Texture {
    _program;
    _width;
    _height;
    _created;
    _data;
    constructor(width = 0, height = 0, data = null) {
        this._width = width;
        this._height = height;
        this._data = data;
        this._created = false;
        const observer = setInterval(() => {
            if (this._created && this._data) {
                this._bindData();
                clearInterval(observer);
            }
        }, 100);
    }
    create() {
        if (!this._created) {
            this._program = gl.createTexture();
            if (this._data) {
                this._bindData();
            }
            if ((this._width < 1 || this._height < 1) && this._data) {
                throw new Error("Invalid image size!");
            }
            this._created = true;
        }
    }
    bind() {
        gl.bindTexture(gl.TEXTURE_2D, this._program);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    }
    unbind() {
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
    destroy() {
        gl.deleteTexture(this._program);
        this._created = false;
    }
    getWidth() {
        return this._width;
    }
    getHeight() {
        return this._height;
    }
    setWidth(width) {
        this._width = width;
    }
    setHeight(height) {
        this._height = height;
    }
    getData() {
        return this._data;
    }
    setData(data) {
        if (data) {
            delete this._data;
            this._data = data;
        }
        if (this._created) {
            this._bindData();
        }
    }
    _bindData() {
        this.bind();
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this._width, this._height, 0, gl.RGBA, gl.UNSIGNED_BYTE, this._data);
    }
    getProgram() {
        return this._program;
    }
    isCreated() {
        return this._created;
    }
}
export default Texture;
