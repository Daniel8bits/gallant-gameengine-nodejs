import Scene from "../core/scenes/Scene";
import Renderer from "./Renderer";
declare class RenderStrategy {
    private _renderers;
    constructor();
    render(delta: number, scene: Scene): void;
    add(renderer: Renderer, active?: boolean): void;
    remove(renderer: Renderer | string): void;
    get(name: string): Renderer;
    getKeys(): string[];
    forEach(fn: (renderer: Renderer, key?: string) => void): void;
    has(renderer: Renderer | string): boolean;
    private _validate;
    private _getName;
}
export default RenderStrategy;
//# sourceMappingURL=RenderStrategy.d.ts.map