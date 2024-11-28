import Navegacao from "../../../components/Navegacao";
import CadastroLivro from "../../../components/Livro/CadastroLivro";
import Rodape from "../../../components/Rodape";
import estilo from "./PCadastroLivro.module.css";

/**
 * Componente de página para o cadastro de livros.
 * 
 * Este componente renderiza a estrutura principal da página de cadastro de livros,
 * incluindo a navegação, o formulário de cadastro e o rodapé.
 * 
 * @returns {JSX.Element} O elemento JSX que representa a página de cadastro de livros.
 */
function PCadastroLivro(): JSX.Element {
    return (
        <div className={estilo.ctnPCadastroLivro}>
            <Navegacao classname={estilo.navegacao}/>
            <CadastroLivro classname={estilo.cadastroLivro} />
            <Rodape className={estilo.rodape} />
        </div>
    );
}

export default PCadastroLivro;