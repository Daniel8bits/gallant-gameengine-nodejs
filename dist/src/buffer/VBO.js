import { gl } from "../gl/GLUtils";
class VBO {
    _id;
    _buffer;
    _offset;
    _created;
    _isAttribute;
    _usage;
    constructor(buffer, offset, isAttribute, usage = gl.STATIC_DRAW) {
        this._buffer = buffer;
        this._offset = offset;
        this._created = false;
        this._isAttribute = isAttribute;
        this._usage = usage;
    }
    getUsage() {
        return this._usage;
    }
    getId() {
        return this._id;
    }
    setId(id) {
        this._id = id;
    }
    getBuffer() {
        return this._buffer;
    }
    setBuffer(buffer) {
        this._buffer = buffer;
    }
    getOffset() {
        return this._offset;
    }
    setCreated(isCreated) {
        this._created = isCreated;
    }
    isCreated() {
        return this._created;
    }
    getType() {
        return this._isAttribute ? gl.ARRAY_BUFFER : gl.ELEMENT_ARRAY_BUFFER;
    }
    getLength() {
        return this._buffer.length;
    }
}
export default VBO;
