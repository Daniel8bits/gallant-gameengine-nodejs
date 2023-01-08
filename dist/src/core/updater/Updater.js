class Updater {
    _updatables;
    _enabled;
    _disabled;
    constructor() {
        this._updatables = new Map();
        this._enabled = new Map();
        this._disabled = new Map();
    }
    update(time, delta) {
        this.forEachEnabled((entity) => {
            entity.update(time, delta, this);
        });
    }
    add(updatable, visible = true) {
        this._validate(updatable, this._updatables);
        this._updatables.set(updatable.getName(), updatable);
        if (visible) {
            this._enabled.set(updatable.getName(), updatable);
        }
        else {
            this._disabled.set(updatable.getName(), updatable);
        }
        return this;
    }
    remove(updatable) {
        const key = this._validate(updatable, this._updatables, false);
        this._updatables.delete(key);
        if (this._enabled.has(key)) {
            this._enabled.delete(key);
        }
        if (this._disabled.has(key)) {
            this._disabled.delete(key);
        }
        return this;
    }
    enable(updatable) {
        const key = this._validate(updatable, this._updatables, false);
        if (!this._enabled.has(key)) {
            this._enabled.set(key, this._disabled.get(key));
            this._disabled.delete(key);
        }
        return this;
    }
    disable(updatable) {
        const key = this._validate(updatable, this._updatables, false);
        if (!this._disabled.has(key)) {
            this._disabled.set(key, this._enabled.get(key));
            this._enabled.delete(key);
        }
        return this;
    }
    get(name) {
        this._validate(name, this._updatables, false);
        return this._updatables.get(name);
    }
    getKeys() {
        return this._keys(this._updatables);
    }
    getKeysFromEnabled() {
        return this._keys(this._enabled);
    }
    getKeysFromDisabled() {
        return this._keys(this._disabled);
    }
    _keys = (map) => [...map.keys()];
    forEach(fn) {
        this._forEach(fn, this._updatables);
        return this;
    }
    forEachEnabled(fn) {
        this._forEach(fn, this._enabled);
        return this;
    }
    forEachDisabled(fn) {
        this._forEach(fn, this._disabled);
        return this;
    }
    _forEach(fn, map) {
        map.forEach(fn);
    }
    has(updatable) {
        return this._has(updatable, this._updatables);
    }
    hasInEnabled(updatable) {
        return this._has(updatable, this._enabled);
    }
    hasInDisabled(updatable) {
        return this._has(updatable, this._disabled);
    }
    _has(updatable, map) {
        const name = this._getName(updatable);
        return map.has(name);
    }
    filterEnabled(predicate) {
        const filterResult = [];
        this._enabled.forEach((updatable) => {
            if (predicate(updatable)) {
                filterResult.push(updatable);
            }
        });
        return filterResult;
    }
    _validate(updatable, map, exists = true) {
        const name = this._getName(updatable);
        if (exists && map.has(name)) {
            throw new Error(`Entity ${name} already exists!`);
        }
        if (!exists && !map.has(name)) {
            throw new Error(`Entity ${name} does not exists!`);
        }
        return name;
    }
    _getName(updatable) {
        return typeof updatable !== 'string' ? updatable.getName() : updatable;
    }
    get entities() {
        return this._updatables;
    }
}
export default Updater;
