import IResource from '../IResource';
import Shader from '../Shader';
declare abstract class Material implements IResource {
    private _name;
    private _shader;
    constructor(name: string, shader: Shader);
    abstract create(): void;
    abstract bind(): void;
    abstract unbind(): void;
    abstract destroy(): void;
    getShader(): Shader;
    setShader(shader: Shader): void;
    getName(): string;
    setName(name: string): void;
}
export default Material;
//# sourceMappingURL=Material.d.ts.map