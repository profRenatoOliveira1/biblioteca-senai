import { HashPwd } from "../components/utils/HashPwd";
import { SERVER_ROUTES } from "../appConfig";

class AuthRequests {
    private serverUrl: string;
    private routeLogin: string;

    constructor() {
        this.serverUrl = import.meta.env.VITE_API_URL;
        this.routeLogin = SERVER_ROUTES.LOGIN;
    }

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
            console.log(json);
            this.persistToken({token: json.token, 
                username: json.aluno.nome, 
                email: json.aluno.email, 
                ra: json.aluno.ra,
                profile: { filename: json.aluno.filename, mimetype: json.aluno.mimetype, data: json.aluno.data }});
        }

        return response.ok;
    }

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
    

    removeToken() {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("ra");
        localStorage.removeItem("isAuth");
        localStorage.removeItem("profile");
    }

    getProfilePicture() {
        const profile = localStorage.getItem("profile");
        if (profile) {
            return JSON.parse(profile);
        }
        return null;
    }

    checkTokenExpiration() {
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