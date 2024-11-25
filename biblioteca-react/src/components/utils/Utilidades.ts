class Utilidades {
    isBase64(str: string): boolean {
        try {
            return btoa(atob(str)) === str;
        } catch (err) {
            return false;
        }
    }
}

export default new Utilidades();