import FormularioTeste from "../FormularioTeste";

interface HomeProps {
    className?: string;
}

function Home({ className }: HomeProps) {
    return (
        <div className={className}>
            <h1>Home</h1>
            <p>Essa é a Home do site.</p>
            <FormularioTeste />
        </div>
    );
}

export default Home;