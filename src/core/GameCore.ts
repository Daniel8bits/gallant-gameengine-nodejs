import SceneManager from './scenes/SceneManager'
import RenderStrategy from '../renderer/RenderStrategy'
import Scene from './scenes/Scene';
import Updater from './updater/Updater';

abstract class GameCore {

    private _updater: Updater
    private _sceneManager: SceneManager;
    
    protected constructor() {
        this._sceneManager = new SceneManager();
        this._updater = new Updater()
        this._updater.add(this._sceneManager)
    }

    public abstract start(): void;

    public update(time: number, delta: number): void {
        this._updater.update(time, delta);
    }

    public render(delta: number): void {
        this._sceneManager.render(delta);
    }

    public setScene(scene : string | Scene) : SceneManager{
        const sceneManager = this._sceneManager.setActive(scene);
        return sceneManager;
    }

    public getSceneManager(): SceneManager {
        return this._sceneManager;
    }

    public getUpdater(): Updater {
        return this._updater;
    }

}

export default GameCore;