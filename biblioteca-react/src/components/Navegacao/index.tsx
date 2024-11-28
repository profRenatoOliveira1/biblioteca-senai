import { useState, useEffect } from "react";
import AuthRequests from "../../fetch/AuthRequests";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { GiHamburgerMenu } from "react-icons/gi";
import style from "./Navegacao.module.css";

/**
 * Propriedades para o componente de navegação.
 * 
 * @interface NavegacaoProps
 * @property {string} [classname] - Classe CSS opcional para estilização do componente.
 */
interface NavegacaoProps {
    classname?: string;
}

/**
 * Componente de navegação que exibe um menu lateral com opções de navegação.
 * 
 * @param {NavegacaoProps} props - As propriedades do componente.
 * @param {string} props.classname - Classe CSS adicional para estilização do botão de toggle.
 * 
 * @returns {JSX.Element} O componente de navegação.
 * 
 * @component
 * 
 * @example
 * // Exemplo de uso do componente Navegacao
 * <Navegacao classname="minha-classe" />
 * 
 * @remarks
 * Este componente utiliza o estado local para gerenciar a autenticação do usuário,
 * a exibição do menu lateral (Offcanvas), e a abertura de seções específicas dentro do menu.
 * 
 * @remarks
 * O componente verifica a autenticação do usuário ao montar, utilizando informações armazenadas
 * no localStorage. Se o usuário estiver autenticado, exibe opções adicionais no menu.
 * 
 * @remarks
 * O menu lateral contém links para diferentes seções, como "Alunos", "Livros" e "Empréstimos",
 * cada uma com suas próprias sub-opções. Também inclui um menu de usuário com opções para
 * atualizar senha, visualizar perfil e sair.
 */
function Navegacao({ classname }: NavegacaoProps): JSX.Element {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [showOffCanvas, setShowOffCanvas] = useState<boolean>(false);
    const [openSection, setOpenSection] = useState<string | null>(null); // Estado para controlar seções abertas
    const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false); // Controle para menu do usuário
    
    /**
    * Função assíncrona para verificar a autenticação do usuário.
    * 
    * @remarks
    * Esta função verifica se há informações de autenticação armazenadas no localStorage,
    * como o estado de autenticação (isAuth), o token de autenticação e o nome de usuário.
    * Se o usuário estiver autenticado, atualiza o estado local com essas informações.
    * Além disso, busca a foto de perfil do usuário através de uma requisição à API.
    */
    useEffect(() => {
        const checkAuthentication = async () => {
            const isAuth = localStorage.getItem("isAuth");
            const token = localStorage.getItem("token");
            const username = localStorage.getItem("username");

            if (isAuth && token) {
                setIsAuthenticated(true);
                setUsername(username || "");
            } else {
                setIsAuthenticated(false);
                setUsername("");
            }

            const profile = await AuthRequests.getProfilePicture();
            setProfilePicture(profile?.filename.replace(/\\/g, "/") || null);
        };

        checkAuthentication();
    }, []);

    /**
     * Função responsável por realizar o logout do usuário.
     * Remove o token de autenticação, atualiza o estado de autenticação
     * e redireciona o usuário para a página de login.
     */
    const handleLogout = () => {
        AuthRequests.removeToken();
        setIsAuthenticated(false);
        window.location.href = "/login";
    };

    /**
     * Alterna a seção aberta com base na seção fornecida.
     * Se a seção fornecida já estiver aberta, ela será fechada.
     * Caso contrário, a seção fornecida será aberta.
     *
     * @param section - A seção a ser alternada.
     */
    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    /**
     * Alterna o estado de abertura do menu do usuário.
     * 
     * Esta função inverte o valor booleano da variável `userMenuOpen`,
     * abrindo o menu do usuário se estiver fechado e fechando-o se estiver aberto.
     */
    const toggleUserMenu = () => {
        setUserMenuOpen(!userMenuOpen);
    };

    return (
        <>
            <Nav className={style.navbar}>
                <Button
                    variant="primary"
                    onClick={() => setShowOffCanvas(true)}
                    className={`${style.toggleButton} ${classname}`}
                >
                    <GiHamburgerMenu />
                </Button>
            </Nav>

            <Offcanvas
                show={showOffCanvas}
                onHide={() => setShowOffCanvas(false)}
                placement="start"
                className={style.offcanvas}
            >
                <Offcanvas.Header closeButton>
                    <Nav.Link href="/" className={style.canvaText}>
                        Biblioteca
                    </Nav.Link>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {isAuthenticated ? (
                        <Nav className="flex-column">
                            {/* Alunos */}
                            <Nav.Item>
                                <Nav.Link
                                    onClick={() => toggleSection("alunos")}
                                    className={`${style.navText} ${openSection === "alunos" ? style.active : ""
                                        }`}
                                >
                                    Alunos
                                </Nav.Link>
                                {openSection === "alunos" && (
                                    <div className={style.submenu}>
                                        <Nav.Link href="/cadastro/aluno">Cadastro</Nav.Link>
                                        <Nav.Link href="#">Listagem</Nav.Link>
                                    </div>
                                )}
                            </Nav.Item>

                            {/* Livros */}
                            <Nav.Item>
                                <Nav.Link
                                    onClick={() => toggleSection("livros")}
                                    className={`${style.navText} ${openSection === "livros" ? style.active : ""
                                        }`}
                                >
                                    Livros
                                </Nav.Link>
                                {openSection === "livros" && (
                                    <div className={style.submenu}>
                                        <Nav.Link href="/cadastro/livro">Cadastro</Nav.Link>
                                        <Nav.Link href="/lista/livros">Listagem</Nav.Link>
                                    </div>
                                )}
                            </Nav.Item>

                            {/* Emprestimos */}
                            <Nav.Item>
                                <Nav.Link
                                    onClick={() => toggleSection("emprestimos")}
                                    className={`${style.navText} ${openSection === "emprestimos" ? style.active : ""
                                        }`}
                                >
                                    Emprestimos
                                </Nav.Link>
                                {openSection === "emprestimos" && (
                                    <div className={style.submenu}>
                                        <Nav.Link href="#">Cadastro</Nav.Link>
                                        <Nav.Link href="#">Listagem</Nav.Link>
                                    </div>
                                )}
                            </Nav.Item>

                            {/* Usuário */}
                            <Nav.Item>
                                <Nav.Link
                                    onClick={toggleUserMenu}
                                    className={`${style.navText} ${userMenuOpen ? style.active : ""
                                        }`}
                                >
                                    <div className={style.navDropdownTitle}>
                                        {username}
                                        <img
                                            src={`http://localhost:3333/${profilePicture}`}
                                            alt="Foto de perfil"
                                            className={style.profilePicture}
                                        />
                                    </div>
                                </Nav.Link>
                                {userMenuOpen && (
                                    <div className={style.submenu}>
                                        <Nav.Link href="/atualizar/senha/aluno">Atualizar Senha</Nav.Link>
                                        <Nav.Link href="/perfil/aluno">Perfil</Nav.Link>
                                        <Nav.Link onClick={handleLogout}>Sair</Nav.Link>
                                    </div>
                                )}
                            </Nav.Item>
                        </Nav>
                    ) : (
                        <Nav.Link href="/login" className={style.navText}>
                            Login
                        </Nav.Link>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Navegacao;
