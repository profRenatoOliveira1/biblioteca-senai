import Navegacao from "../../components/Navegacao";
import Home from "../../components/Home";
import Rodape from "../../components/Rodape";
import estilo from "./PHome.module.css";

function PHome() {
    return (
        <div className={estilo.ctnPHome}>
            <Navegacao classname={estilo.navegacao}/>
            <Home className={estilo.home} />
            <Rodape className={estilo.rodape} />
        </div>
    );
}

export default PHome;