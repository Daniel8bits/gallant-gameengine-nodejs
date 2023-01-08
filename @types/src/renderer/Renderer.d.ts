import Entity from "../core/entities/Entity";
import Scene from "../core/scenes/Scene";
import Shader from "../appearance/Shader";
import Material from "../appearance/material/Material";
import Camera from "../core/Camera";
declare abstract class Renderer {
    private _name;
    private _scene;
    private _camera;
    protected _maximumRenderDistance: number;
    protected constructor(name: string, camera: Camera);
    protected getEntitiesByMaterial(material: Material): Entity[];
    protected getEntitiesByShader(shader: Shader): Entity[];
    abstract render(delta: number): void;
    getName(): string;
    setScene(scene: Scene): void;
    getScene(): Scene;
    getCamera(): Camera;
}
export default Renderer;
//# sourceMappingURL=Renderer.d.ts.map