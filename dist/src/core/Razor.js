import GLUtils, { gl } from '../gl/GLUtils';
import GameLoop from './GameLoop';
import InputManager from './InputManager';
class Razor {
    static CANVAS;
    static FOCUSED;
    static IS_MOUSE_INSIDE;
    _gameLoop;
    _gameCore;
    _started;
    constructor(gameCore, canvas) {
        Razor.CANVAS = GLUtils.init(canvas);
        Object.defineProperty(this, "CANVAS", {
            writable: false
        });
        gl.clearColor(0, 0, 0, 1);
        this._gameLoop = new GameLoop(gameCore);
        this._started = false;
        this._gameCore = gameCore;
        Razor.FOCUSED = Boolean(!!canvas);
        Razor.IS_MOUSE_INSIDE = Boolean(!!canvas);
    }
    start() {
        if (!Razor.IS_MOUSE_INSIDE) {
            this.configs();
        }
        this.resize();
        InputManager.init();
        this._gameLoop.start();
        this._started = true;
    }
    resize() {
        if (Razor.CANVAS === undefined) {
            throw new Error('Canvas was not initialized!');
        }
        Razor.CANVAS.width = Razor.CANVAS.offsetWidth;
        Razor.CANVAS.height = Razor.CANVAS.offsetHeight;
        gl.viewport(0, 0, Razor.CANVAS.width, Razor.CANVAS.height);
    }
    configs() {
        Razor.CANVAS.addEventListener('click', (e) => {
            if (!Razor.IS_MOUSE_INSIDE) {
                Razor.FOCUSED = Razor.isInsideCanvas(e.clientX, e.clientY);
                Razor.CANVAS.requestPointerLock();
            }
        });
        document.addEventListener('pointerlockchange', event => {
            Razor.IS_MOUSE_INSIDE = !Razor.IS_MOUSE_INSIDE;
        });
        Razor.CANVAS.addEventListener('mousemove', (e) => {
        });
        Razor.CANVAS.addEventListener('mouseleave', (e) => {
            Razor.IS_MOUSE_INSIDE = false;
        });
    }
    static isInsideCanvas(x, y) {
        return (x > Razor.CANVAS.offsetLeft &&
            x < Razor.CANVAS.offsetLeft + Razor.CANVAS.offsetWidth &&
            y > Razor.CANVAS.offsetTop &&
            y < Razor.CANVAS.offsetTop + Razor.CANVAS.offsetHeight);
    }
    isStarted() {
        return this._started;
    }
    getGameCore() {
        return this._gameCore;
    }
}
export default Razor;
