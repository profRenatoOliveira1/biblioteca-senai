import Navegacao from "../../../components/Navegacao";
import PerfilAluno from "../../../components/Aluno/PerfilAluno";
import Rodape from "../../../components/Rodape";
import estilo from "./PPerfilAluno.module.css";

function PPerfilAluno() {
    return (
        <div className={estilo.ctnPPerfilAluno}>
            <Navegacao classname={estilo.navegacao} />
            <PerfilAluno classname={estilo.perfilAluno} />
            <Rodape className={estilo.rodape} />
        </div>
    );
}

export default PPerfilAluno;