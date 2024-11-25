import Navegacao from "../../components/Navegacao";
import CadastroAluno from "../../components/Aluno/CadastroAluno";
import Rodape from "../../components/Rodape";
import estilo from "./PCadastroAluno.module.css";

function PCadastroAluno() {
    return (
        <div className={estilo.ctnPCadastroAluno}>
            <Navegacao classname={estilo.navegacao} />
            <CadastroAluno classname={estilo.cadastroAluno} />
            <Rodape className={estilo.rodape} />
        </div>
    );
}

export default PCadastroAluno;