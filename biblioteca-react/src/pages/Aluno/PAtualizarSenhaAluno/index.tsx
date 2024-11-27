import Navegacao from "../../../components/Navegacao";
import AlunoAtualizarSenha from "../../../components/Aluno/AlunoAtualizarSenha";
import Rodape from "../../../components/Rodape";
import estilo from "./PAtualizarSenhaAluno.module.css";

function PAtualizarSenhaAluno() {
    return (
        <div className={estilo.ctnPAtualizarSenha}>
            <Navegacao classname={estilo.navegacao} />
            <AlunoAtualizarSenha classname={estilo.cadastroAluno} />
            <Rodape className={estilo.rodape} />
        </div>
    );
}

export default PAtualizarSenhaAluno;