import { HashPwd } from "../utils/HashPwd";
import { SERVER_ROUTES } from "../appConfig";

/**
 * Classe responsável por gerenciar as requisições de autenticação.
 * 
 * Esta classe fornece métodos para login, atualização de senha, 
 * persistência e remoção de tokens, verificação de expiração de tokens 
 * e obtenção de foto de perfil.
 */
class AuthRequests {
    private serverUrl: string;
    private routeLogin: string;

    constructor() {
        this.serverUrl = import.meta.env.VITE_API_URL;
        this.routeLogin = SERVER_ROUTES.LOGIN;
    }

    /**
     * Realiza o login do usuário utilizando o email e senha fornecidos.
     *
     * @param email - O email do usuário.
     * @param senha - A senha do usuário.
     * @returns Um booleano indicando se o login foi bem-sucedido.
     *
     * O método envia uma requisição POST para o servidor com o email e a senha (hash) do usuário.
     * Se a resposta for bem-sucedida, o token de autenticação e as informações do usuário são persistidos.
     */
    async login(email: string, senha: string) {
        const url = this.serverUrl + this.routeLogin;
        const data = {
            email: email,
            senha: HashPwd.hash(senha)
        };

        console.log(JSON.stringify(data));

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const json = await response.json();
            this.persistToken({
                token: json.token,
                username: json.aluno.nome,
                email: json.aluno.email,
                ra: json.aluno.ra,
                profile: { filename: json.aluno.filename, mimetype: json.aluno.mimetype, data: json.aluno.data }
            });
        }

        return response.ok;
    }

    /**
     * Atualiza a senha de um aluno.
     *
     * @param aluno - Um objeto contendo as informações do aluno.
     * @param aluno.senhaAtual - A senha atual do aluno.
     * @param aluno.novaSenha - A nova senha que o aluno deseja definir.
     * @param aluno.ra - O RA (Registro Acadêmico) do aluno.
     * @returns Um booleano indicando se a atualização da senha foi bem-sucedida.
     */
    async atualizarSenhaAluno(aluno: {
        senhaAtual: string,
        novaSenha: string,
        ra: string
    }) {
        const url = this.serverUrl + SERVER_ROUTES.ATUALIZAR_SENHA_ALUNO;
        const data = {
            senhaAtual: HashPwd.hash(aluno.senhaAtual),
            novaSenha: HashPwd.hash(aluno.novaSenha),
            ra: aluno.ra
        };

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(data)
        });

        return response.ok;
    }

    /**
     * Persiste o token de autenticação e outras informações do usuário no localStorage.
     *
     * @param {Object} params - Objeto contendo as informações do usuário.
     * @param {string} params.token - Token de autenticação.
     * @param {string} params.username - Nome de usuário.
     * @param {string} params.email - Email do usuário.
     * @param {string} params.ra - Registro acadêmico do usuário.
     * @param {Object} [params.profile] - (Opcional) Objeto contendo informações do perfil do usuário.
     * @param {string} params.profile.filename - Nome do arquivo de perfil.
     * @param {string} params.profile.mimetype - Tipo MIME do arquivo de perfil.
     * @param {string} params.profile.data - Dados do arquivo de perfil codificados em base64.
     */
    persistToken({
        token,
        username,
        email,
        ra,
        profile
    }: {
        token: string;
        username: string;
        email: string;
        ra: string;
        profile?: { filename: string; mimetype: string; data: string };
    }) {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("ra", ra);
        if (profile) {
            const { filename, mimetype, data } = profile;
            localStorage.setItem("profile", JSON.stringify({ filename, mimetype, data })); // Armazene a foto como JSON
        }
        localStorage.setItem("isAuth", "true");
    }

    /**
     * Remove todos os itens relacionados à autenticação do localStorage.
     * 
     * Itens removidos:
     * - token
     * - username
     * - email
     * - ra
     * - isAuth
     * - profile
     */
    removeToken() {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("ra");
        localStorage.removeItem("isAuth");
        localStorage.removeItem("profile");
    }

    /**
     * Obtém a imagem de perfil do usuário armazenada no localStorage.
     *
     * @returns {any | null} A imagem de perfil do usuário como um objeto JSON, ou null se não houver imagem de perfil armazenada.
     */
    getProfilePicture() {
        const profile = localStorage.getItem("profile");
        if (profile) {
            return JSON.parse(profile);
        }
        return null;
    }

    /**
     * Verifica a expiração do token armazenado no localStorage.
     *
     * @returns {boolean} Retorna `true` se o token ainda for válido, caso contrário, remove o token e retorna `false`.
     */
    checkTokenExpiration(): boolean {
        const token = localStorage.getItem("token");
        if (token) {
            const jwt = JSON.parse(atob(token.split(".")[1]));
            const expiration = jwt.exp;
            const now = new Date().getTime() / 1000;
            if (now > expiration) {
                this.removeToken();
                return false;
            }
            return true;
        }
        return false;
    }
}

export default new AuthRequests();