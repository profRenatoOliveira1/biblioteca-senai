import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

export class Livro {
    private idLivro: number = 0 ;
    private titulo: string;
    private autor: string;
    private editora: string;
    private anoPublicacao: string;
    private isbn: string;
    private quantTotal: number;
    private quantDisponivel: number;
    private valorAquisicao: number;
    private statusLivroEmprestado: string;

     /**
     * Construtor da classe Livro
     * 
     * @param titulo Título do Livro
     * @param autor Autor do Livro
     * @param editora Editora do Livro
     * @param anoPublicacao Ano de publicação do Livro
     * @param isbn ISBN do Livro
     * @param quantTotal Quantidade total de exemplares do Livro
     * @param quantDisponivel Quantidade disponível de exemplares do Livro
     * @param valorAquisicao Valor de aquisição do Livro
     * @param statusLivroEmprestado Status de empréstimo do Livro
     */
    public constructor (_titulo: string, _autor: string, _editora: string, _anoPublicacao: string, 
                               _isbn: string, _quantTotal: number,_quantDisponivel: number, _valorAquisicao: number, _statusLivroEmprestimo: string){
       
        this.titulo                = _titulo;
        this.autor                 = _autor;
        this.editora               = _editora;
        this.anoPublicacao         = _anoPublicacao;
        this.isbn                  = _isbn;
        this.quantTotal            = _quantTotal;
        this.quantDisponivel       = _quantDisponivel;
        this.valorAquisicao        = _valorAquisicao;
        this.statusLivroEmprestado = _statusLivroEmprestimo;
    }

    //métodos GETTERS and SETTERS
    /**
     * Retorna o id do livro
     * @returns id: idLivro
     */
    public getIdLivro(): number{
        return this.idLivro;
    }

    /**
     * Atribui o parâmetro ao atributo idAluno
     * 
     * @param _idLivro : idLivro
     */
    public setIdLivro(_idLivro: number): void{
        this.idLivro = _idLivro;
    }

     /**
     * Retorna o titulo do livro
     * @returns titulo: _titulo
     */
    public getTitulo(): string{
        return this.titulo;
    }

    /**
     * Atribui o parâmetro ao atributo titulo
     * 
     * @param _titulo : titulo
     */
    public setTitulo(_titulo: string): void{
        this.titulo = _titulo;
    }
    
     /**
     * Retorna o autor do livro
     * @returns autor: _autor
     */
     public getAutor(): string{
        return this.autor;
    }

    /**
     * Atribui o parâmetro ao atributo autor
     * 
     * @param _autor : autor
     */
    public setAutor(_autor: string): void{
        this.autor = _autor;
    }

     /**
     * Retorna a editora do livro
     * @returns editora: _editora
     */
     public getEditora(): string{
        return this.editora;
    }

    /**
     * Atribui o parâmetro ao atributo editora
     * 
     * @param _editora : editora
     */
    public setEditora(_editora: string): void{
        this.editora = _editora;
    }

     /**
     * Retorna o ano de publicação do livro
     * @returns anoPublicacao: _anoPublicacao
     */
     public getAnoPublicacao(): string{
        return this.anoPublicacao;
    }

    /**
     * Atribui o parâmetro ao ano de publicação titulo
     * 
     * @param _anoPublicacao : anoPublicacao
     */
    public setAnoPublicacao(_anoPublicacao: string): void{
        this.anoPublicacao = _anoPublicacao;
    }   

    /**
     * Retorna o ISBN do livro
     * @returns isbn: _isbn
     */
    public getISBN(): string{
        return this.isbn;
    }

    /**
     * Atribui o parâmetro ao atributo ISBN
     * 
     * @param _isbn : isbn
     */
    public setISBN(_isbn: string): void{
        this.isbn = _isbn;
    }

    /**
    * Retorna a quantidade total de livro
    * @returns quantidade total: quantTotal
    */
    public getQuantTotal(): number{
        return this.quantTotal;
    }

    /**
     * Atribui o parâmetro ao atributo quantidade total
     * 
     * @param _quantTotal : quantTotal
     */
    public setQuantTotal(_quantTotal: number): void{
        this.quantTotal = _quantTotal;
    }

    /**
    * Retorna a quantidade disponivel de livro
    * @returns quantidade disponivel: quantDisponivel
    */
    public getQuantDisponivel(): number{
        return this.quantDisponivel;
    }

    /**
     * Atribui o parâmetro ao atributo quantidade disponível
     * 
     * @param _quantDisponivel : quantDisponivel
     */
    public setQuantDisponivel(_quantDisponivel: number): void{
        this.quantDisponivel = _quantDisponivel;
    }

    /**
    * Retorna a quantidade total de livro
    * @returns quantidade total: quantTotal
    */
    public getValorAquisicao(): number{
        return this.valorAquisicao;
    }

    /**
     * Atribui o parâmetro ao atributo valor aquisição
     * 
     * @param _valorAquisicao : valorAquisicao
     */
    public setValorAquisicao(_valorAquisicao: number): void{
        this.valorAquisicao = _valorAquisicao;
    }

    /**
    * Retorna o status do livro
    * @returns status do livro : statusLivroEmprestado
    */
    public getStatusLivroEmprestado(): string{
        return this.statusLivroEmprestado;
    } 

    /**
     * Atribui o parâmetro ao atributo status livro emprestado
     * 
     * @param _statusLivroEmprestado : statusLivroEmprestado
     */
    public setStatusLivroEmprestado(_statusLivroEmprestado: string): void{
        this.statusLivroEmprestado = _statusLivroEmprestado;
    }

    // MÉTODO PARA ACESSAR O BANCO DE DADOS
    // CRUD Create - READ - Update - Delete

    /**
     * Retorna uma lista com todos os livros cadastrados no banco de dados
     * 
     * @returns Lista com todos os livros cadastrados no banco de dados
     */
    static async listarLivros(): Promise<Array<Livro> | null> {
        // Criando lista vazia para armazenar os livros
        let listaDeLivros: Array<Livro> = [];

        try {
            // Query para consulta no banco de dados
            const querySelectLivro = `SELECT * FROM Livro;`;

            // executa a query no banco de dados
            const respostaBD = await database.query(querySelectLivro);

            // percorre cada resultado retornado pelo banco de dados
            // livro é o apelido que demos para cada linha retornada do banco de dados
            respostaBD.rows.forEach((livro) => {
                // criando objeto livro
                let novoLivro = new Livro(
                    livro.titulo,
                    livro.autor,
                    livro.editora,
                    livro.ano_publicacao,
                    livro.isbn,
                    livro.quant_total,
                    livro.quant_disponivel,
                    livro.valor_aquisicao,
                    livro.status_livro_emprestado
                );
                // adicionando o ID ao objeto
                novoLivro.setIdLivro(livro.id_livro);
                                
                // adicionando um livro na lista
                listaDeLivros.push(novoLivro);
            });

            // retornado a lista de livros para quem chamou a função
            return listaDeLivros;
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return null;
        }
    }

    /**
     * Cadastra um novo livro no banco de dados
     * @param livro Objeto Livro contendo as informações a serem cadastradas
     * @returns Boolean indicando se o cadastro foi bem-sucedido
     */
    static async cadastrarLivro(livro: Livro): Promise<Boolean> {
        let insertResult = false;
        
        try {
            const queryInsertLivro = `
                INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado)
                VALUES (
                    '${livro.getTitulo().toUpperCase()}',
                    '${livro.getAutor().toUpperCase()}',
                    '${livro.getEditora().toUpperCase()}',
                    '${livro.getAnoPublicacao().toUpperCase()}',
                    '${livro.getISBN().toUpperCase()}',
                    '${livro.getQuantTotal()}',
                    '${livro.getQuantDisponivel()}',
                    '${livro.getValorAquisicao()}',
                    '${livro.getStatusLivroEmprestado().toUpperCase()}'
                )
                RETURNING id_livro;`;

            const result = await database.query(queryInsertLivro);

            if (result.rows.length > 0) {
                console.log(`Livro cadastrado com sucesso. ID: ${result.rows[0].id_livro}`);
                insertResult = true;
            }

            return insertResult;
        } catch (error) {
            console.error(`Erro ao cadastrar livro: ${error}`);
            return insertResult;
        }
    }

    /**
     * Remove um livro do banco de dados
     * @param idLivro ID do livro a ser removido
     * @returns Boolean indicando se a remoção foi bem-sucedida
    */
    static async removerLivro(id_livro: number): Promise<Boolean> {
        let queryResult = false;
    
        try {
            const queryDeleteEmprestimoLivro = `DELETE FROM emprestimo WHERE id_livro=${id_livro}`;
            await database.query(queryDeleteEmprestimoLivro);

            // Construção da query SQL para deletar o Livro.
            const queryDeleteLivro = `DELETE FROM Livro WHERE id_livro=${id_livro};`;
    
            // Executa a query de exclusão e verifica se a operação foi bem-sucedida.
            await database.query(queryDeleteLivro)
            .then((result) => {
                if (result.rowCount != 0) {
                    queryResult = true; // Se a operação foi bem-sucedida, define queryResult como true.
                }
            });
    
            return queryResult;

        } catch (error) {
            // Em caso de erro na consulta, exibe o erro no console e retorna false.
            console.log(`Erro na consulta: ${error}`);
            return queryResult;
        }
    }

    /**
     * Atualiza os dados de um livro no banco de dados.
     * @param livro Objeto do tipo Livro com os novos dados
     * @returns true caso sucesso, false caso erro
     */
    static async atualizarCadastroLivro(livro: Livro): Promise<Boolean> {
        let queryResult = false; // Variável para armazenar o resultado da operação.
        try {
            // Construção da query SQL para atualizar os dados do livro no banco de dados.
            const queryAtualizarLivro = `UPDATE Livro SET 
                                            titulo = '${livro.getTitulo().toUpperCase()}', 
                                            autor = '${livro.getAutor().toUpperCase()}',
                                            editora = '${livro.getEditora().toUpperCase()}', 
                                            ano_publicacao = '${livro.getAnoPublicacao().toUpperCase()}',
                                            isbn = '${livro.getISBN().toUpperCase()}', 
                                            quant_total = ${livro.getQuantTotal()},
                                            quant_disponivel = ${livro.getQuantDisponivel()},
                                            valor_aquisicao = ${livro.getValorAquisicao()},
                                            status_livro_emprestado = '${livro.getStatusLivroEmprestado().toUpperCase()}'                                           
                                        WHERE id_livro = ${livro.idLivro}`;

            // Executa a query de atualização e verifica se a operação foi bem-sucedida.
            await database.query(queryAtualizarLivro)
            .then((result) => {
                if (result.rowCount != 0) {
                    queryResult = true; // Se a operação foi bem-sucedida, define queryResult como true.
                }
            });

            // Retorna o resultado da operação para quem chamou a função.
            return queryResult;
        } catch (error) {
            // Em caso de erro na consulta, exibe o erro no console e retorna false.
            console.log(`Erro na consulta: ${error}`);
            return queryResult;
        }
    }
}
