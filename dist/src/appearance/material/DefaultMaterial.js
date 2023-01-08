import Material from './Material';
import { gl } from '../../gl/GLUtils';
class DefaultMaterial extends Material {
    _texture;
    constructor(name, shader, texture) {
        super(name, shader);
        this._texture = texture;
    }
    create() {
        this.getShader().create();
        this._texture?.create();
    }
    bind() {
        this.getShader().bind();
        if (this._texture) {
            gl.activeTexture(gl.TEXTURE0);
            this._texture.bind();
            this.getShader().setInt('u_texture', 0);
        }
    }
    unbind() {
        this._texture?.unbind();
        this.getShader().unbind();
    }
    destroy() {
        this._texture?.destroy();
        this.getShader().destroy();
    }
    getTexture() {
        return this._texture;
    }
    setTexture(texture) {
        this._texture = texture;
    }
}
export default DefaultMaterial;
