class FileUtils {
    static load(pathname, onSuccess, onError) {
        const xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open('GET', pathname, false);
        xmlHttpRequest.onload = () => onSuccess(xmlHttpRequest.responseText);
        xmlHttpRequest.onerror = () => onError(xmlHttpRequest.statusText);
        xmlHttpRequest.send(null);
    }
    static async loadAsync(pathname) {
        let reader;
        await fetch(pathname)
            .then(res => res.body)
            .then(async (body) => {
            reader = body.getReader();
        });
        return reader.read()
            .then((stream) => new TextDecoder().decode(stream.value));
    }
}
export default FileUtils;
