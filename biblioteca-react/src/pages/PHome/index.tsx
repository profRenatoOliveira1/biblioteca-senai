import Navegacao from "../../components/Navegacao";
import Home from "../../components/Home";
import Rodape from "../../components/Rodape";
import estilo from "./PHome.module.css";

/**
 * Componente funcional que representa a página inicial (PHome).
 * 
 * Este componente renderiza a estrutura principal da página inicial,
 * incluindo a navegação, o conteúdo principal da home e o rodapé.
 * 
 * @returns {JSX.Element} Estrutura JSX da página inicial.
 */
function PHome(): JSX.Element {
    return (
        <div className={estilo.ctnPHome}>
            <Navegacao classname={estilo.navegacao}/>
            <Home className={estilo.home} />
            <Rodape className={estilo.rodape} />
        </div>
    );
}

export default PHome;