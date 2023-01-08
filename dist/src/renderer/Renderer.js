class Renderer {
    _name;
    _scene;
    _camera;
    _maximumRenderDistance;
    constructor(name, camera) {
        this._name = name;
        this._camera = camera;
        this._maximumRenderDistance = -1;
    }
    getEntitiesByMaterial(material) {
        return this._scene.filterVisible((entity) => entity.getRenderer() &&
            entity.getRenderer().getName() === this._name &&
            entity.getMaterial() &&
            entity.getMaterial().getName() === material.getName() &&
            (this._maximumRenderDistance < 0 ||
                this._camera.getTransform().getTranslation().distanceTo(entity.getTransform().getTranslation()) < this._maximumRenderDistance));
    }
    getEntitiesByShader(shader) {
        return this._scene.filterVisible((entity) => entity.getRenderer().getName() === this._name &&
            entity.getMaterial().getShader().getName() === shader.getName());
    }
    getName() {
        return this._name;
    }
    setScene(scene) {
        this._scene = scene;
    }
    getScene() {
        return this._scene;
    }
    getCamera() {
        return this._camera;
    }
}
export default Renderer;
