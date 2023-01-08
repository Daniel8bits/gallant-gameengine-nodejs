import Material from './Material';
import Texture from '../Texture';
import Shader from '../Shader';
declare class DefaultMaterial extends Material {
    private _texture;
    constructor(name: string, shader: Shader, texture?: Texture);
    create(): void;
    bind(): void;
    unbind(): void;
    destroy(): void;
    getTexture(): Texture;
    setTexture(texture: Texture): void;
}
export default DefaultMaterial;
//# sourceMappingURL=DefaultMaterial.d.ts.map