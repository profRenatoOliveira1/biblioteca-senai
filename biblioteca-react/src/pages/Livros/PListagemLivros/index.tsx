import Navegacao from "../../../components/Navegacao";
import ListagemLivros from "../../../components/Livro/ListagemLivros";
import Rodape from "../../../components/Rodape";
import estilo from "./PListagemLivros.module.css";

/**
 * Componente de listagem de livros.
 * 
 * Este componente renderiza a estrutura principal da página de listagem de livros,
 * incluindo a navegação, a listagem de livros e o rodapé.
 * 
 * @returns {JSX.Element} O elemento JSX que representa a página de listagem de livros.
 */
function PListagemLivros(): JSX.Element {
    return (
        <div className={estilo.ctnPListagemLivro}>
            <Navegacao classname={estilo.navegacao}/>
            <ListagemLivros classname={estilo.listagemLivros} />
            <Rodape className={estilo.rodape}/>
        </div>
    );
}

export default PListagemLivros;