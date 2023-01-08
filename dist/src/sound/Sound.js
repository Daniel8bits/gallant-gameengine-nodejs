class Sound {
    name;
    _audio;
    _origin;
    _listener;
    _loaded;
    constructor(name, pathname, options) {
        this.name = name;
        this._loaded = false;
        this._audio = new Audio(pathname);
        this._audio.onload = () => { this._loaded = true; };
        this._audio.loop = options?.loop ?? false;
        this._audio.autoplay = options?.autoplay ?? false;
        this._audio.volume = (options?.volume ?? 100) / 100;
        this._audio.pause();
    }
    setOrigin(origin) {
        this._origin = origin;
    }
    getOrigin() {
        return this._origin;
    }
    setListener(listener) {
        this._listener = listener;
    }
    getListener() {
        return this._listener;
    }
    play(loop = false, force = false) {
        if (!force && !this._audio.paused)
            return;
        if (force) {
            this.pause();
        }
        this._audio.loop = loop;
        this._audio.play()
            .then(() => {
            const clear = setInterval(() => {
                if (this._audio.paused) {
                    this._audio.currentTime = 0;
                    clearInterval(clear);
                }
                if (this._origin && this._listener) {
                    const vectorDistance = this._origin.getTranslation().subtract(this._listener.getTranslation());
                    const distanceLength = Math.sqrt(Math.pow(vectorDistance[0], 2) + Math.pow(vectorDistance[1], 2) + Math.pow(vectorDistance[2], 2));
                    this._audio.volume = 1.0 / (1.0 + 0.022 * distanceLength + 0.0019 * (distanceLength * distanceLength));
                }
            }, 1000);
        });
    }
    pause() {
        this._audio.pause();
        this._audio.currentTime = 0;
    }
    isLoaded() {
        return this._loaded;
    }
    getName() {
        return this.name;
    }
}
export default Sound;
