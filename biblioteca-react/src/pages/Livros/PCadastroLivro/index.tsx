import Navegacao from "../../../components/Navegacao";
import CadastroLivro from "../../../components/Livro/CadastroLivro";
import Rodape from "../../../components/Rodape";
import estilo from "./PCadastroLivro.module.css";

function PCadastroLivro() {
    return (
        <div className={estilo.ctnPCadastroLivro}>
            <Navegacao classname={estilo.navegacao}/>
            <CadastroLivro classname={estilo.cadastroLivro} />
            <Rodape className={estilo.rodape} />
        </div>
    );
}

export default PCadastroLivro;