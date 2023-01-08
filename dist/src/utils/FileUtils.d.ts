declare class FileUtils {
    static load(pathname: string, onSuccess: (file: any) => void, onError: (err: string) => void): void;
    static loadAsync(pathname: string): Promise<string>;
}
export default FileUtils;
//# sourceMappingURL=FileUtils.d.ts.map