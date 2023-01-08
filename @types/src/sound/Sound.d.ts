import Transform from "../math/Transform";
interface SoundOptions {
    loop?: boolean;
    autoplay?: boolean;
    volume?: number;
}
export interface SoundType {
    name: string;
    pathname: string;
    options?: SoundOptions;
}
declare class Sound {
    private name;
    private _audio;
    private _origin?;
    private _listener;
    private _loaded;
    constructor(name: string, pathname: string, options?: SoundOptions);
    setOrigin(origin: Transform): void;
    getOrigin(): Transform;
    setListener(listener: Transform): void;
    getListener(): Transform;
    play(loop?: boolean, force?: boolean): void;
    pause(): void;
    isLoaded(): boolean;
    getName(): string;
}
export default Sound;
//# sourceMappingURL=Sound.d.ts.map