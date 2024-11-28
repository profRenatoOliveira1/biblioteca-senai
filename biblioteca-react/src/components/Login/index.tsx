import { useState } from 'react';
import AuthRequests from '../../fetch/AuthRequests';
import estilo from './Login.module.css';

/**
 * Propriedades para o componente de Login.
 *
 * @interface LoginProps
 * @property {string} [className] - Classe CSS opcional para estilização do componente.
 */
interface LoginProps {
    className?: string;
}

/**
 * Componente de Login.
 *
 * @param {LoginProps} props - As propriedades do componente.
 * @param {string} props.className - Classe CSS adicional para estilização.
 *
 * @returns {JSX.Element} O componente de Login.
 *
 * @example
 * <Login className="minha-classe" />
 *
 * @remarks
 * Este componente gerencia o estado do formulário de login e lida com a submissão do formulário.
 * Ao submeter o formulário, ele faz uma requisição de autenticação e redireciona o usuário para a página inicial em caso de sucesso.
 *
 * @component
 */
function Login({ className }: LoginProps): JSX.Element {
    const [formLogin, setFormLogin] = useState({
        email: "",
        senha: ""
    });

    /**
     * Manipula a mudança de valor nos campos de entrada do formulário de login.
     *
     * @param e - O evento de mudança do React gerado pelo campo de entrada.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormLogin({
            ...formLogin,
            [name]: value
        });
    };

    /**
     * Função assíncrona que lida com o envio do formulário de login.
     * 
     * @param e - Evento de envio do formulário.
     * 
     * A função previne o comportamento padrão do formulário, realiza uma requisição de login
     * utilizando os dados do formulário e, dependendo da resposta, redireciona o usuário para a 
     * página inicial ou exibe uma mensagem de erro.
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await AuthRequests.login(formLogin.email, formLogin.senha);
        if(!response) {
            alert("Erro ao fazer login");
        } else {
            window.location.href = '/';
        }
        console.log(response);
    }
    

    return (
        <div className={`${estilo.ctnLogin} ${className}`}>
            <h1>Login</h1>
            <form action="" method="post" className={estilo.formLogin} onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail</label>
                <input 
                    type="text" 
                    name="email" 
                    id="username"
                    placeholder='Insira seu melhor e-mail'
                    onChange={handleChange}    
                />
                <label htmlFor="senha">Senha</label>
                <input 
                    type="password" 
                    name="senha" 
                    id="senha" 
                    placeholder='Informe sua senha secreta' 
                    onChange={handleChange}    
                />
                <input type="submit" value="Login" />
            </form>
        </div>
    );
}

export default Login;