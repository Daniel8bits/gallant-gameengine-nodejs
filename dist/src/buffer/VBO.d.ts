type IntTypedArray = BigInt64Array | Int32Array | Int16Array | Int8Array;
type UintTypedArray = BigUint64Array | Uint32Array | Uint16Array | Uint8Array;
type FloatTypedArray = Float64Array | Float32Array;
type TypedArray = IntTypedArray | UintTypedArray | FloatTypedArray;
declare class VBO {
    _id: WebGLBuffer;
    _buffer: TypedArray;
    _offset: number;
    _created: boolean;
    _isAttribute: boolean;
    _usage: number;
    constructor(buffer: TypedArray, offset: number, isAttribute: boolean, usage?: number);
    getUsage(): number;
    getId(): WebGLBuffer;
    setId(id: WebGLBuffer): void;
    getBuffer(): TypedArray;
    setBuffer(buffer: TypedArray): void;
    getOffset(): number;
    setCreated(isCreated: boolean): void;
    isCreated(): boolean;
    getType(): number;
    getLength(): number;
}
export default VBO;
//# sourceMappingURL=VBO.d.ts.map