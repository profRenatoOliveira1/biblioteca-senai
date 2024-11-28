import Navegacao from "../../../components/Navegacao";
import ListagemLivros from "../../../components/Livro/ListagemLivros";
import Rodape from "../../../components/Rodape";
import estilo from "./PListagemLivros.module.css";

function PListagemLivros() {
    return (
        <div className={estilo.ctnPListagemLivro}>
            <Navegacao classname={estilo.navegacao}/>
            <ListagemLivros classname={estilo.listagemLivros} />
            <Rodape className={estilo.rodape}/>
        </div>
    );
}

export default PListagemLivros;