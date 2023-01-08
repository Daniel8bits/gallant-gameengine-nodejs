import SceneManager from './scenes/SceneManager';
import Scene from './scenes/Scene';
import Updater from './updater/Updater';
declare abstract class GameCore {
    private _updater;
    private _sceneManager;
    protected constructor();
    abstract start(): void;
    update(time: number, delta: number): void;
    render(delta: number): void;
    setScene(scene: string | Scene): SceneManager;
    getSceneManager(): SceneManager;
    getUpdater(): Updater;
}
export default GameCore;
//# sourceMappingURL=GameCore.d.ts.map