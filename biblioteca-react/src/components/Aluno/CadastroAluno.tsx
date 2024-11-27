import { useState } from 'react';
import AlunoRequests from '../../fetch/AlunoRequests';
import estilo from './CadastroAluno.module.css';
import imagemPadrao from '../../assets/user-profile-nobg.png';

interface CadastroAlunoProps {
    classname?: string;
}

function CadastroAluno({ classname }: CadastroAlunoProps) {
    const [formData, setFormData] = useState<{
        nome: string;
        sobrenome: string;
        data_nascimento: string;
        endereco: string;
        email: string;
        celular: string;
        foto: File | null;
    }>({
        nome: '',
        sobrenome: '',
        data_nascimento: '',
        endereco: '',
        email: '',
        celular: '',
        foto: null
    });

    // Função para atualizar campos de texto
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Função para lidar com o arquivo enviado
    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.files && event.target.files[0]) {
    //         setFormData({
    //             ...formData,
    //             foto: event.target.files[0] // Salva o arquivo como um objeto File
    //         });
    //     }
    // };

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            setFormData({ ...formData, foto: file });
        }
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Criar um objeto FormData para envio de arquivos
        const payload = new FormData();
        payload.append('nome', formData.nome);
        payload.append('sobrenome', formData.sobrenome);
        payload.append('data_nascimento', formData.data_nascimento);
        payload.append('endereco', formData.endereco);
        payload.append('email', formData.email);
        payload.append('celular', formData.celular);
        if (formData.foto) {
            payload.append('foto', formData.foto); // Adiciona o arquivo ao FormData
        }

        // Substituir pelo endpoint real da sua API
        const response = await AlunoRequests.cadastrarAluno(payload);

        // verifica se a resposta foi bem sucedida
        response ? alert('Aluno cadastrado com sucesso!') : alert('Erro ao cadastrar aluno!');
    };

    return (
        <div className={classname}>
            <form onSubmit={handleSubmit} className={estilo.formCadastroAluno}>
                <h1>Cadastro Aluno</h1>
                <div className={estilo.inputFoto}>
                    <label htmlFor="fotoUpload">
                        <img
                            src={formData.foto ? URL.createObjectURL(formData.foto) : imagemPadrao}
                            alt="Foto do Aluno"
                            className={estilo.fotoPerfil}
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
                            <div className={estilo.inputGroup}>
                                <label>
                                    Nome <br />
                                    <input
                                        type="text"
                                        name="nome"
                                        placeholder="Insira o nome"
                                        value={formData.nome}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                            <div className={estilo.inputGroup}>
                                <label>
                                    Sobrenome <br />
                                    <input
                                        type="text"
                                        name="sobrenome"
                                        placeholder="Insira o sobrenome"
                                        value={formData.sobrenome}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className={estilo.doubleInput}>
                            <div className={estilo.inputGroup}>
                                <label>
                                    Data de Nascimento <br />
                                    <input
                                        type="date"
                                        name="data_nascimento"
                                        value={formData.data_nascimento}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                            <div className={estilo.inputGroup}>
                                <label>
                                    Celular <br />
                                    <input
                                        type="number"
                                        name="celular"
                                        placeholder='Informe o número de celular (apenas os números)'
                                        value={formData.celular}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className={estilo.doubleInput}>
                            <div className={estilo.inputGroup}>
                                <label>
                                    Endereço
                                    <input
                                        type="text"
                                        name="endereco"
                                        placeholder='Informe o endereço'
                                        value={formData.endereco}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                            <div className={estilo.inputGroup}>
                                <label>
                                    Email
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder='Informe o endereço de e-mail'
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                        </div>

                        <button type="submit" className={estilo.btnEnviar}>Enviar</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CadastroAluno;