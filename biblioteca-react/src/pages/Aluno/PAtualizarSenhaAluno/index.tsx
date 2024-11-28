import Navegacao from "../../../components/Navegacao";
import AlunoAtualizarSenha from "../../../components/Aluno/AlunoAtualizarSenha";
import Rodape from "../../../components/Rodape";
import estilo from "./PAtualizarSenhaAluno.module.css";

/**
 * Componente de página para atualização de senha do aluno.
 * 
 * Este componente renderiza a estrutura da página de atualização de senha do aluno,
 * incluindo a navegação, o formulário de atualização de senha e o rodapé.
 * 
 * @returns {JSX.Element} Estrutura da página de atualização de senha do aluno.
 */
function PAtualizarSenhaAluno(): JSX.Element {
    return (
        <div className={estilo.ctnPAtualizarSenha}>
            <Navegacao classname={estilo.navegacao} />
            <AlunoAtualizarSenha classname={estilo.cadastroAluno} />
            <Rodape className={estilo.rodape} />
        </div>
    );
}

export default PAtualizarSenhaAluno;