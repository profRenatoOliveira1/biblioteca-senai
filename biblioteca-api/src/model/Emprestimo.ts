import { Aluno } from "./Aluno";
import { Livro } from "./Livro";
import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

export class Emprestimo{

    private idEmprestimo: number = 0;
    private idAluno: number;
    private idLivro: number;
    private dataEmprestimo: Date;
    private dataDevolucao: Date;
    private statusEmprestimo: string;

     /**
     * Construtor da classe Emprestimos
     * 
     * @param idAluno Identificador do aluno que fez o empréstimo
     * @param idLivro Identificador do livro emprestado
     * @param dataEmprestimo Data em que o empréstimo foi realizado
     * @param dataDevolucao Data prevista para devolução do livro
     * @param statusEmprestimo Status do empréstimo (ex.: "ativo", "devolvido")
     */
    public constructor (_idAluno:number, _idLivro:number, _dataEmprestimo:Date, 
                        _dataDevolucao:Date, _statusEmprestimo:string) {
        
        this.idAluno          = _idAluno;
        this.idLivro          = _idLivro;
        this.dataEmprestimo   = _dataEmprestimo;
        this.dataDevolucao    = _dataDevolucao;
        this.statusEmprestimo = _statusEmprestimo;
    }

    // métodos GETTERS and SETTERS
    /**
     * Retorna o id do empréstimo
     * @returns id: id empréstimo
     */
    public getIdEmprestimo(): number {
        return this.idEmprestimo;
    }

    /**
     * Atribui o parâmetro ao atributo idEmprestimo
     * 
     * @param _idEmprestimo : idEmprestimo
     */
    public setIdEmprestimo(_idEmprestimo: number): void {
        this.idEmprestimo = _idEmprestimo;
    }

    /**
     * Retorna o id do aluno
     * @returns id: id aluno
     */
    public getIdAluno(): number {
        return this.idAluno;
    }

    /**
     * Atribui o parâmetro ao atributo idAluno
     * 
     * @param _idAluno : idAluno
     */
    public setIdAluno(_idAluno: number): void {
        this.idAluno = _idAluno;
    }

    /**
     * Retorna o id do livro
     * @returns id: id livro
     */
    public getIdLivro(): number {
        return this.idLivro;
    }

    /**
     * Atribui o parâmetro ao atributo idLivro
     * 
     * @param _idLivro : idLivro
     */
    public setIdLivro(_idLivro: number): void {
        this.idLivro = _idLivro;
    }

    /**
     * Retorna a data do empréstimo
     * @returns dataEmprestimo: data do empréstimo
     */
    public getDataEmprestimo(): Date {
        return this.dataEmprestimo;
    }

    /**
     * Atribui o parâmetro ao atributo dataEmprestimo
     * 
     * @param _dataEmprestimo : data do empréstimo
     */
    public setDataEmprestimo(_dataEmprestimo: Date): void {
        this.dataEmprestimo = _dataEmprestimo;
    }

    /**
     * Retorna a data de devolução
     * @returns dataDevolucao: data de devolução
     */
    public getDataDevolucao(): Date {
        return this.dataDevolucao;
    }

    /**
     * Atribui o parâmetro ao atributo dataDevolucao
     * 
     * @param _dataDevolucao : data de devolução
     */
    public setDataDevolucao(_dataDevolucao: Date): void {
        this.dataDevolucao = _dataDevolucao;
    }

    /**
     * Retorna o status do empréstimo
     * @returns statusEmprestimo: status do empréstimo
     */
    public getStatusEmprestimo(): string {
        return this.statusEmprestimo;
    }

    /**
     * Atribui o parâmetro ao atributo statusEmprestimo
     * 
     * @param _statusEmprestimo : status do empréstimo
     */
    public setStatusEmprestimo(_statusEmprestimo: string): void {
        this.statusEmprestimo = _statusEmprestimo;
    }

    // MÉTODO PARA ACESSAR O BANCO DE DADOS
    // CRUD Create - READ - Update - Delete

    /**
     * Retorna uma lista com todos os Emprestimos cadastrados no banco de dados
     * 
     * @returns Lista com todos os Emprestimos cadastrados no banco de dados
     */
    static async listarEmprestimos(): Promise<Array<any> | null> {
        // Criando lista vazia para armazenar os emprestimos
        let listaDeEmprestimos: Array<any> = [];
    
        try {
            // Query para consulta no banco de dados
            const querySelectEmprestimo = `
                SELECT e.id_emprestimo, e.id_aluno, e.id_livro,
                       e.data_emprestimo, e.data_devolucao, e.status_emprestimo,
                       a.ra, a.nome, a.sobrenome, a.celular, 
                       l.titulo, l.autor, l.editora
                FROM Emprestimo e
                JOIN Aluno a ON e.id_aluno = a.id_aluno
                JOIN Livro l ON e.id_livro = l.id_livro;
            `;
    
            // Executa a query no banco de dados
            const respostaBD = await database.query(querySelectEmprestimo);
    
            // Verifica se há resultados
            if (respostaBD.rows.length === 0) {
                return null;
            }
    
            // Itera sobre as linhas retornadas
            respostaBD.rows.forEach((linha: any) => {
                // Monta o objeto de empréstimo com os dados do aluno e do livro
                const emprestimo = {
                    idEmprestimo: linha.id_emprestimo,
                    idAluno: linha.id_aluno,
                    idLivro: linha.id_livro,
                    dataEmprestimo: linha.data_emprestimo,
                    dataDevolucao: linha.data_devolucao,
                    statusEmprestimo: linha.status_emprestimo,
                    aluno: {
                        ra: linha.ra,
                        nome: linha.nome,
                        sobrenome: linha.sobrenome,
                        celular: linha.celular
                    },
                    livro: {
                        titulo: linha.titulo,
                        autor: linha.autor,
                        editora: linha.editora
                    }
                };
    
                // Adiciona o objeto à lista de empréstimos
                listaDeEmprestimos.push(emprestimo);
            });
    
            return listaDeEmprestimos;
    
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return null;
        }
    } 

    /**
     * Cadastra um novo empréstimo no banco de dados
     * 
     * @param idAluno : number
     * @param idLivro : number
     * @param dataEmprestimo : Date
     * @param dataDevolucao : Date
     * @param statusEmprestimo : string
     * @returns Promise com o resultado da inserção ou erro
     */
    static async cadastrarEmprestimo(
        idAluno: number,
        idLivro: number,
        dataEmprestimo: Date,
        dataDevolucao: Date,
        statusEmprestimo: string
    ): Promise<any> {
        try {
            const queryInsertEmprestimo = `
                INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo)
                VALUES ($1, $2, $3, $4, $5) RETURNING id_emprestimo;
            `;

            const valores = [idAluno, idLivro, dataEmprestimo, dataDevolucao, statusEmprestimo];
            const resultado = await database.query(queryInsertEmprestimo, valores);

            if(resultado.rowCount != 0) {
                console.log(`Empréstimo cadastrado com sucesso! ID: ${resultado.rows[0].id_emprestimo}`);
                return resultado.rows[0].id_emprestimo;
            }

            return false; // Retorna o ID do novo empréstimo
        } catch (error) {
            console.error(`Erro ao cadastrar empréstimo: ${error}`);
            throw new Error('Erro ao cadastrar o empréstimo.');
        }
    }    

     /**
     * Atualiza os dados de um empréstimo existente no banco de dados
     * 
     * @param idEmprestimo : number
     * @param idAluno : number'
     * @param idLivro : number
     * @param dataEmprestimo : Date
     * @param dataDevolucao : Date
     * @param statusEmprestimo : string
     * @returns Promise com o resultado da atualização ou erro
     */
     static async atualizarEmprestimo(
        idEmprestimo: number,
        idAluno: number,
        idLivro: number,
        dataEmprestimo: Date,
        dataDevolucao: Date,
        statusEmprestimo: string
    ): Promise<any> {
        try {
            const queryUpdateEmprestimo = `UPDATE Emprestimo
            SET id_aluno = $1, id_livro = $2, data_emprestimo = $3, data_devolucao = $4, status_emprestimo = $5
            WHERE id_emprestimo = $6
            RETURNING id_emprestimo;`;

            const valores = [idAluno, idLivro, dataEmprestimo, dataDevolucao, statusEmprestimo, idEmprestimo];
            const resultado = await database.query(queryUpdateEmprestimo, valores);

            if (resultado.rowCount === 0) {
                throw new Error('Empréstimo não encontrado.');
            }

            return resultado.rows[0].id_emprestimo; // Retorna o ID do empréstimo atualizado
        } catch (error) {
            console.error(`Erro ao atualizar empréstimo: ${error}`);
            throw new Error('Erro ao atualizar o empréstimo.');
        }
    }
}

