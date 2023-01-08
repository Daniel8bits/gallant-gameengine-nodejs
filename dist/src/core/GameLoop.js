import { gl } from "../gl/GLUtils";
import InputManager from "./InputManager";
class GameLoop {
    _gameCore;
    _then;
    _frameBuffer;
    constructor(gameCore) {
        this._gameCore = gameCore;
        this._then = 0;
    }
    loop = (time) => {
        time *= 0.001;
        const delta = time - this._then;
        this._then = time;
        const fps = 1 / delta;
        document.querySelector("#fps span").textContent = fps.toFixed(1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        InputManager.update();
        this._gameCore.update(time, delta);
        this._gameCore.render(delta);
        requestAnimationFrame(this.loop);
    };
    start() {
        this._gameCore.start();
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.CULL_FACE);
        gl.depthFunc(gl.LESS);
        this.loop(0);
    }
}
export default GameLoop;
