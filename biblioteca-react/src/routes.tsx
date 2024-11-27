import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PLogin from './pages/PLogin';
import PHome from './pages/PHome';
import PCadastroAluno from './pages/Aluno/PAluno';
import PPerfilAluno from './pages/Aluno/PPerfilAluno';

function AppRouter() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<PHome />} />
                <Route path="/login" element={<PLogin />} />

                <Route path="/cadastro/aluno" element={<PCadastroAluno />} />
                <Route path="/perfil/aluno" element={<PPerfilAluno />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;