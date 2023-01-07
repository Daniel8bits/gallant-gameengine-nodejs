import {Matrix4, Vector3, Vector4} from "@math.gl/core"

import IResource from './IResource';
import { gl } from "../gl/GLUtils";
import FileUtils from '../utils/FileUtils';

export interface ShaderType {
    name: string
    vertexShaderPathname: string
    fragmentShaderPathname: string
}

class Shader implements IResource{

    private _name: string;
    private _vertexShaderPathname: string;
    private _fragmentShaderPathname: string;
    private _program: WebGLProgram;

    private _textureCounter: number
    private _created: boolean

    public constructor(params: ShaderType) {
        this._name = params.name;
        this._vertexShaderPathname = params.vertexShaderPathname;
        this._fragmentShaderPathname = params.fragmentShaderPathname;
        this._textureCounter = 0;
        this._created = false
    }
    
    public create() : void {
        if(!this._created) {
            this._program = gl.createProgram();
            
            const vertexShader : WebGLShader = this.load(this._vertexShaderPathname, gl.VERTEX_SHADER);
            const fragmentShader : WebGLShader = this.load(this._fragmentShaderPathname, gl.FRAGMENT_SHADER);
            
            gl.attachShader(this._program, vertexShader);
            gl.attachShader(this._program, fragmentShader);
            
            gl.linkProgram(this._program);
            
            const error : string = gl.getProgramInfoLog(this._program).trim();
            if(error && error !== '') {
                throw new Error(`Error trying to link shader: ${this._name}.\n ${error}`);
            }
            this._created = true
        }
    }

    private load(pathname: string, type: number) : WebGLShader {
        const shader : WebGLShader = gl.createShader(type);

        FileUtils.load(
            pathname, 
            function onSuccess(file) {
                gl.shaderSource(shader, file);
            },
            function onError(err) {
                throw new Error(`Error trying to load shader: ${pathname}.\n ${err}`);
            },
        );

        gl.compileShader(shader);
        const error : string = gl.getShaderInfoLog(shader).trim();
        if(error && error !== '') {
            throw new Error(`Error trying to compile shader: ${pathname}.\n ${error}`);
        }

        return shader;
    }

    public bind() : void {
        gl.useProgram(this._program);
        this._textureCounter = 0
    }

    public unbind() : void {
        gl.useProgram(null);
    }

    public destroy() : void {
        gl.deleteShader(this._program)
        this._created = false
    }

    public getUniformLocation(name : string) : WebGLUniformLocation {
        return gl.getUniformLocation(this._program, name);
    }

    /**
     * Check if the given name matches an actual uniform in the shader,
     * if so sets the value, otherwise throw an error
     * @param name uniform name
     * @param setValue callback to set the value in case of success
     */
    private _checkIfUniformExists(name : string, 
        setValue: (location: WebGLUniformLocation) => void) : void {
        const location = gl.getUniformLocation(this._program, name);
        if(location === -1) {
            throw new Error(`Uniform '${name}' does not exist in shader: ${this._name}`);
        }
        setValue(location);
    }

    /**
     * Sets the value of a 32 bits integer uniform
     * @param name uniform name on shader
     * @param value value to set
     */
    public setInt(name : string, value : number) : void {
        this._checkIfUniformExists(name, (location) => gl.uniform1i(location, value));
    }

    /**
     * Sets the value of a 32 bits integer array uniform
     * @param name uniform name on shader
     * @param value value to set
     */
     public setIntArray(name : string, arrayValue: number[]) : void {
        this._checkIfUniformExists(name, 
            (location) => gl.uniform1iv(location, new Int32Array(arrayValue)));
    }

    /**
     * Sets the value of a 32 bits precision float uniform
     * @param name uniform name on shader
     * @param value value to set
     */
    public setFloat(name : string, value : number) : void {
        this._checkIfUniformExists(name, (location) => gl.uniform1f(location, value));
    }

    /**
     * Sets the value of a 32 bits precision float array uniform
     * @param name uniform name on shader
     * @param value value to set
     */
    public setFloatArray(name : string, arrayValue: number[]) : void {
        this._checkIfUniformExists(name, 
            (location) => gl.uniform1fv(location, new Float32Array(arrayValue)));
    }

    public setVector3(name: string, vector: Vector3) : void{
        this._checkIfUniformExists(name, 
            (location) => gl.uniform3fv(location, vector));
    }

    public setVector4(name: string, vector: Vector4) : void{
        this._checkIfUniformExists(name, 
            (location) => gl.uniform4fv(location, vector));
    }

    public setMatrix4x4(name: string, matrix: Matrix4): void {
        this._checkIfUniformExists(name, 
            (location) => gl.uniformMatrix4fv(location, false, matrix));
    }

    public setTexture(name : string) : void {
        this._checkIfUniformExists(name, 
            (location) => {
                gl.activeTexture(gl.TEXTURE0+this._textureCounter);
                gl.uniform1i(location, this._textureCounter)
                this._textureCounter++
            });
    }

    public getName(): string { 
        return this._name
    }
    
}

export default Shader;