import { gl } from "../gl/GLUtils";
import FileUtils from '../utils/FileUtils';
class Shader {
    _name;
    _vertexShaderPathname;
    _fragmentShaderPathname;
    _program;
    _textureCounter;
    _created;
    constructor(params) {
        this._name = params.name;
        this._vertexShaderPathname = params.vertexShaderPathname;
        this._fragmentShaderPathname = params.fragmentShaderPathname;
        this._textureCounter = 0;
        this._created = false;
    }
    create() {
        if (!this._created) {
            this._program = gl.createProgram();
            const vertexShader = this.load(this._vertexShaderPathname, gl.VERTEX_SHADER);
            const fragmentShader = this.load(this._fragmentShaderPathname, gl.FRAGMENT_SHADER);
            gl.attachShader(this._program, vertexShader);
            gl.attachShader(this._program, fragmentShader);
            gl.linkProgram(this._program);
            const error = gl.getProgramInfoLog(this._program).trim();
            if (error && error !== '') {
                throw new Error(`Error trying to link shader: ${this._name}.\n ${error}`);
            }
            this._created = true;
        }
    }
    load(pathname, type) {
        const shader = gl.createShader(type);
        FileUtils.load(pathname, function onSuccess(file) {
            gl.shaderSource(shader, file);
        }, function onError(err) {
            throw new Error(`Error trying to load shader: ${pathname}.\n ${err}`);
        });
        gl.compileShader(shader);
        const error = gl.getShaderInfoLog(shader).trim();
        if (error && error !== '') {
            throw new Error(`Error trying to compile shader: ${pathname}.\n ${error}`);
        }
        return shader;
    }
    bind() {
        gl.useProgram(this._program);
        this._textureCounter = 0;
    }
    unbind() {
        gl.useProgram(null);
    }
    destroy() {
        gl.deleteShader(this._program);
        this._created = false;
    }
    getUniformLocation(name) {
        return gl.getUniformLocation(this._program, name);
    }
    _checkIfUniformExists(name, setValue) {
        const location = gl.getUniformLocation(this._program, name);
        if (location === -1) {
            throw new Error(`Uniform '${name}' does not exist in shader: ${this._name}`);
        }
        setValue(location);
    }
    setInt(name, value) {
        this._checkIfUniformExists(name, (location) => gl.uniform1i(location, value));
    }
    setIntArray(name, arrayValue) {
        this._checkIfUniformExists(name, (location) => gl.uniform1iv(location, new Int32Array(arrayValue)));
    }
    setFloat(name, value) {
        this._checkIfUniformExists(name, (location) => gl.uniform1f(location, value));
    }
    setFloatArray(name, arrayValue) {
        this._checkIfUniformExists(name, (location) => gl.uniform1fv(location, new Float32Array(arrayValue)));
    }
    setVector3(name, vector) {
        this._checkIfUniformExists(name, (location) => gl.uniform3fv(location, vector));
    }
    setVector4(name, vector) {
        this._checkIfUniformExists(name, (location) => gl.uniform4fv(location, vector));
    }
    setMatrix4x4(name, matrix) {
        this._checkIfUniformExists(name, (location) => gl.uniformMatrix4fv(location, false, matrix));
    }
    setTexture(name) {
        this._checkIfUniformExists(name, (location) => {
            gl.activeTexture(gl.TEXTURE0 + this._textureCounter);
            gl.uniform1i(location, this._textureCounter);
            this._textureCounter++;
        });
    }
    getName() {
        return this._name;
    }
}
export default Shader;
