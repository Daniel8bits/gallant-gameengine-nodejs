import Scene from "./Scene";
class SceneManager {
    static NAME = "scene-manager";
    _scenes;
    _active;
    constructor() {
        this._scenes = new Map();
        this._active = null;
    }
    render(delta) {
        this._active.render(delta);
    }
    update(time, delta, updater) {
        this._active.update(time, delta, updater);
    }
    add(scene, active = false) {
        const key = this._validate(scene);
        this._scenes.set(key, scene);
        if (active) {
            this._active = scene;
        }
        return this;
    }
    remove(scene) {
        const key = this._validate(scene, false);
        this._scenes.delete(key);
        if (this._active.getName() === key) {
            this._active = null;
        }
        return this;
    }
    setActive(scene) {
        const key = this._validate(scene, false);
        this._active = this._scenes.get(key);
        this._active.getOnChangeEvent()?.();
        return this;
    }
    getActive() {
        return this._active;
    }
    get(name) {
        this._validate(name, false);
        return this._scenes.get(name);
    }
    getKeys() {
        return [...this._scenes.keys()];
    }
    forEach(fn) {
        this._scenes.forEach((scene, key) => {
            fn(scene, key);
        });
        return this;
    }
    has(scene) {
        const name = this._getName(scene);
        return this._scenes.has(name);
    }
    _validate(scene, exists = true) {
        const name = this._getName(scene);
        if (exists && this._scenes.has(name)) {
            throw new Error(`Scene ${name} already exists!`);
        }
        if (!exists && !this._scenes.has(name)) {
            throw new Error(`Scene ${name} does not exists!`);
        }
        return name;
    }
    _getName(scene) {
        return scene instanceof Scene ? scene.getName() : scene;
    }
    getName() {
        return SceneManager.NAME;
    }
}
export default SceneManager;
