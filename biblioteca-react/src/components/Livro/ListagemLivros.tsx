import { useEffect, useState } from "react";
import LivroRequests from "../../fetch/LivroRequests";
import Table from 'react-bootstrap/Table';
import estilo from "./ListagemLivros.module.css";
import { AiFillEdit } from "react-icons/ai";
import { HiTrash } from "react-icons/hi2";

interface ListagemLivrosProps {
    classname?: string;
}

function ListagemLivros({ classname }: ListagemLivrosProps) {
    const [livros, setLivros] = useState<any[]>([]);

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
                                    <AiFillEdit className={estilo.editIcon}/>
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