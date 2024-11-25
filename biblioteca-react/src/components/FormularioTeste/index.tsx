import { useState } from 'react';

function FormularioTeste() {
    const [formData, setFormData] = useState<{
        nome: string;
        sobrenome: string;
        data_nascimento: string;
        endereco: string;
        email: string;
        celular: string;
        foto: File | null;
    }>({
        nome: 'Teste',
        sobrenome: 'de formulário',
        data_nascimento: new Date('2000-01-01').toISOString().split('T')[0],
        endereco: 'Rua do teste, 123',
        email: 'teste@mail.com',
        celular: '99012349876',
        foto: null // Inicialmente `null`
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
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFormData({
                ...formData,
                foto: event.target.files[0] // Salva o arquivo como um objeto File
            });
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
        const response = await fetch('http://localhost:3333/novo/aluno', {
            method: 'POST',
            body: payload
        });

        const result = await response.json();
        console.log('Resposta da API:', result);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nome:
                <input 
                    type="text" 
                    name="nome" 
                    value={formData.nome}
                    onChange={handleChange} />
            </label>
            <label>
                Sobrenome:
                <input 
                    type="text" 
                    name="sobrenome" 
                    value={formData.sobrenome}
                    onChange={handleChange} />
            </label>
            <label>
                Data de Nascimento:
                <input 
                    type="date" 
                    name="data_nascimento" 
                    value={formData.data_nascimento}
                    onChange={handleChange} />
            </label>
            <label>
                Endereço:
                <input 
                    type="text" 
                    name="endereco" 
                    value={formData.endereco}
                    onChange={handleChange} />
            </label>
            <label>
                Email:
                <input 
                    type="text" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange} />
            </label>
            <label>
                Celular:
                <input 
                    type="number" 
                    name="celular" 
                    value={formData.celular}
                    onChange={handleChange} />
            </label>
            <label>
                Foto:
                <input 
                    type="file" 
                    accept="image/*" // Aceita qualquer imagem
                    onChange={handleFileChange} />
            </label>
            <button type="submit">Enviar</button>
        </form>
    );
}

export default FormularioTeste;
