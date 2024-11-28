import Navegacao from "../../components/Navegacao";
import Login from "../../components/Login";
import Rodape from "../../components/Rodape";
import estilo from "./PLogin.module.css";

/**
 * Componente de página de login.
 * 
 * Este componente renderiza a página de login, incluindo a navegação, 
 * o formulário de login e o rodapé.
 * 
 * @component
 * @returns {JSX.Element} O componente de página de login.
 */
function PLogin(): JSX.Element {
    return (
        <div className={estilo.ctnPLogin}>
            <Navegacao classname={estilo.navegacao} />
            <Login className={estilo.login} />
            <Rodape className={estilo.rodape} />
        </div>
    );
}

export default PLogin;