import Shader from '../appearance/Shader';
import VAO from '../buffer/VAO';
import OBJLoader from '../loader/OBJLoader';
import TextureLoader from '../loader/TextureLoader';
import Sound from '../sound/Sound';
class ResourceManager {
    static _instance;
    _shaders;
    _vaos;
    _textures;
    _materials;
    _sounds;
    constructor() {
        this._shaders = new Map();
        this._vaos = new Map();
        this._textures = new Map();
        this._materials = new Map();
        this._sounds = new Map();
    }
    static getInstance() {
        if (!ResourceManager._instance) {
            ResourceManager._instance = new ResourceManager();
        }
        return ResourceManager._instance;
    }
    static loadVAO(vaos) {
        return ResourceManager.getInstance().loadVAO(vaos);
    }
    loadVAO(vaos) {
        vaos.forEach((vao) => {
            if (this._vaos.has(vao.name)) {
                throw new Error(`Shader '${vao.name}' already exists!`);
            }
            if (typeof vao.objectData === 'string') {
                this._vaos.set(vao.name, new OBJLoader().load(vao.objectData));
                return;
            }
            if (typeof vao.objectData === 'function') {
                this._vaos.set(vao.name, vao.objectData());
                return;
            }
            this._vaos.set(vao.name, new VAO(vao.objectData));
        });
        return this;
    }
    static getVAO(name) {
        return ResourceManager.getInstance().getVAO(name);
    }
    getVAO(name) {
        return this._vaos.get(name);
    }
    static forEachVAO(callback) {
        return ResourceManager.getInstance().forEachVAO(callback);
    }
    forEachVAO(callback) {
        this._vaos.forEach(callback);
        return this;
    }
    static loadShader(shaders) {
        return ResourceManager.getInstance().loadShader(shaders);
    }
    loadShader(shaders) {
        shaders.forEach((shader) => {
            if (this._shaders.has(shader.name)) {
                throw new Error(`Shader '${shader.name}' already exists!`);
            }
            this._shaders.set(shader.name, new Shader(shader));
        });
        return this;
    }
    static getShader(name) {
        return ResourceManager.getInstance().getShader(name);
    }
    getShader(name) {
        return this._shaders.get(name);
    }
    static forEachShader(callback) {
        return ResourceManager.getInstance().forEachShader(callback);
    }
    forEachShader(callback) {
        this._shaders.forEach(callback);
        return this;
    }
    static loadTextures(textures) {
        return ResourceManager.getInstance().loadTextures(textures);
    }
    loadTextures(textures) {
        textures.forEach((texture) => {
            if (this._textures.has(texture.name)) {
                throw new Error(`Texture '${texture.name}' already exists!`);
            }
            if (texture.texture == null) {
                this._textures.set(texture.name, new TextureLoader().load(texture.pathname));
                return;
            }
            if (typeof texture.texture == "function") {
                this._textures.set(texture.name, texture.texture());
                return;
            }
            this._textures.set(texture.name, texture.texture);
        });
        return this;
    }
    static getTexture(name) {
        return ResourceManager.getInstance().getTexture(name);
    }
    getTexture(name) {
        return this._textures.get(name);
    }
    static forEachTexture(callback) {
        return ResourceManager.getInstance().forEachTexture(callback);
    }
    forEachTexture(callback) {
        this._textures.forEach(callback);
        return this;
    }
    static anyTexture(predicate) {
        return ResourceManager.getInstance().anyTexture(predicate);
    }
    anyTexture(predicate) {
        for (let textureKey of this._textures.keys()) {
            if (predicate(this._textures.get(textureKey))) {
                return true;
            }
        }
        return false;
    }
    static addMaterials(materials) {
        return ResourceManager.getInstance().addMaterials(materials);
    }
    addMaterials(materials) {
        materials.forEach((material) => {
            if (this._materials.has(material.getName())) {
                throw new Error(`Material '${material.getName()}' already exists!`);
            }
            this._materials.set(material.getName(), material);
        });
        return this;
    }
    static getMaterial(name) {
        return ResourceManager.getInstance().getMaterial(name);
    }
    getMaterial(name) {
        return this._materials.get(name);
    }
    static forEachMaterial(callback) {
        return ResourceManager.getInstance().forEachMaterial(callback);
    }
    forEachMaterial(callback) {
        this._materials.forEach(callback);
        return this;
    }
    static addSounds(sounds) {
        return ResourceManager.getInstance().addSounds(sounds);
    }
    addSounds(sounds) {
        sounds.forEach((sound) => {
            if (this._sounds.has(sound.name)) {
                throw new Error(`Material '${sound.name}' already exists!`);
            }
            this._sounds.set(sound.name, new Sound(sound.name, sound.pathname, sound.options));
        });
        return this;
    }
    static getSound(name) {
        return ResourceManager.getInstance().getSound(name);
    }
    getSound(name) {
        return this._sounds.get(name);
    }
    static forEachSound(callback) {
        return ResourceManager.getInstance().forEachSound(callback);
    }
    forEachSound(callback) {
        this._sounds.forEach(callback);
        return this;
    }
    static anySound(predicate) {
        return ResourceManager.getInstance().anySound(predicate);
    }
    anySound(predicate) {
        for (let soundKey of this._sounds.keys()) {
            if (predicate(this._sounds.get(soundKey))) {
                return true;
            }
        }
        return false;
    }
}
export default ResourceManager;
