import Updater from "./Updater";
export default interface IUpdatable {
    update: (time: number, delta: number, updater: Updater) => void;
    getName: () => string;
}
//# sourceMappingURL=IUpdatable.d.ts.map