import GameCore from './GameCore';
declare class Gallant {
    static CANVAS: HTMLCanvasElement;
    static FOCUSED: boolean;
    static IS_MOUSE_INSIDE: boolean;
    private _gameLoop;
    private _gameCore;
    private _started;
    constructor(gameCore: GameCore, canvas?: HTMLCanvasElement);
    start(): void;
    resize(): void;
    private configs;
    static isInsideCanvas(x: number, y: number): boolean;
    isStarted(): boolean;
    getGameCore(): GameCore;
}
export default Gallant;
//# sourceMappingURL=Gallant.d.ts.map