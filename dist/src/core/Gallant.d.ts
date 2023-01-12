import GameCore from './GameCore';
declare class Gallant {
    static CANVAS: HTMLCanvasElement;
    static FOCUSED: boolean;
    static IS_MOUSE_INSIDE: boolean;
    private _gameLoop;
    private _gameCore;
    private _started;
    private static _clearColor;
    constructor(gameCore: GameCore, canvas?: HTMLCanvasElement);
    start(): void;
    resize(): void;
    private configs;
    static isInsideCanvas(x: number, y: number): boolean;
    isStarted(): boolean;
    getGameCore(): GameCore;
    static setClearColor(r: number, g: number, b: number, a: number): void;
    static getClearColor(): {
        r: number;
        g: number;
        b: number;
        a: number;
    };
    static glSetClearColor(): void;
}
export default Gallant;
//# sourceMappingURL=Gallant.d.ts.map