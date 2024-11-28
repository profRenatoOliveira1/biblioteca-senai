import { SERVER_ROUTES } from "../appConfig";

class LivroRequests {
    private serverUrl: string = import.meta.env.VITE_API_URL || '';
    private routeNovoLivro: string = SERVER_ROUTES.NOVO_LIVRO;
    private routeListarLivros: string = SERVER_ROUTES.LISTAR_LIVROS;

    async cadastrarLivro(data: FormData): Promise<boolean> {
        const url = this.serverUrl + this.routeNovoLivro;

        console.log(url);

        const response = await fetch(url, {
            method: 'POST',
            body: data
        });

        return response.ok;
    }
}

export default new LivroRequests();