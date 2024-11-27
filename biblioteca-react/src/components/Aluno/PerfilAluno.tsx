import { useState, useEffect } from 'react';
import { SERVER_ROUTES } from '../../appConfig';
import AlunoRequests from '../../fetch/AlunoRequests';
import estilo from './PerfilAluno.module.css';

interface PerfilAlunoProps {
  classname?: string;
}

function PerfilAluno({ classname }: PerfilAlunoProps) {
  const [infoAluno, setInfoAluno] = useState<any>();
  const [serverUrl, setServerUrl] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const resposta = await AlunoRequests.listarAlunoRA();
      setInfoAluno(resposta);
      setServerUrl(SERVER_ROUTES.SERVER_URL);
    };

    fetchData();
  }, []);

  return (
    <div className={classname}>
      {infoAluno && (
        <div className={estilo.ctnPerfilAluno}>
          <img src={`${serverUrl}/${infoAluno.foto.replace(/\\/g, '/')}`} alt={`${infoAluno.nome} ${infoAluno.sobrenome}`} />
          <h1>{`${infoAluno.nome} ${infoAluno.sobrenome}`}</h1>
          <div className={estilo.ctnInfoAluno}>
            <p>RA: </p>
            <input type="text" value={`${infoAluno.ra}`} disabled />
          </div>

          <div className={estilo.ctnInfoAluno}>
            <p>E-mail:</p>
            <input type="email" value={`${infoAluno.email}`} disabled />
          </div>

          <div className={estilo.ctnInfoAluno}>
            <p>Celular:</p>
            <input type="number" value={`${infoAluno.celular}`} disabled />
          </div>

          <div className={estilo.ctnInfoAluno}>
            <p>Data Nascimento:</p>
            <input type="date" value={`${new Date(infoAluno.dataNascimento).toISOString().split('T')[0]}`} disabled />
          </div>

          <div className={estilo.ctnInfoAluno}>
            <p>Endereço:</p>
            <input type="text" value={`${infoAluno.endereco}`} disabled />
          </div>
        </div>
      )}
    </div>
  );
}

export default PerfilAluno;