import { useState } from "react";
import InputMask from 'react-input-mask';
import LivroRequests from "../../fetch/LivroRequests";
import imagemPadrao from "../../assets/book-default.png";
import estilo from "./CadastroLivro.module.css";

interface CadastroLivroProps {
    classname?: string;
}

function CadastroLivro({ classname }: CadastroLivroProps) {
    const [formData, setFormData] = useState<{
        titulo: string;
        autor: string;
        editora: string;
        anoPublicacao: string;
        isbn: string;
        quantTotal: number;
        quantDisponivel: number;
        valorAquisicao: number;
        statusLivro: string;
        imagemCapa: File | null;
    }>({
        titulo: '',
        autor: '',
        editora: '',
        anoPublicacao: '',
        isbn: '',
        quantTotal: 1,
        quantDisponivel: 1,
        valorAquisicao: 0,
        statusLivro: 'Disponível',
        imagemCapa: null
    });
    const statusLivroLista = ['Disponível', 'Emprestado', 'Indisponível'];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            setFormData({ ...formData, imagemCapa: file });
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload = new FormData();
        payload.append('titulo', formData.titulo);
        payload.append('autor', formData.autor);
        payload.append('editora', formData.editora);
        payload.append('anoPublicacao', formData.anoPublicacao);
        payload.append('isbn', formData.isbn);
        payload.append('quantTotal', formData.quantTotal.toString());
        payload.append('quantDisponivel', formData.quantDisponivel.toString());
        payload.append('valorAquisicao', formData.valorAquisicao.toString().replace(',', '.'));
        payload.append('statusLivro', formData.statusLivro);
        if (formData.imagemCapa) {
            payload.append('imagemCapa', formData.imagemCapa);
        }

        try {
            const response = await LivroRequests.cadastrarLivro(payload);
            response ? alert('Livro cadastrado com sucesso!') : alert('Erro ao cadastrar livro');
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert('Erro ao cadastrar livro');
        }
    }

    return (
        <div className={classname}>
            <form onSubmit={handleSubmit} className={estilo.formCadastroLivro}>
                <h1>Cadastro Livro</h1>
                <div className={estilo.ctnFormulario}>
                    <label htmlFor="fotoUpload">
                        <img
                            src={formData.imagemCapa ? URL.createObjectURL(formData.imagemCapa) : imagemPadrao}
                            alt="Foto do Aluno"
                            className={estilo.imagemCapa}
                        />
                        <input
                            id="fotoUpload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                    </label>
                    <div className={estilo.inputFields}>
                        <div className={estilo.doubleInput}>
                            <div className={estilo.painelEsquerdo}>
                                <label>
                                    Título <br />
                                    <input
                                        type="text"
                                        name="titulo"
                                        placeholder="Insira o título"
                                        value={formData.titulo}
                                        onChange={handleChange}
                                        minLength={7}
                                    />
                                </label>
                                <label>
                                    Autor <br />
                                    <input
                                        type="text"
                                        name="autor"
                                        placeholder="Insira o autor"
                                        value={formData.autor}
                                        onChange={handleChange}
                                        minLength={10}
                                    />
                                </label>
                                <label>
                                    Editora <br />
                                    <input
                                        type="text"
                                        name="editora"
                                        placeholder="Insira a editora"
                                        value={formData.editora}
                                        onChange={handleChange}
                                        minLength={7}
                                    />
                                </label>
                                <label>
                                    Ano de Publicação <br />
                                    <input
                                        type="number"
                                        name="anoPublicacao"
                                        placeholder="Insira o ano de publicação"
                                        value={formData.anoPublicacao}
                                        onChange={handleChange}
                                        min="1900"
                                        max={new Date().getFullYear()}
                                    />
                                </label>
                                <label>
                                    ISBN <br />
                                    <InputMask
                                        mask={["9999999999", "999-9999999999"]}
                                        type="text"
                                        name="isbn"
                                        placeholder="Insira o ISBN"
                                        value={formData.isbn}
                                        onChange={handleChange}
                                        minLength={10}
                                        maxLength={13}
                                    />
                                </label>
                            </div>
                            <div className={estilo.painelDireito}>
                                <label>
                                    Quantidade Total <br />
                                    <input
                                        type="number"
                                        name="quantTotal"
                                        placeholder="Insira a quantidade total"
                                        value={formData.quantTotal}
                                        onChange={handleChange}
                                        min={1}
                                    />
                                </label>
                                <label>
                                    Quantidade Disponível <br />
                                    <input
                                        type="number"
                                        name="quantDisponivel"
                                        placeholder="Insira a quantidade disponível"
                                        value={formData.quantDisponivel}
                                        onChange={handleChange}
                                        min={1}
                                    />
                                </label>
                                <label>
                                    Valor de Aquisição <br />
                                    <input
                                        type="number"
                                        name="valorAquisicao"
                                        placeholder="Insira o valor de aquisição"
                                        value={formData.valorAquisicao}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    Status Livro <br />
                                    <select
                                        name="statusLivro"
                                        value={formData.statusLivro}
                                        onChange={handleChange}
                                    >
                                        {statusLivroLista.map((status, index) => (
                                            <option key={index} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                        </div>
                        <input type="submit" value="Enviar" className={estilo.btnEnviar} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CadastroLivro;