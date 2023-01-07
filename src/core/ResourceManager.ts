import Shader, { ShaderType } from '../appearance/Shader'
import VAO, { VAOType } from '../buffer/VAO'
import VBO from '../buffer/VBO'
import OBJLoader from '../loader/OBJLoader'
import Texture, { TextureType } from '../appearance/Texture'
import Material from '../appearance/material/Material'
import TextureLoader from '../loader/TextureLoader'
import Sound, { SoundType } from '@razor/sound/Sound'

class ResourceManager {

    private static _instance: ResourceManager

    private _shaders: Map<string, Shader>
    private _vaos: Map<string, VAO>
    private _textures: Map<string, Texture>
    private _materials: Map<string, Material>
    private _sounds: Map<string, Sound>

    private constructor() {
        this._shaders = new Map<string, Shader>();
        this._vaos = new Map<string, VAO>();
        this._textures = new Map<string, Texture>();
        this._materials = new Map<string, Material>();
        this._sounds = new Map<string, Sound>();
    }

    private static getInstance() {
        if (!ResourceManager._instance) {
            ResourceManager._instance = new ResourceManager();
        }
        return ResourceManager._instance
    }

    /* =====================
              VAO'S
    ======================*/

    public static loadVAO(vaos: VAOType[]): ResourceManager {
        return ResourceManager.getInstance().loadVAO(vaos);
    }

    public loadVAO(vaos: VAOType[]): ResourceManager {
        vaos.forEach((vao) => {
            if (this._vaos.has(vao.name)) {
                throw new Error(`Shader '${vao.name}' already exists!`)
            }

            if (typeof vao.objectData === 'string') {
                // todo: mesh loader 
                this._vaos.set(vao.name, new OBJLoader().load(vao.objectData as string));
                return;
            }
            if (typeof vao.objectData === 'function') {
                this._vaos.set(vao.name, vao.objectData());
                return;
            }
            this._vaos.set(vao.name, new VAO(vao.objectData as VBO[]));
        });
        return this;
    }

    public static getVAO(name: string): VAO {
        return ResourceManager.getInstance().getVAO(name);
    }

    public getVAO(name: string): VAO {
        return this._vaos.get(name);
    }

    public static forEachVAO(callback: (vao: VAO) => void): ResourceManager {
        return ResourceManager.getInstance().forEachVAO(callback);
    }

    public forEachVAO(callback: (vao: VAO) => void): ResourceManager {
        this._vaos.forEach(callback);
        return this;
    }

    /* =====================
            SHADERS
    ======================*/

    public static loadShader(shaders: ShaderType[]): ResourceManager {
        return ResourceManager.getInstance().loadShader(shaders);
    }

    public loadShader(shaders: ShaderType[]): ResourceManager {
        shaders.forEach((shader) => {
            if (this._shaders.has(shader.name)) {
                throw new Error(`Shader '${shader.name}' already exists!`)
            }
            this._shaders.set(shader.name, new Shader(shader))
        })
        return this
    }

    public static getShader(name: string): Shader {
        return ResourceManager.getInstance().getShader(name);
    }

    public getShader(name: string): Shader {
        return this._shaders.get(name);
    }

    public static forEachShader(callback: (shader: Shader) => void): ResourceManager {
        return ResourceManager.getInstance().forEachShader(callback);
    }

    public forEachShader(callback: (shader: Shader) => void): ResourceManager {
        this._shaders.forEach(callback);
        return this
    }

    /* =====================
            TEXTURES
    ======================*/

    public static loadTextures(textures: TextureType[]): ResourceManager {
        return ResourceManager.getInstance().loadTextures(textures);
    }

    public loadTextures(textures: TextureType[]): ResourceManager {
        textures.forEach((texture) => {
            if (this._textures.has(texture.name)) {
                throw new Error(`Texture '${texture.name}' already exists!`)
            }
            if (texture.texture == null) {
                this._textures.set(texture.name, new TextureLoader().load(texture.pathname))
                return;
            }
            if (typeof texture.texture == "function") {
                this._textures.set(texture.name, texture.texture());
                return
            }
            this._textures.set(texture.name, texture.texture);
        })
        return this
    }

    public static getTexture(name: string): Texture {
        return ResourceManager.getInstance().getTexture(name);
    }

    public getTexture(name: string): Texture {
        return this._textures.get(name);
    }

    public static forEachTexture(callback: (texture: Texture) => void): ResourceManager {
        return ResourceManager.getInstance().forEachTexture(callback);
    }

    public forEachTexture(callback: (texture: Texture) => void): ResourceManager {
        this._textures.forEach(callback);
        return this
    }

    public static anyTexture(predicate: (texture: Texture) => boolean): boolean {
        return ResourceManager.getInstance().anyTexture(predicate);
    }

    public anyTexture(predicate: (texture: Texture) => boolean): boolean {
        for(let textureKey of this._textures.keys()) {
            if(predicate(this._textures.get(textureKey))) {
                return true;
            }
        }
        return false
    }

    /* =====================
            MATERIALS
    ======================*/

    public static addMaterials(materials: Material[]): ResourceManager {
        return ResourceManager.getInstance().addMaterials(materials);
    }

    public addMaterials(materials: Material[]): ResourceManager {
        materials.forEach((material) => {
            if (this._materials.has(material.getName())) {
                throw new Error(`Material '${material.getName()}' already exists!`)
            }
            this._materials.set(material.getName(), material)
        })
        return this
    }

    public static getMaterial(name: string): Material {
        return ResourceManager.getInstance().getMaterial(name);
    }

    public getMaterial(name: string): Material {
        return this._materials.get(name);
    }

    public static forEachMaterial(callback: (material: Material) => void): ResourceManager {
        return ResourceManager.getInstance().forEachMaterial(callback);
    }

    public forEachMaterial(callback: (material: Material) => void): ResourceManager {
        this._materials.forEach(callback);
        return this
    }

    /* =====================
            SOUNDS
    ======================*/

    public static addSounds(sounds: SoundType[]): ResourceManager {
        return ResourceManager.getInstance().addSounds(sounds);
    }

    public addSounds(sounds: SoundType[]): ResourceManager {
        sounds.forEach((sound) => {
            if (this._sounds.has(sound.name)) {
                throw new Error(`Material '${sound.name}' already exists!`)
            }
            this._sounds.set(sound.name, new Sound(sound.name, sound.pathname, sound.options))
        })
        return this
    }

    public static getSound(name: string): Sound {
        return ResourceManager.getInstance().getSound(name);
    }

    public getSound(name: string): Sound {
        return this._sounds.get(name);
    }

    public static forEachSound(callback: (sound: Sound) => void): ResourceManager {
        return ResourceManager.getInstance().forEachSound(callback);
    }

    public forEachSound(callback: (sound: Sound) => void): ResourceManager {
        this._sounds.forEach(callback);
        return this
    }

    public static anySound(predicate: (sound: Sound) => boolean): boolean {
        return ResourceManager.getInstance().anySound(predicate);
    }

    public anySound(predicate: (sound: Sound) => boolean): boolean {
        for(let soundKey of this._sounds.keys()) {
            if(predicate(this._sounds.get(soundKey))) {
                return true;
            }
        }
        return false
    }


}

export default ResourceManager