import { useState, useEffect } from 'react';
import { SERVER_ROUTES } from '../../appConfig';
import AlunoRequests from '../../fetch/AlunoRequests';
import estilo from './PerfilAluno.module.css';
import { RiEdit2Fill } from "react-icons/ri";
import { MdSaveAlt } from "react-icons/md";

interface PerfilAlunoProps {
  classname?: string;
}

function PerfilAluno({ classname }: PerfilAlunoProps) {
  const [infoAluno, setInfoAluno] = useState<any>();
  const [serverUrl, setServerUrl] = useState<string>('');
  const [foto, setFoto] = useState<File>();

  useEffect(() => {
    const fetchData = async () => {
      const resposta = await AlunoRequests.listarAlunoRA();
      setInfoAluno(resposta);
      setServerUrl(SERVER_ROUTES.SERVER_URL);
    };

    fetchData();
  }, []);

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