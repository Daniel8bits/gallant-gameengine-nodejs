import Material from './Material';
class EmptyMaterial extends Material {
    constructor() {
        super("empty", null);
    }
    create() {
    }
    bind() {
    }
    unbind() {
    }
    destroy() {
    }
}
export default EmptyMaterial;
