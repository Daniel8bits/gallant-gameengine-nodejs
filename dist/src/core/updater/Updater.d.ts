import IUpdatable from "./IUpdatable";
declare class Updater {
    private _updatables;
    private _enabled;
    private _disabled;
    constructor();
    update(time: number, delta: number): void;
    add(updatable: IUpdatable, visible?: boolean): Updater;
    remove(updatable: IUpdatable | string): Updater;
    enable(updatable: IUpdatable | string): Updater | never;
    disable(updatable: IUpdatable | string): Updater | never;
    get(name: string): IUpdatable;
    getKeys(): string[];
    getKeysFromEnabled(): string[];
    getKeysFromDisabled(): string[];
    private _keys;
    forEach(fn: (updatable: IUpdatable, key?: string) => void): Updater;
    forEachEnabled(fn: (updatable: IUpdatable, key?: string) => void): Updater;
    forEachDisabled(fn: (updatable: IUpdatable, key?: string) => void): Updater;
    private _forEach;
    has(updatable: IUpdatable | string): boolean;
    hasInEnabled(updatable: IUpdatable | string): boolean;
    hasInDisabled(updatable: IUpdatable | string): boolean;
    private _has;
    filterEnabled(predicate: (updatable: IUpdatable) => boolean): IUpdatable[];
    private _validate;
    private _getName;
    get entities(): Map<string, IUpdatable>;
}
export default Updater;
//# sourceMappingURL=Updater.d.ts.map