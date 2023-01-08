import GameCore from "./GameCore";
declare class GameLoop {
    private _gameCore;
    private _then;
    private _frameBuffer;
    constructor(gameCore: GameCore);
    private loop;
    start(): void;
}
export default GameLoop;
//# sourceMappingURL=GameLoop.d.ts.map