import { useState, useEffect } from 'react';
import { SERVER_ROUTES } from '../../appConfig';
import AlunoRequests from '../../fetch/AlunoRequests';
import estilo from './PerfilAluno.module.css';
import { RiEdit2Fill } from "react-icons/ri";
import { MdSaveAlt } from "react-icons/md";

/**
 * Propriedades para o componente PerfilAluno.
 * 
 * @interface PerfilAlunoProps
 * @property {string} [classname] - Classe CSS opcional para estilização do componente.
 */
interface PerfilAlunoProps {
  classname?: string;
}

/**
 * Componente PerfilAluno exibe as informações do aluno e permite a edição de alguns campos.
 *
 * @param {PerfilAlunoProps} props - As propriedades do componente.
 * @param {string} props.classname - Classe CSS para estilização do componente.
 *
 * @returns {JSX.Element} O componente PerfilAluno.
 *
 * @component
 *
 * @example
 * <PerfilAluno classname="perfil-aluno" />
 *
 * @remarks
 * Este componente utiliza hooks do React como useState e useEffect para gerenciar o estado e os efeitos colaterais.
 * Ele também faz uma requisição assíncrona para buscar os dados do aluno e exibe um formulário com as informações.
 * A foto do aluno pode ser alterada através de um input do tipo file.
 * 
 * @todo
 * Implementar a lógica de edição e salvamento das informações do aluno.
 */
function PerfilAluno({ classname }: PerfilAlunoProps) {
  const [infoAluno, setInfoAluno] = useState<any>();
  const [serverUrl, setServerUrl] = useState<string>('');
  const [foto, setFoto] = useState<File>();

  /**
   * Hook de efeito que busca os dados do aluno e a URL do servidor.
   * 
   * Este efeito é executado apenas uma vez, após a montagem do componente.
   * Ele faz uma requisição assíncrona para obter os dados do aluno através da função `listarAlunoRA` 
   * e define esses dados no estado `infoAluno`. Além disso, define a URL do servidor no estado `serverUrl`.
   */
  useEffect(() => {
    const fetchData = async () => {
      const resposta = await AlunoRequests.listarAlunoRA();
      setInfoAluno(resposta);
      setServerUrl(SERVER_ROUTES.SERVER_URL);
    };

    fetchData();
  }, []);

  /**
   * Manipulador de evento para mudança de arquivo.
   * 
   * @param event - O evento de mudança de arquivo.
   * 
   * Esta função é chamada quando um arquivo é selecionado pelo usuário.
   * Ela obtém o primeiro arquivo da lista de arquivos selecionados e, 
   * se houver um arquivo, define esse arquivo como a foto selecionada.
   */
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFoto(file);
    }
  };

  return (
    <div className={classname}>
      {infoAluno && (
        <div className={estilo.ctnPerfilAluno}>
          <label htmlFor="fotoUpload">
            <img
              src={foto ? URL.createObjectURL(foto) : `${serverUrl}/${infoAluno.foto.replace(/\\/g, '/')}`}
              alt="Foto do Aluno"
              className={estilo.fotoPerfil}
            />
            <input
              id="fotoUpload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>
          <h1>{`${infoAluno.nome} ${infoAluno.sobrenome}`}</h1>
          <div className={estilo.painelPrincipal}>
            <div className={estilo.ctnEsquerda}>
              <div className={estilo.ctnInfoAluno}>
                <p>RA: </p>
                <input type="text" value={`${infoAluno.ra}`} disabled />
              </div>

              <div className={estilo.ctnInfoAluno}>
                <p>E-mail:</p>
                <input type="email" value={`${infoAluno.email}`} name='editItem' disabled />
              </div>

              <div className={estilo.ctnInfoAluno}>
                <p>Celular:</p>
                <input type="number" value={`${infoAluno.celular}`} name='editItem' disabled />
              </div>

              <div className={estilo.ctnInfoAluno}>
                <p>Data Nascimento:</p>
                <input type="date" value={`${new Date(infoAluno.dataNascimento).toISOString().split('T')[0]}`} name='editItem' disabled />
              </div>

              <div className={estilo.ctnInfoAluno}>
                <p>Endereço:</p>
                <input type="text" value={`${infoAluno.endereco}`} name='editItem' disabled />
              </div>
            </div>
            <div className={estilo.ctnDireita}>
              <div className={estilo.actionButtons}>
                <RiEdit2Fill
                  className={`${estilo.editButton} ${estilo.actionButton}`}
                  onClick={() => {
                    const inputs = document.getElementsByName(`editItem`);
                    inputs.forEach(input => (input as HTMLInputElement).disabled = !(input as HTMLInputElement).disabled);
                  }}
                />
                <MdSaveAlt
                  className={`${estilo.editButton} ${estilo.actionButton}`}
                  onClick={() => {
                    alert('Editar!');
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PerfilAluno;