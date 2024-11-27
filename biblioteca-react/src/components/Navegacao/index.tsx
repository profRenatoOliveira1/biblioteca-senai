import { useState, useEffect } from "react";
import AuthRequests from "../../fetch/AuthRequests";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { GiHamburgerMenu } from "react-icons/gi";
import style from "./Navegacao.module.css";

interface NavegacaoProps {
    classname?: string;
}

function Navegacao({ classname }: NavegacaoProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [showOffCanvas, setShowOffCanvas] = useState<boolean>(false);
    const [openSection, setOpenSection] = useState<string | null>(null); // Estado para controlar seções abertas
    const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false); // Controle para menu do usuário

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

    const handleLogout = () => {
        AuthRequests.removeToken();
        setIsAuthenticated(false);
        window.location.href = "/login";
    };

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

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
                                        <Nav.Link href="#">Cadastro</Nav.Link>
                                        <Nav.Link href="#">Listagem</Nav.Link>
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
                                        <Nav.Link href="#action/3.1">Atualizar Senha</Nav.Link>
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
