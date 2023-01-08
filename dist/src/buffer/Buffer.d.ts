import Texture from "../appearance/Texture";
declare class Buffer {
    private _buffer;
    private _texture;
    constructor(width?: number, height?: number);
    init(): void;
    bindTexture(): void;
    bind(): void;
    unbind(): void;
    getTexture(): Texture;
    getBuffer(): WebGLFramebuffer;
}
export default Buffer;
//# sourceMappingURL=Buffer.d.ts.map