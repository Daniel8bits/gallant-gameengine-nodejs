import VAO from "../../buffer/VAO";
import Renderer from "../../renderer/Renderer";
import Transform from "../../math/Transform";
import Material from "../../appearance/material/Material";
import Scene from "../scenes/Scene";
import Updater from "../updater/Updater";
type NonConstructorKeys<T> = ({
    [P in keyof T]: T[P] extends new () => any ? never : P;
})[keyof T];
type NonConstructor<T> = Pick<T, NonConstructorKeys<T>>;
export type ModelStatic<M extends Entity> = NonConstructor<typeof Entity> & {
    new (...args: any[]): M;
};
declare abstract class Entity {
    private _name;
    private _vao;
    private _material;
    private _renderer;
    private _transform;
    private _scene;
    private static _listEntities;
    constructor(name: string, vao?: VAO, material?: Material, renderer?: Renderer);
    static Find<T extends Entity>(this: ModelStatic<T>, name: string): T;
    abstract update(time: number, delta: number, currentScene: Scene, updater: Updater): void;
    render(): void;
    setVAO(vao: VAO): void;
    setMaterial(material: Material): void;
    setRenderer(renderer: Renderer): void;
    getVAO(): VAO;
    getMaterial(): Material;
    getRenderer(): Renderer;
    getName(): string;
    getTransform(): Transform;
    setScene(scene: Scene): void;
    getScene(): Scene;
}
export default Entity;
//# sourceMappingURL=Entity.d.ts.map