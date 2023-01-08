import Renderer from "./Renderer";
class RenderStrategy {
    _renderers;
    constructor() {
        this._renderers = new Map();
    }
    render(delta, scene) {
        this._renderers.forEach((renderer) => {
            renderer.setScene(scene);
            renderer.render(delta);
        });
    }
    add(renderer, active = false) {
        const key = this._validate(renderer);
        this._renderers.set(key, renderer);
    }
    remove(renderer) {
        const key = this._validate(renderer, false);
        this._renderers.delete(key);
    }
    get(name) {
        this._validate(name, false);
        return this._renderers.get(name);
    }
    getKeys() {
        return [...this._renderers.keys()];
    }
    forEach(fn) {
        this._renderers.forEach((renderer, key) => {
            fn(renderer, key);
        });
    }
    has(renderer) {
        const name = this._getName(renderer);
        return this._renderers.has(name);
    }
    _validate(renderer, exists = true) {
        const name = this._getName(renderer);
        if (exists && this._renderers.has(name)) {
            throw new Error(`Renderer ${name} already exists!`);
        }
        if (!exists && !this._renderers.has(name)) {
            throw new Error(`Renderer ${name} does not exists!`);
        }
        return name;
    }
    _getName(renderer) {
        return renderer instanceof Renderer ? renderer.getName() : renderer;
    }
}
export default RenderStrategy;
