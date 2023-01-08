import Transform from "../../math/Transform";
class Entity {
    _name;
    _vao;
    _material;
    _renderer;
    _transform;
    _scene;
    static _listEntities = new Map();
    constructor(name, vao, material, renderer) {
        Entity._listEntities.set(name, this);
        this._name = name;
        this._vao = vao;
        this._material = material;
        this._renderer = renderer;
        this._transform = new Transform();
        this.getTransform().setEntity(this);
    }
    static Find(name) {
        return Entity._listEntities.get(name);
    }
    render() {
    }
    setVAO(vao) {
        this._vao = vao;
    }
    setMaterial(material) {
        this._material = material;
    }
    setRenderer(renderer) {
        this._renderer = renderer;
    }
    getVAO() {
        return this._vao;
    }
    getMaterial() {
        return this._material;
    }
    getRenderer() {
        return this._renderer;
    }
    getName() {
        return this._name;
    }
    getTransform() {
        return this._transform;
    }
    setScene(scene) {
        this._scene = scene;
    }
    getScene() {
        return this._scene;
    }
}
export default Entity;
