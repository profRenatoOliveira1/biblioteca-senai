import { SERVER_ROUTES } from "../appConfig";

/**
 * Classe responsável por realizar requisições relacionadas a livros.
 * 
 * @remarks
 * Esta classe utiliza as rotas definidas em `SERVER_ROUTES` para cadastrar e listar livros.
 * 
 */
class LivroRequests {
    private serverUrl: string = import.meta.env.VITE_API_URL || '';
    private routeNovoLivro: string = SERVER_ROUTES.NOVO_LIVRO;
    private routeListarLivros: string = SERVER_ROUTES.LISTAR_LIVROS;

    /**
     * Cadastra um novo livro enviando os dados fornecidos para o servidor.
     *
     * @param {FormData} data - Os dados do livro a serem cadastrados.
     * @returns {Promise<boolean>} - Uma promessa que resolve para `true` se o cadastro for bem-sucedido, ou `false` caso contrário.
     */
    async cadastrarLivro(data: FormData): Promise<boolean> {
        const url = this.serverUrl + this.routeNovoLivro;

        console.log(url);

        const response = await fetch(url, {
            method: 'POST',
            body: data
        });

        return response.ok;
    }

    /**
     * Fetches a list of books from the server.
     *
     * @returns {Promise<any>} A promise that resolves to the list of books if the request is successful,
     *                         or an empty array if the request fails.
     */
    async listarLivros(): Promise<any> {
        const url = this.serverUrl + this.routeListarLivros;

        const response = await fetch(url);

        if (response.ok) {
            return response.json();
        } else {
            return [];
        }
    }
}

export default new LivroRequests();