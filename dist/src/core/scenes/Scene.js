import RenderStrategy from "../../renderer/RenderStrategy";
import Entity from "../entities/Entity";
class Scene {
    _name;
    _entities;
    _visible;
    _hidden;
    _renderStrategy;
    _onChangeEvent;
    constructor(name) {
        this._name = name;
        this._entities = new Map();
        this._visible = new Map();
        this._hidden = new Map();
        this._renderStrategy = new RenderStrategy();
        this._onChangeEvent = null;
    }
    update(time, delta, updater) {
        this.forEachVisible((entity) => {
            entity.update(time, delta, this, updater);
        });
    }
    render(delta) {
        this._renderStrategy.render(delta, this);
    }
    add(entity, visible = true) {
        const key = this._validate(entity, this._entities);
        entity.setScene(this);
        this._entities.set(entity.getName(), entity);
        if (visible) {
            this._visible.set(entity.getName(), entity);
        }
        else {
            this._hidden.set(entity.getName(), entity);
        }
        return this;
    }
    remove(entity) {
        const key = this._validate(entity, this._entities, false);
        const removingEntity = this._entities.get(key);
        this._entities.delete(key);
        removingEntity.setScene(null);
        if (this._visible.has(key)) {
            this._visible.delete(key);
        }
        if (this._hidden.has(key)) {
            this._hidden.delete(key);
        }
        return this;
    }
    setVisibility(entity, visible) {
        const key = this._validate(entity, this._entities, false);
        if (visible) {
            this._visible.set(key, this._hidden.get(key));
            this._hidden.delete(key);
        }
        else {
            this._hidden.set(key, this._visible.get(key));
            this._visible.delete(key);
        }
        return this;
    }
    get(name) {
        this._validate(name, this._entities, false);
        return this._entities.get(name);
    }
    getKeys() {
        return this._keys(this._entities);
    }
    getKeysFromVisible() {
        return this._keys(this._visible);
    }
    getKeysFromHidden() {
        return this._keys(this._hidden);
    }
    _keys = (map) => [...map.keys()];
    forEach(fn) {
        this._forEach(fn, this._entities);
        return this;
    }
    forEachVisible(fn) {
        this._forEach(fn, this._visible);
        return this;
    }
    forEachHidden(fn) {
        this._forEach(fn, this._hidden);
        return this;
    }
    _forEach(fn, map) {
        map.forEach(fn);
    }
    has(entity) {
        return this._has(entity, this._entities);
    }
    hasInVisible(entity) {
        return this._has(entity, this._visible);
    }
    hasInHidden(entity) {
        return this._has(entity, this._hidden);
    }
    _has(entity, map) {
        const name = this._getName(entity);
        return map.has(name);
    }
    filterVisible(predicate) {
        const filterResult = [];
        this._visible.forEach((entity) => {
            if (predicate(entity)) {
                filterResult.push(entity);
            }
        });
        return filterResult;
    }
    _validate(entity, map, exists = true) {
        const name = this._getName(entity);
        if (exists && map.has(name)) {
            throw new Error(`Entity ${name} already exists!`);
        }
        if (!exists && !map.has(name)) {
            throw new Error(`Entity ${name} does not exists!`);
        }
        return name;
    }
    _getName(entity) {
        return entity instanceof Entity ? entity.getName() : entity;
    }
    getName() {
        return this._name;
    }
    get entities() {
        return this._entities;
    }
    getRenderStrategy() {
        return this._renderStrategy;
    }
    onChange(onChangeEvent) {
        this._onChangeEvent = onChangeEvent;
    }
    getOnChangeEvent() {
        return this._onChangeEvent;
    }
}
export default Scene;
