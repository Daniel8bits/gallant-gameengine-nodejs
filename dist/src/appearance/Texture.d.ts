import IResource from "./IResource";
export interface TextureType {
    name: string;
    pathname?: string;
    texture?: Texture | (() => Texture);
}
declare class Texture implements IResource {
    private _program;
    private _width;
    private _height;
    private _created;
    private _data;
    constructor(width?: number, height?: number, data?: Uint8Array);
    create(): void;
    bind(): void;
    unbind(): void;
    destroy(): void;
    getWidth(): number;
    getHeight(): number;
    setWidth(width: number): void;
    setHeight(height: number): void;
    getData(): Uint8Array;
    setData(data?: Uint8Array): void;
    protected _bindData(): void;
    getProgram(): WebGLTexture;
    isCreated(): boolean;
}
export default Texture;
//# sourceMappingURL=Texture.d.ts.map