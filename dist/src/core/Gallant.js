import GLUtils, { gl } from '../gl/GLUtils';
import GameLoop from './GameLoop';
import InputManager from './InputManager';
class Gallant {
    static CANVAS;
    static FOCUSED;
    static IS_MOUSE_INSIDE;
    _gameLoop;
    _gameCore;
    _started;
    static _clearColor;
    constructor(gameCore, canvas) {
        Gallant.CANVAS = GLUtils.init(canvas);
        Object.defineProperty(this, "CANVAS", {
            writable: false
        });
        Gallant.setClearColor(0, 0, 0, 1);
        this._gameLoop = new GameLoop(gameCore);
        this._started = false;
        this._gameCore = gameCore;
        Gallant.FOCUSED = Boolean(!!canvas);
        Gallant.IS_MOUSE_INSIDE = Boolean(!!canvas);
    }
    start() {
        if (!Gallant.IS_MOUSE_INSIDE) {
            this.configs();
        }
        this.resize();
        InputManager.init();
        gl.clearColor(Gallant._clearColor.x, Gallant._clearColor.y, Gallant._clearColor.z, Gallant._clearColor.w);
        this._gameLoop.start();
        this._started = true;
    }
    resize() {
        if (Gallant.CANVAS === undefined) {
            throw new Error('Canvas was not initialized!');
        }
        Gallant.CANVAS.width = Gallant.CANVAS.offsetWidth;
        Gallant.CANVAS.height = Gallant.CANVAS.offsetHeight;
        gl.viewport(0, 0, Gallant.CANVAS.width, Gallant.CANVAS.height);
    }
    configs() {
        Gallant.CANVAS.addEventListener('click', (e) => {
            if (!Gallant.IS_MOUSE_INSIDE) {
                Gallant.FOCUSED = Gallant.isInsideCanvas(e.clientX, e.clientY);
                Gallant.CANVAS.requestPointerLock();
            }
        });
        document.addEventListener('pointerlockchange', event => {
            Gallant.IS_MOUSE_INSIDE = !Gallant.IS_MOUSE_INSIDE;
        });
        Gallant.CANVAS.addEventListener('mousemove', (e) => {
        });
        Gallant.CANVAS.addEventListener('mouseleave', (e) => {
            Gallant.IS_MOUSE_INSIDE = false;
        });
    }
    static isInsideCanvas(x, y) {
        return (x > Gallant.CANVAS.offsetLeft &&
            x < Gallant.CANVAS.offsetLeft + Gallant.CANVAS.offsetWidth &&
            y > Gallant.CANVAS.offsetTop &&
            y < Gallant.CANVAS.offsetTop + Gallant.CANVAS.offsetHeight);
    }
    isStarted() {
        return this._started;
    }
    getGameCore() {
        return this._gameCore;
    }
    static setClearColor(r, g, b, a) {
        const clamp = (v) => Math.min(Math.max(v, 0), 1);
        Gallant._clearColor.x = clamp(r);
        Gallant._clearColor.y = clamp(g);
        Gallant._clearColor.z = clamp(b);
        Gallant._clearColor.w = clamp(a);
    }
    static getClearColor() {
        return {
            r: Gallant._clearColor.x,
            g: Gallant._clearColor.y,
            b: Gallant._clearColor.z,
            a: Gallant._clearColor.w
        };
    }
    static glSetClearColor() {
        gl.clearColor(Gallant._clearColor.x, Gallant._clearColor.y, Gallant._clearColor.z, Gallant._clearColor.w);
    }
}
export default Gallant;
