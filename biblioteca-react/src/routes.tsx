import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PLogin from './pages/PLogin';
import PHome from './pages/PHome';
import PCadastroAluno from './pages/Aluno/PCadastroAluno';
import PPerfilAluno from './pages/Aluno/PPerfilAluno';
import PAtualizarSenhaAluno from './pages/Aluno/PAtualizarSenhaAluno';
import PCadastroLivro from './pages/Livros/PCadastroLivro';
import PListagemLivros from './pages/Livros/PListagemLivros';

function AppRouter() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<PHome />} />
                <Route path="/login" element={<PLogin />} />

                {/* ALUNO */}
                <Route path="/cadastro/aluno" element={<PCadastroAluno />} />
                <Route path="/perfil/aluno" element={<PPerfilAluno />} />
                <Route path="/atualizar/senha/aluno" element={<PAtualizarSenhaAluno />} />

                {/* LIVRO */}
                <Route path="/cadastro/livro" element={<PCadastroLivro />} />
                <Route path="/lista/livros" element={<PListagemLivros />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;