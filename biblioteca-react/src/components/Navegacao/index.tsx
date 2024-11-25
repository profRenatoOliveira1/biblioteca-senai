import { useState, useEffect } from 'react';
import AuthRequests from '../../fetch/AuthRequests';
import NavBar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import style from './Navegacao.module.css';

interface NavegacaoProps {
    classname?: string;
}

function Navegacao({ classname }: NavegacaoProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [profilePicture, setProfilePicture] = useState<string | null>(null);

    useEffect(() => {
        // Função que verifica a autenticação e a foto do perfil
        const checkAuthentication = async () => {
            const isAuth = localStorage.getItem('isAuth');
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');

            if (isAuth && token) {
                setIsAuthenticated(true);
                setUsername(username || '');
            } else {
                setIsAuthenticated(false);
                setUsername('');
            }

            // Carregar a foto do perfil
            const profile = await AuthRequests.getProfilePicture();
            setProfilePicture(profile?.filename.replace(/\\/g, "/") || null);
        };

        checkAuthentication();
    }, []); // Array de dependências vazio para rodar apenas na montagem do componente

    const handleLogout = () => {
        AuthRequests.removeToken();
        setIsAuthenticated(false);
        window.location.href = '/login';
    };

    return (
        <NavBar className={`${style.navbar} ${classname}`}>
            <Container>
                <NavBar.Brand href="/" className={style.navbarTexts}>Biblioteca</NavBar.Brand>
                {isAuthenticated ? (
                    <>
                        <NavDropdown
                            title="Alunos"
                            id="basic-nav-dropdown"
                            className={style.navbarTexts}
                        >
                            <NavDropdown.Item href="/cadastro/aluno">Cadastro</NavDropdown.Item>
                            <NavDropdown.Item href="#action">Listagem</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown
                            title="Livros"
                            id="basic-nav-dropdown"
                            className={style.navbarTexts}
                        >
                            <NavDropdown.Item href="/cadastro/livro">Cadastro</NavDropdown.Item>
                            <NavDropdown.Item href="#action">Listagem</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown
                            title="Emprestimos"
                            id="basic-nav-dropdown"
                            className={style.navbarTexts}
                        >
                            <NavDropdown.Item href="/cadastro/emprestimo">Cadastro</NavDropdown.Item>
                            <NavDropdown.Item href="#action">Listagem</NavDropdown.Item>
                        </NavDropdown>
                        
                        <NavDropdown
                            title={
                                <div className={style.navDropdownTitle}>
                                    {username}
                                    <img
                                        // src={profilePicture || ''} 
                                        src={`http://localhost:3333/${profilePicture}`}
                                        alt="Foto de perfil"
                                        className={style.profilePicture}
                                    />
                                </div>
                            }
                            id="basic-nav-dropdown"
                            className={style.navbarTexts}
                        >
                            <NavDropdown.Item href="#action/3.1">Atualizar Senha</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Perfil</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>Sair</NavDropdown.Item>
                        </NavDropdown>
                    </>
                ) : (
                    <Nav.Link href="/login" className={style.navbarTexts}>Login</Nav.Link>
                )}
            </Container>
        </NavBar>
    );
}

export default Navegacao;
