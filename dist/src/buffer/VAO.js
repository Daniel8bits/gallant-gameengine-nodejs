import { gl } from '../gl/GLUtils';
import VBO from './VBO';
class VAO {
    _vboList;
    _ibo;
    _vertexCoordsOffset;
    constructor(vboList, vertexCoordsOffset = 3) {
        this._vboList = [];
        vboList.forEach((vbo) => {
            if (vbo !== null && vbo !== undefined) {
                this._vboList.push(vbo);
                if (vbo.getType() === gl.ELEMENT_ARRAY_BUFFER) {
                    this._ibo = vbo;
                }
            }
        });
        if (vboList.length > 0 && !this._ibo) {
            this._ibo = vboList[0];
        }
        this._vertexCoordsOffset = vertexCoordsOffset;
    }
    addEmpty(n) {
        const vbo = [];
        for (let i = 0; i < n; i++)
            vbo.push(new VBO(new Float32Array([]), 2, true, gl.DYNAMIC_DRAW));
        this._vboList = vbo;
        this._ibo = this._vboList[0];
    }
    create() {
        for (let i = 0; i < this._vboList.length; i++) {
            this._createVBO(i, this._vboList[i]);
        }
    }
    _createVBO(target, vbo) {
        if (vbo.getId() == null)
            vbo.setId(gl.createBuffer());
        gl.bindBuffer(vbo.getType(), vbo.getId());
        if (vbo.getBuffer().length > 0)
            gl.bufferData(vbo.getType(), vbo.getBuffer(), vbo.getUsage());
        if (vbo.getType() === gl.ARRAY_BUFFER) {
            this._setAttributePointer(target, vbo);
        }
        gl.bindBuffer(vbo.getType(), undefined);
    }
    bind() {
        for (let i = 0; i < this._vboList.length; i++) {
            gl.bindBuffer(this._vboList[i].getType(), this._vboList[i].getId());
            if (this._vboList[i].getType() !== gl.ELEMENT_ARRAY_BUFFER) {
                this._setAttributePointer(i, this._vboList[i]);
                gl.enableVertexAttribArray(i);
            }
        }
    }
    unbind() {
        for (let i = this._vboList.length - 1; i >= 0; i--) {
            gl.bindBuffer(this._vboList[i].getType(), this._vboList[i].getId());
            if (this._vboList[i].getType() !== gl.ELEMENT_ARRAY_BUFFER) {
                gl.disableVertexAttribArray(i);
            }
        }
    }
    destroy() {
        for (let i = this._vboList.length - 1; i >= 0; i--) {
            gl.deleteBuffer(this._vboList[i].getId());
        }
    }
    _setAttributePointer(target, vbo) {
        const setAttributePointer = (dataType) => {
            gl.vertexAttribPointer(target, vbo.getOffset(), dataType, false, 0, 0);
        };
        if (vbo.getBuffer() instanceof Int8Array) {
            setAttributePointer(gl.BYTE);
        }
        if (vbo.getBuffer() instanceof Int16Array) {
            setAttributePointer(gl.SHORT);
        }
        if (vbo.getBuffer() instanceof Int32Array) {
            setAttributePointer(gl.INT);
        }
        if (vbo.getBuffer() instanceof Uint8Array) {
            setAttributePointer(gl.UNSIGNED_BYTE);
        }
        if (vbo.getBuffer() instanceof Uint16Array) {
            setAttributePointer(gl.UNSIGNED_SHORT);
        }
        if (vbo.getBuffer() instanceof Uint32Array) {
            setAttributePointer(gl.UNSIGNED_INT);
        }
        if (vbo.getBuffer() instanceof Float32Array) {
            setAttributePointer(gl.FLOAT);
        }
    }
    getVbo(i) {
        return this._vboList[i];
    }
    getIbo() {
        return this._ibo;
    }
    getLength() {
        if (!this._ibo)
            return 0;
        return this._ibo.getLength() / this._vertexCoordsOffset;
    }
}
export default VAO;
