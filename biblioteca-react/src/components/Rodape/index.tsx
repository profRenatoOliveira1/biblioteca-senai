import estilo from './Rodape.module.css';

interface RodapeProps {
    className?: string;
}

function Rodape({ className}: RodapeProps) {
    return (
        <footer className={`${estilo.rodape} ${className}`}>
            <p>Desenvolvido por Renato Oliveira</p>
        </footer>
    );
}

export default Rodape;