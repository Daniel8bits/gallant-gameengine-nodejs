import { gl } from "@gl/GLUtils";

type IntTypedArray = BigInt64Array | Int32Array | Int16Array | Int8Array ;
type UintTypedArray = BigUint64Array | Uint32Array | Uint16Array | Uint8Array ;
type FloatTypedArray = Float64Array | Float32Array;
type TypedArray = IntTypedArray | UintTypedArray | FloatTypedArray;

class VBO {

    _id : WebGLBuffer;
    _buffer : TypedArray;
    _offset : number;
    _created : boolean;
    _isAttribute : boolean;
    _usage: number;
    
    public constructor(buffer: TypedArray, offset: number, isAttribute: boolean,usage : number = gl.STATIC_DRAW) {
        this._buffer = buffer;
        this._offset = offset;
        this._created = false;
        this._isAttribute = isAttribute;
        this._usage = usage;
    }

    public getUsage() : number{
        return this._usage;
    }

    public getId(): WebGLBuffer {
        return this._id;
    }

    public setId(id : WebGLBuffer): void {
        this._id = id;
    }

    public getBuffer() : TypedArray {
        return this._buffer;
    }

    public setBuffer(buffer : TypedArray) : void {
        this._buffer = buffer;
    }

    public getOffset(): number {
        return this._offset;
    }

    public setCreated(isCreated: boolean) : void{
        this._created = isCreated;
    }

    public isCreated() : boolean {
        return this._created;
    }

    public getType(): number {
        return this._isAttribute ? gl.ARRAY_BUFFER : gl.ELEMENT_ARRAY_BUFFER;
    }

    public getLength(): number {
        return this._buffer.length;
    }
    
}

export default VBO;