import GLUtils, { gl } from '@gl/GLUtils';
import { Vector4 } from '@math.gl/core';
import GameCore from './GameCore';
import GameLoop from './GameLoop';
import InputManager from './InputManager';

/**
 * Canvas management class
 */
class Gallant {

    public static CANVAS: HTMLCanvasElement;
    public static FOCUSED: boolean
    public static IS_MOUSE_INSIDE: boolean

    private _gameLoop: GameLoop;
    private _gameCore: GameCore;
    private _started: boolean
    private static _clearColor: Vector4

    public constructor(gameCore: GameCore, canvas?: HTMLCanvasElement) {
        Gallant.CANVAS = GLUtils.init(canvas);
        Object.defineProperty(this, "CANVAS", {
            writable: false
        })
        Gallant.setClearColor(0, 0, 0, 1);
        this._gameLoop = new GameLoop(gameCore);  
        this._started = false
        this._gameCore = gameCore;
        Gallant.FOCUSED = Boolean(!!canvas)
        Gallant.IS_MOUSE_INSIDE = Boolean(!!canvas)
    }

    public start() : void {
        if(!Gallant.IS_MOUSE_INSIDE) {
            this.configs()
        }
        this.resize();
        InputManager.init()
        gl.clearColor(Gallant._clearColor.x, Gallant._clearColor.y, Gallant._clearColor.z, Gallant._clearColor.w)
        this._gameLoop.start();
        this._started = true
    }

    public resize() : void {
        if(Gallant.CANVAS === undefined) {
            throw new Error('Canvas was not initialized!');
        }

        Gallant.CANVAS.width = Gallant.CANVAS.offsetWidth
        Gallant.CANVAS.height = Gallant.CANVAS.offsetHeight
        gl.viewport(0, 0, Gallant.CANVAS.width, Gallant.CANVAS.height);
        
    }

    private configs() {
        Gallant.CANVAS.addEventListener('click', (e) => {
            if(!Gallant.IS_MOUSE_INSIDE){

                Gallant.FOCUSED = Gallant.isInsideCanvas(e.clientX, e.clientY)
                Gallant.CANVAS.requestPointerLock();// (Responsável por remover o mouse)
            }
            //Razor.IS_MOUSE_INSIDE = true;
        })
        document.addEventListener('pointerlockchange', event => { 
            Gallant.IS_MOUSE_INSIDE = !Gallant.IS_MOUSE_INSIDE;
        });

        Gallant.CANVAS.addEventListener('mousemove', (e) => {
         //   Razor.IS_MOUSE_INSIDE = Razor.isInsideCanvas(e.clientX, e.clientY)
        })
        Gallant.CANVAS.addEventListener('mouseleave', (e) => {
            Gallant.IS_MOUSE_INSIDE = false;
        })
    }

    public static isInsideCanvas(x: number, y: number) {
        return (
            x > Gallant.CANVAS.offsetLeft &&
            x < Gallant.CANVAS.offsetLeft+Gallant.CANVAS.offsetWidth &&
            y > Gallant.CANVAS.offsetTop &&
            y < Gallant.CANVAS.offsetTop+Gallant.CANVAS.offsetHeight
        )
    }

    public isStarted(): boolean {
        return this._started
    }

    public getGameCore(): GameCore {
        return this._gameCore
    }

    public static setClearColor(r: number, g: number, b: number, a: number) {
        const clamp = (v: number) => Math.min(Math.max(v, 0), 1)
        Gallant._clearColor.x = clamp(r)
        Gallant._clearColor.y = clamp(g)
        Gallant._clearColor.z = clamp(b)
        Gallant._clearColor.w = clamp(a)
    }

    public static getClearColor() {
        return {
            r: Gallant._clearColor.x, 
            g: Gallant._clearColor.y, 
            b: Gallant._clearColor.z, 
            a: Gallant._clearColor.w
        }
    }

    public static glSetClearColor() {
        gl.clearColor(Gallant._clearColor.x, Gallant._clearColor.y, Gallant._clearColor.z, Gallant._clearColor.w);
    }
}

export default Gallant;