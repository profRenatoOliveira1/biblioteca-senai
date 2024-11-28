import { SERVER_ROUTES } from "../appConfig";

class AlunoRequests {
    private serverUrl: string;
    private routeNovoAluno: string;
    private routeAtualizarAluno: string;
    private routeRemoverAluno: string;
    private routeListarAlunos: string;

    /**
     * Construtor da classe AlunoRequests.
     * 
     * Inicializa as URLs do servidor e as rotas para as operações de aluno.
     * 
     * @remarks
     * As URLs do servidor são obtidas a partir das variáveis de ambiente.
     * As rotas são definidas com base nas constantes de rotas do servidor.
     */
    constructor() {
        this.serverUrl = import.meta.env.VITE_API_URL;
        this.routeNovoAluno = SERVER_ROUTES.NOVO_ALUNO;
        this.routeAtualizarAluno = SERVER_ROUTES.ATUALIZAR_ALUNO;
        this.routeRemoverAluno = SERVER_ROUTES.REMOVER_ALUNO;
        this.routeListarAlunos = SERVER_ROUTES.LISTAR_ALUNOS;
    }

    /**
     * Cadastra um novo aluno enviando os dados fornecidos para o servidor.
     *
     * @param {FormData} data - Os dados do aluno a serem cadastrados.
     * @returns {Promise<boolean>} - Uma promessa que resolve para `true` se o cadastro for bem-sucedido, ou `false` caso contrário.
     */
    async cadastrarAluno(data: FormData): Promise<boolean> {
        const url = this.serverUrl + this.routeNovoAluno;

        // ESPERAR UM TEMPO ANTES DE REMOVER O COMENTÁRIO ABAIXO
        // console.log(url, {
        //     method: 'POST',
        //     mode: 'no-cors',
        //     body: data
        // });

        const response = await fetch(url, {
            method: 'POST',
            body: data
        });

        return response.ok;
    }

    /**
     * Lista todos os alunos.
     *
     * @returns {Promise<JSON | []>} Uma promessa que resolve para um JSON contendo os alunos ou um array vazio se a requisição falhar.
     *
     * @throws {Error} Se ocorrer um erro durante a requisição.
     */
    async listarAlunos(): Promise<JSON | []> {
        const url = this.serverUrl + this.routeListarAlunos;

        const response = await fetch(url, {
            method: 'GET'
        });

        if (response.ok) {
            const jsonAlunos = await response.json();
            return jsonAlunos;
        }

        return [];
    }

    async listarAlunoRA(): Promise<JSON | []> {
        const ra = localStorage.getItem('ra');
        if (!ra) {
            throw new Error('RA is null');
        }
        const url = this.serverUrl + SERVER_ROUTES.LISTAR_ALUNO_RA.replace(':ra', ra);

        const response = await fetch(url, {
            method: 'GET'
        });

        if (response.ok) {
            const jsonAluno = await response.json();
            return jsonAluno;
        }

        return [];
    }

    /**
     * Atualiza as informações de um aluno no servidor.
     *
     * @param data - Os dados do aluno a serem atualizados, encapsulados em um objeto FormData.
     * @returns Uma Promise que resolve para um booleano indicando se a atualização foi bem-sucedida.
     */
    async atualizarAluno(data: FormData): Promise<boolean> {
        const url = this.serverUrl + this.routeAtualizarAluno + '/' + data.ra;

        const response = await fetch(url, {
            method: 'PUT',
            body: data
        });

        return response.ok;
    }

    /**
     * Remove um aluno do sistema com base no RA (Registro Acadêmico) fornecido.
     *
     * @param ra - O RA do aluno que será removido.
     * @returns Uma Promise que resolve para um booleano indicando se a remoção foi bem-sucedida.
     */
    async removerAluno(ra: string): Promise<boolean> {
        const url = this.serverUrl + this.routeRemoverAluno + '/' + ra;

        const response = await fetch(url, {
            method: 'DELETE'
        });

        return response.ok;
    }
}

export default new AlunoRequests();