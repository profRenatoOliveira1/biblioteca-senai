import Navegacao from "../../../components/Navegacao";
import CadastroAluno from "../../../components/Aluno/CadastroAluno";
import Rodape from "../../../components/Rodape";
import estilo from "./PCadastroAluno.module.css";

/**
 * Componente de página para o cadastro de alunos.
 * 
 * Este componente renderiza a estrutura principal da página de cadastro de alunos,
 * incluindo a navegação, o formulário de cadastro e o rodapé.
 * 
 * @returns {JSX.Element} O elemento JSX que representa a página de cadastro de alunos.
 */
function PCadastroAluno(): JSX.Element {
    return (
        <div className={estilo.ctnPCadastroAluno}>
            <Navegacao classname={estilo.navegacao}/>
            <CadastroAluno classname={estilo.cadastroAluno} />
            <Rodape className={estilo.rodape}/>
        </div>
    );
}

export default PCadastroAluno;