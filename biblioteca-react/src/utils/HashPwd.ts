import CryptoJS from 'crypto-js';

/**
 * Classe responsável por realizar o hash de senhas.
 */
export class HashPwd {
    
    /**
     * Gera um hash SHA-256 a partir de uma string de senha.
     *
     * @param pwd - A senha a ser hasheada.
     * @returns O hash da senha em formato hexadecimal.
     */
    static hash(pwd: string): string {
        return CryptoJS.SHA256(pwd).toString(CryptoJS.enc.Hex);
    }
}