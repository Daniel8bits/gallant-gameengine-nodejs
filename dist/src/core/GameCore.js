import SceneManager from './scenes/SceneManager';
import Updater from './updater/Updater';
class GameCore {
    _updater;
    _sceneManager;
    constructor() {
        this._sceneManager = new SceneManager();
        this._updater = new Updater();
        this._updater.add(this._sceneManager);
    }
    update(time, delta) {
        this._updater.update(time, delta);
    }
    render(delta) {
        this._sceneManager.render(delta);
    }
    setScene(scene) {
        const sceneManager = this._sceneManager.setActive(scene);
        return sceneManager;
    }
    getSceneManager() {
        return this._sceneManager;
    }
    getUpdater() {
        return this._updater;
    }
}
export default GameCore;
