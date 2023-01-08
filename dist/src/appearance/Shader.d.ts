import { Matrix4, Vector3, Vector4 } from "@math.gl/core";
import IResource from './IResource';
export interface ShaderType {
    name: string;
    vertexShaderPathname: string;
    fragmentShaderPathname: string;
}
declare class Shader implements IResource {
    private _name;
    private _vertexShaderPathname;
    private _fragmentShaderPathname;
    private _program;
    private _textureCounter;
    private _created;
    constructor(params: ShaderType);
    create(): void;
    private load;
    bind(): void;
    unbind(): void;
    destroy(): void;
    getUniformLocation(name: string): WebGLUniformLocation;
    private _checkIfUniformExists;
    setInt(name: string, value: number): void;
    setIntArray(name: string, arrayValue: number[]): void;
    setFloat(name: string, value: number): void;
    setFloatArray(name: string, arrayValue: number[]): void;
    setVector3(name: string, vector: Vector3): void;
    setVector4(name: string, vector: Vector4): void;
    setMatrix4x4(name: string, matrix: Matrix4): void;
    setTexture(name: string): void;
    getName(): string;
}
export default Shader;
//# sourceMappingURL=Shader.d.ts.map