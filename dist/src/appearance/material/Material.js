class Material {
    _name;
    _shader;
    constructor(name, shader) {
        this._name = name;
        this._shader = shader;
    }
    getShader() {
        return this._shader;
    }
    setShader(shader) {
        this._shader = shader;
    }
    getName() {
        return this._name;
    }
    setName(name) {
        this._name = name;
    }
}
export default Material;
