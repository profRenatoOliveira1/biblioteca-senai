import CryptoJS from 'crypto-js';

export class HashPwd {
    
    static hash(pwd: string): string {
        return CryptoJS.SHA256(pwd).toString(CryptoJS.enc.Hex);
    }
}