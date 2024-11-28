/**
 * Verifica se uma string está codificada em Base64.
 *
 * @param str - A string a ser verificada.
 * @returns Retorna `true` se a string estiver codificada em Base64, caso contrário, retorna `false`.
 */
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