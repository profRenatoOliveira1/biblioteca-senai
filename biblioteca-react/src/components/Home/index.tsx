/**
 * Propriedades do componente Home.
 *
 * @interface HomeProps
 * @property {string} [className] - Classe CSS opcional para estilização do componente.
 */
interface HomeProps {
    className?: string;
}

/**
 * Componente Home.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.className - Classe CSS para estilização do componente.
 * @returns {JSX.Element} Elemento JSX que representa a Home.
 */
function Home({ className }: HomeProps): JSX.Element {
    return (
        <div className={className}>
            <h1>Home</h1>
            <p>Essa é a Home do site.</p>
        </div>
    );
}

export default Home;