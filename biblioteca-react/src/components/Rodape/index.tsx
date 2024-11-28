import estilo from './Rodape.module.css';

/**
 * Propriedades para o componente Rodape.
 * 
 * @interface RodapeProps
 * @property {string} [className] - Classe CSS opcional para estilização do componente.
 */
interface RodapeProps {
    className?: string;
}

/**
 * Componente de rodapé que exibe uma mensagem de autoria.
 *
 * @param {RodapeProps} props - As propriedades do componente.
 * @param {string} props.className - Classe CSS adicional para estilização do rodapé.
 * @returns {JSX.Element} Elemento JSX representando o rodapé.
 */
function Rodape({ className}: RodapeProps): JSX.Element {
    return (
        <footer className={`${estilo.rodape} ${className}`}>
            <p>Desenvolvido por Renato Oliveira</p>
        </footer>
    );
}

export default Rodape;