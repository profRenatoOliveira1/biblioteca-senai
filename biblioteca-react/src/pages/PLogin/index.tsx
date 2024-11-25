import Navegacao from "../../components/Navegacao";
import Login from "../../components/Login";
import Rodape from "../../components/Rodape";
import estilo from "./PLogin.module.css";

function PLogin() {
    return (
        <div className={estilo.ctnPLogin}>
            <Navegacao classname={estilo.navegacao} />
            <Login className={estilo.login} />
            <Rodape className={estilo.rodape} />
        </div>
    );
}

export default PLogin;