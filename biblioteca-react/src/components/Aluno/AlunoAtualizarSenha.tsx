import { useState } from "react";
import AuthRequests from "../../fetch/AuthRequests";
import estilo from './AlunoAtualizarSenha.module.css';

/**
 * Propriedades para o componente AlunoAtualizarSenha.
 *
 * @interface AlunoAtualizarSenhaProps
 * @property {string} [classname] - Classe CSS opcional para estilização do componente.
 */
interface AlunoAtualizarSenhaProps {
    classname?: string;
}

/**
 * Componente React para atualizar a senha do aluno.
 *
 * @param {AlunoAtualizarSenhaProps} props - As propriedades do componente.
 * @param {string} props.classname - Classe CSS para estilização do componente.
 *
 * @returns {JSX.Element} O componente de atualização de senha.
 *
 * @component
 *
 * @example
 * <AlunoAtualizarSenha classname="minha-classe" />
 *
 * @remarks
 * Este componente permite que o aluno atualize sua senha. Ele possui três campos de entrada:
 * senha atual, nova senha e confirmação da nova senha. O componente valida se a nova senha
 * e a confirmação da nova senha coincidem antes de enviar a solicitação de atualização.
 *
 * @function
 * @name AlunoAtualizarSenha
 */
function AlunoAtualizarSenha({ classname }: AlunoAtualizarSenhaProps): JSX.Element {
    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");

    /**
     * Manipula a mudança de valor dos campos de entrada de senha.
     *
     * @param event - O evento de mudança do campo de entrada.
     * 
     * Este manipulador de eventos atualiza o estado correspondente ao campo de entrada de senha
     * com base no nome do campo de entrada (`senhaAtual`, `novaSenha` ou `confirmarNovaSenha`).
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case "senhaAtual":
                setSenhaAtual(event.target.value);
                break;
            case "novaSenha":
                setNovaSenha(event.target.value);
                break;
            case "confirmarNovaSenha":
                setConfirmarNovaSenha(event.target.value);
                break;
            default:
                break;
        }
    }

    /**
     * Manipula o envio do formulário de atualização de senha.
     * 
     * @param {React.FormEvent<HTMLFormElement>} event - O evento de envio do formulário.
     * @returns {Promise<void>} - Uma promessa que resolve quando a operação de atualização de senha é concluída.
     * 
     * @remarks
     * Esta função previne o comportamento padrão do formulário, verifica se a nova senha e a confirmação da nova senha coincidem,
     * e então tenta atualizar a senha do aluno chamando a função `AuthRequests.atualizarSenhaAluno`.
     * 
     * @throws {Error} - Lança um alerta se as senhas não coincidirem ou se houver um erro ao atualizar a senha.
     */
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (novaSenha !== confirmarNovaSenha) {
            alert("As senhas não coincidem.");
        } else {
            if(await AuthRequests.atualizarSenhaAluno(
                {
                    senhaAtual: senhaAtual,
                    novaSenha: novaSenha,
                    ra: localStorage.getItem("ra") as string
                }
            )) {
                alert("Senha atualizada com sucesso.");
            } else {
                alert("Erro ao atualizar a senha.");
            }
        }
    }

    return (
        <div className={`${classname} ${estilo.ctnPainelAtualizarSenha}`}>
            <h1>Atualizar Senha</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Senha Atual:
                    <input 
                        type="password" 
                        name="senhaAtual" 
                        onChange={handleChange}
                        placeholder="Digite sua senha atual"
                     />
                </label>
                <label>
                    Nova Senha:
                    <input 
                        type="password" 
                        name="novaSenha" 
                        onChange={handleChange} 
                        placeholder="Digite a nova senha"
                    />
                </label>
                <label>
                    Confirme a nova senha:
                    <input 
                        type="password" 
                        name="confirmarNovaSenha" 
                        onChange={handleChange} 
                        placeholder="Confirme a nova senha"
                    />
                </label>
                <input type="submit" value="Atualizar Senha"/>
            </form>
        </div>
    );
}

export default AlunoAtualizarSenha;