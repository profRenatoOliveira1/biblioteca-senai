import express from "express";
import { SERVER_ROUTES } from "./appConfig";
import AlunoController from "./controller/AlunoController";
import LivroController from "./controller/LivroController";
import EmprestimoController from "./controller/EmprestimoController";
import { Authentication } from "./util/Authentication";
import upload from "./util/Utilitarios";

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ mensagem: "Rota padrão" })
});

// CRUD Aluno
router.get(SERVER_ROUTES.LISTAR_ALUNOS, AlunoController.todos);
router.get(SERVER_ROUTES.LISTAR_ALUNO_RA, AlunoController.alunoRA);
router.post(SERVER_ROUTES.NOVO_ALUNO, upload.single('foto'), AlunoController.cadastrar);
router.delete(SERVER_ROUTES.REMOVER_ALUNO, AlunoController.remover);
router.put(SERVER_ROUTES.ATUALIZAR_ALUNO, AlunoController.atualizar);

//CRUD Livro
router.get(SERVER_ROUTES.LISTAR_LIVROS, LivroController.todos);
router.post(SERVER_ROUTES.NOVO_LIVRO, LivroController.cadastrar);
router.delete(SERVER_ROUTES.REMOVER_LIVRO, LivroController.remover);
router.put(SERVER_ROUTES.ATUALIZAR_LIVRO, LivroController.atualizar);

//CRUD Emprestimo
router.get(SERVER_ROUTES.LISTAR_EMPRESTIMOS, EmprestimoController.todos);
router.post(SERVER_ROUTES.NOVO_EMPRESTIMO, EmprestimoController.cadastrar);
router.put(SERVER_ROUTES.ATUALIZAR_EMPRESTIMO, EmprestimoController.atualizar);

router.post(SERVER_ROUTES.LOGIN, Authentication.validacaoUsuario);

export { router }