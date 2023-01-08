import Texture from "../appearance/Texture";
declare class Framebuffer {
    private _fbo;
    private _rbo;
    private _attachment;
    private _texture;
    constructor(attachemnt: number, width?: number, height?: number);
    bindTexture(): void;
    create(): void;
    bind(): void;
    unbind(): void;
    destroy(): void;
    storeBuffer(): void;
    getTexture(): Texture;
    getAttachemnt(): number;
}
export default Framebuffer;
//# sourceMappingURL=FrameBuffer.d.ts.map