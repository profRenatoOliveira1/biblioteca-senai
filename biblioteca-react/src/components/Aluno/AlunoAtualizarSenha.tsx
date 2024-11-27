import { useState } from "react";
import AuthRequests from "../../fetch/AuthRequests";
import estilo from './AlunoAtualizarSenha.module.css';

interface AlunoAtualizarSenhaProps {
    classname?: string;
}

function AlunoAtualizarSenha({ classname }: AlunoAtualizarSenhaProps) {
    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");

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