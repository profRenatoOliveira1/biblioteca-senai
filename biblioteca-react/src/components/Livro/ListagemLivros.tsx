import { useEffect, useState } from "react";
import LivroRequests from "../../fetch/LivroRequests";
import Table from 'react-bootstrap/Table';
import estilo from "./ListagemLivros.module.css";
import { AiFillEdit } from "react-icons/ai";
import { HiTrash } from "react-icons/hi2";

/**
 * Propriedades para o componente ListagemLivros.
 *
 * @interface ListagemLivrosProps
 * @property {string} [classname] - Classe CSS opcional para estilização do componente.
 */
interface ListagemLivrosProps {
    classname?: string;
}

/**
 * Componente que exibe uma lista de livros em uma tabela.
 *
 * @param {ListagemLivrosProps} props - As propriedades do componente.
 * @param {string} props.classname - Classe CSS para estilização do componente.
 *
 * @returns {JSX.Element} Um elemento JSX que representa a lista de livros.
 *
 * @component
 *
 * @example
 * <ListagemLivros classname="minha-classe" />
 *
 * @remarks
 * Este componente utiliza o hook `useEffect` para buscar a lista de livros
 * quando o componente é montado. A lista de livros é obtida através da função
 * `LivroRequests.listarLivros`. Em caso de erro na busca, uma mensagem de erro
 * é exibida no console.
 *
 * A tabela exibe várias informações sobre cada livro, incluindo título, autor,
 * editora, ano de publicação, ISBN, quantidade total, quantidade disponível,
 * valor de aquisição e status de empréstimo. Também há ícones para editar e
 * excluir cada livro.
 */
function ListagemLivros({ classname }: ListagemLivrosProps): JSX.Element {
    const [livros, setLivros] = useState<any[]>([]);

    /**
     * useEffect que busca a lista de livros ao montar o componente.
     * 
     * Este efeito colateral é executado apenas uma vez, quando o componente é montado.
     * Ele faz uma requisição assíncrona para obter a lista de livros e atualiza o estado `livros` com os dados recebidos.
     * Em caso de erro na requisição, o erro é capturado e exibido no console.
     */
    useEffect(() => {
        const fetchLivros = async () => {
            try {
                const data = await LivroRequests.listarLivros();
                setLivros(data);
            } catch (error) {
                console.error("Failed to fetch livros:", error);
            }
        };
        fetchLivros();
    }, []);

    return (
        <div className={`${classname} ${estilo.ctnTabela}`}>
            <h1>Lista de Livros</h1>
            {livros.length > 0 ? (
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th hidden>ID</th>
                            <th>Título</th>
                            <th>Autor</th>
                            <th>Editora</th>
                            <th>Ano Publicação</th>
                            <th>ISBN</th>
                            <th>Qtde Total</th>
                            <th>Qtde Disponível</th>
                            <th>Valor Aquisição</th>
                            <th>Status Empréstimo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {livros.map((livro, index) => (
                            <tr key={index}>
                                <td hidden>{livro.idLivro}</td>
                                <td>{livro.titulo}</td>
                                <td>{livro.autor}</td>
                                <td>{livro.editora}</td>
                                <td>{livro.anoPublicacao}</td>
                                <td>{livro.isbn}</td>
                                <td>{livro.quantTotal}</td>
                                <td>{livro.quantDisponivel}</td>
                                <td>R$ {livro.valorAquisicao.replace('.', ',')}</td>
                                <td>{livro.statusLivroEmprestado}</td>
                                <td className={estilo.colAcoes}>
                                    <AiFillEdit className={estilo.editIcon} />
                                    <HiTrash className={estilo.trashIcon} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>Nenhum livro encontrado.</p>
            )}
        </div>
    );
}

export default ListagemLivros;