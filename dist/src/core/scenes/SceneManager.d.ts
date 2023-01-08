import Scene from "./Scene";
import IUpdatable from "../updater/IUpdatable";
import Updater from "../updater/Updater";
declare class SceneManager implements IUpdatable {
    static readonly NAME: string;
    private _scenes;
    private _active;
    constructor();
    render(delta: number): void;
    update(time: number, delta: number, updater: Updater): void;
    add(scene: Scene, active?: boolean): SceneManager;
    remove(scene: Scene | string): SceneManager;
    setActive(scene: Scene | string): SceneManager | never;
    getActive(): Scene;
    get(name: string): Scene;
    getKeys(): string[];
    forEach(fn: (scene: Scene, key?: string) => void): SceneManager;
    has(scene: Scene | string): boolean;
    private _validate;
    private _getName;
    getName(): string;
}
export default SceneManager;
//# sourceMappingURL=SceneManager.d.ts.map