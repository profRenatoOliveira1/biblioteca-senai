import { useState } from 'react';
import AuthRequests from '../../fetch/AuthRequests';
import estilo from './Login.module.css';

interface LoginProps {
    className?: string;
}

function Login({ className }: LoginProps) {
    const [formLogin, setFormLogin] = useState({
        email: "",
        senha: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormLogin({
            ...formLogin,
            [name]: value
        });
    };

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