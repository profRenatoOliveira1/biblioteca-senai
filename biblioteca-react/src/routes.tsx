import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PLogin from './pages/PLogin';
import PHome from './pages/PHome';
import PCadastroAluno from './pages/PAluno';

function AppRouter() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<PHome />} />
                <Route path="/login" element={<PLogin />} />

                <Route path="/cadastro/aluno" element={<PCadastroAluno />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;