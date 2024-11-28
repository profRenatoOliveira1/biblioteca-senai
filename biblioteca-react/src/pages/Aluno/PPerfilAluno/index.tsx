import Navegacao from "../../../components/Navegacao";
import PerfilAluno from "../../../components/Aluno/PerfilAluno";
import Rodape from "../../../components/Rodape";
import estilo from "./PPerfilAluno.module.css";

/**
 * Componente funcional que representa a página de perfil do aluno.
 * 
 * Este componente renderiza a estrutura principal da página de perfil do aluno,
 * incluindo a navegação, o perfil do aluno e o rodapé.
 * 
 * @returns {JSX.Element} O elemento JSX que representa a página de perfil do aluno.
 */
function PPerfilAluno(): JSX.Element {
    return (
        <div className={estilo.ctnPPerfilAluno}>
            <Navegacao classname={estilo.navegacao} />
            <PerfilAluno classname={estilo.perfilAluno} />
            <Rodape className={estilo.rodape} />
        </div>
    );
}

export default PPerfilAluno;