/**
 * Envia os dados de cadastro de um aluno para o servidor.
 * 
 * Coleta os dados dos campos de entrada do formulário, valida se os campos obrigatórios
 * estão preenchidos, e envia uma requisição POST para cadastrar o aluno.
 * 
 * Se o cadastro for bem-sucedido, pergunta ao usuário se ele deseja acessar a lista de alunos.
 * 
 * @async
 * @function enviarDadosCadastroAluno
 * @returns {Promise<void>} Retorna uma Promise que resolve quando a operação é concluída.
 */
async function enviarDadosCadastroAluno() {
    // Coleta os dados dos campos de entrada do formulário
    const aluno = {
        nome: document.querySelectorAll('input')[0].value,
        sobrenome: document.querySelectorAll('input')[1].value,
        dataNascimento: document.querySelectorAll('input')[2].value,
        endereco: document.querySelectorAll('input')[3].value,
        email: document.querySelectorAll('input')[4].value,
        celular: document.querySelectorAll('input')[5].value,
    }

    // Verifica se os campos obrigatórios estão preenchidos
    if (aluno.nome === '' || aluno.sobrenome === '' || aluno.celular === '') {
        alert('Preencha campos obrigatórios!');
        return;
    }

    // Envia uma requisição POST para cadastrar o aluno
    const response = await fetch('http://localhost:3333/novo/aluno', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(aluno),
    });

    // Verifica se a resposta não é bem-sucedida
    if (!response.ok) {
        const error = await response.json();
        alert(error.message);
        return;
    }

    // Pergunta ao usuário se ele deseja acessar a lista de alunos
    const confirmacao = confirm('Aluno cadastrado com sucesso! Deseja acessar a lista de alunos?');
    if (confirmacao) {
        window.location.href = 'listar-alunos.html';
    } else {
        limparCampos();
    }
}

/**
 * Recupera a lista de alunos do servidor.
 * 
 * Esta função faz uma requisição HTTP para o endpoint `/listar/alunos` e retorna a lista de alunos.
 * Em caso de erro na requisição, um erro é lançado e `null` é retornado.
 * 
 * @async
 * @function recuperaListaAlunos
 * @returns {Promise<Array|null>} Uma promessa que resolve para um array de alunos ou `null` em caso de erro.
 * @throws {Error} Lança um erro se a resposta da requisição não for bem-sucedida.
 */
async function recuperaListaAlunos() {
    try {
        // Faz uma requisição HTTP para o endpoint listar alunos
        const response = await fetch(`http://localhost:3333/listar/alunos`);

        // Converte a resposta para JSON
        const alunos = await response.json();

        // Verifica se a resposta não é bem-sucedida
        if (!response.ok) {
            // Lança um erro com a mensagem da resposta
            throw new Error(alunos.message);
        }

        // Retorna a lista de alunos
        return alunos;
    } catch (error) {
        // Loga o erro no console
        console.error(`Erro ao buscar dados do servidor. ${error}`);

        // Retorna null em caso de erro
        return null;
    }
}

/**
 * Renderiza a tabela de alunos na interface.
 * 
 * Esta função recupera a lista de alunos de uma fonte de dados assíncrona,
 * cria elementos de tabela para cada aluno e os adiciona ao corpo da tabela (tbody).
 * 
 * Cada linha da tabela contém as seguintes informações do aluno:
 * - ID do Aluno
 * - Nome
 * - Sobrenome
 * - RA (Registro Acadêmico)
 * - Data de Nascimento
 * - Endereço
 * - Email
 * - Celular
 * 
 * Além disso, cada linha possui ícones para editar e remover o aluno.
 * 
 * @async
 * @function
 * @returns {Promise<void>} Uma promessa que é resolvida quando a tabela é renderizada.
 */
async function renderizarTabelaAlunos() {
    // Recupera a lista de alunos do servidor
    const alunos = await recuperaListaAlunos();

    // Seleciona o corpo da tabela (tbody) onde os dados dos alunos serão inseridos
    const tabela = document.querySelector('tbody');

    // Itera sobre cada aluno na lista de alunos
    alunos.forEach(aluno => {
        // Cria uma nova linha da tabela para o aluno
        const linha = document.createElement('tr');

        // Cria uma célula para o ID do aluno e adiciona à linha
        const collIDAluno = document.createElement('td');
        collIDAluno.textContent = aluno.idAluno;
        linha.appendChild(collIDAluno);

        // Cria uma célula para o nome do aluno e adiciona à linha
        const collNomeAluno = document.createElement('td');
        collNomeAluno.textContent = aluno.nome;
        linha.appendChild(collNomeAluno);

        // Cria uma célula para o sobrenome do aluno e adiciona à linha
        const collsobrenomeAluno = document.createElement('td');
        collsobrenomeAluno.textContent = aluno.sobrenome;
        linha.appendChild(collsobrenomeAluno);

        // Cria uma célula para o RA (Registro Acadêmico) do aluno e adiciona à linha
        const collRAAluno = document.createElement('td');
        collRAAluno.textContent = aluno.ra;
        linha.appendChild(collRAAluno);

        // Cria uma célula para a data de nascimento do aluno e adiciona à linha
        const collDataNascimento = document.createElement('td');
        collDataNascimento.textContent = new Date(aluno.dataNascimento).toLocaleDateString('pt-br');
        linha.appendChild(collDataNascimento);

        // Cria uma célula para o endereço do aluno e adiciona à linha
        const collEndereco = document.createElement('td');
        collEndereco.textContent = aluno.endereco;
        linha.appendChild(collEndereco);

        // Cria uma célula para o email do aluno e adiciona à linha
        const collEmailAluno = document.createElement('td');
        collEmailAluno.textContent = aluno.email;
        linha.appendChild(collEmailAluno);

        // Cria uma célula para o celular do aluno e adiciona à linha
        const collCelularAluno = document.createElement('td');
        collCelularAluno.textContent = aluno.celular.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        linha.appendChild(collCelularAluno);

        // Cria uma célula para as ações (editar e remover) e adiciona à linha
        const collAcoes = document.createElement('td');

        // Cria um ícone de edição, define suas propriedades e adiciona à célula de ações
        const imgEditar = document.createElement('img');
        imgEditar.src = 'assets/icons/pencil-square.svg';
        imgEditar.alt = 'Editar';
        imgEditar.title = 'Editar';
        imgEditar.addEventListener('click', () => {
            redirecionarParaAtualizarAluno(aluno);
        });
        collAcoes.appendChild(imgEditar);

        // Cria um ícone de remoção, define suas propriedades e adiciona à célula de ações
        const imgRemover = document.createElement('img');
        imgRemover.src = 'assets/icons/trash-fill.svg';
        imgRemover.alt = 'Remover';
        imgRemover.title = 'Remover';
        imgRemover.addEventListener('click', () => {
            removerAluno(aluno);
        });
        collAcoes.appendChild(imgRemover);

        // Adiciona a célula de ações à linha
        linha.appendChild(collAcoes);

        // Adiciona a linha completa à tabela
        tabela.appendChild(linha);
    });
}

/**
 * Remove um aluno após confirmação do usuário.
 * 
 * Esta função exibe uma mensagem de confirmação para o usuário. Se o usuário confirmar,
 * ela envia uma requisição DELETE para remover o aluno especificado pelo ID. Se a remoção
 * for bem-sucedida, uma mensagem de sucesso é exibida e a página é recarregada. Caso contrário,
 * uma mensagem de erro é exibida.
 * 
 * @param {Object} aluno - O objeto aluno a ser removido.
 * @param {number} aluno.idAluno - O ID do aluno.
 * @param {string} aluno.nome - O nome do aluno.
 * @param {string} aluno.sobrenome - O sobrenome do aluno.
 * @returns {Promise<void>} - Uma promessa que resolve quando a operação estiver concluída.
 */
async function removerAluno(aluno) {
    // Exibe uma mensagem de confirmação para o usuário
    const confirmacao = confirm(`Deseja realmente remover o aluno ${aluno.nome} ${aluno.sobrenome}? Essa operação é irreversível!`);

    // Se o usuário confirmar a remoção
    if (confirmacao) {
        // Envia uma requisição DELETE para remover o aluno especificado pelo ID
        const response = await fetch(`http://localhost:3333/remover/aluno?idAluno=${aluno.idAluno}`, {
            method: 'DELETE',
        });

        // Verifica se a resposta não é bem-sucedida
        if (!response.ok) {
            // Converte a resposta para JSON e exibe a mensagem de erro
            const error = await response.json();
            alert(error.message);
            return;
        }

        // Exibe uma mensagem de sucesso e recarrega a página
        alert('Aluno removido com sucesso!');
        window.location.reload();
    }
}

/**
 * Redireciona para a página de atualização de aluno com os parâmetros do aluno na URL.
 *
 * @param {Object} aluno - Objeto contendo as informações do aluno.
 * @param {number} aluno.idAluno - ID do aluno.
 * @param {string} aluno.nome - Nome do aluno.
 * @param {string} aluno.sobrenome - Sobrenome do aluno.
 * @param {string} aluno.dataNascimento - Data de nascimento do aluno.
 * @param {string} aluno.endereco - Endereço do aluno.
 * @param {string} aluno.email - Email do aluno.
 * @param {string} aluno.celular - Número de celular do aluno.
 */
function redirecionarParaAtualizarAluno(aluno) {
    // Cria uma nova URL para a página de atualização de aluno, baseada na origem atual
    const url = new URL('biblioteca-interface/atualizar-aluno.html', window.location.origin);

    // Define o parâmetro 'idAluno' na URL com o ID do aluno
    url.searchParams.set('idAluno', aluno.idAluno);

    // Define o parâmetro 'nome' na URL com o nome do aluno
    url.searchParams.set('nome', aluno.nome);

    // Define o parâmetro 'sobrenome' na URL com o sobrenome do aluno
    url.searchParams.set('sobrenome', aluno.sobrenome);

    // Define o parâmetro 'dataNascimento' na URL com a data de nascimento do aluno
    url.searchParams.set('dataNascimento', aluno.dataNascimento);

    // Define o parâmetro 'endereco' na URL com o endereço do aluno
    url.searchParams.set('endereco', aluno.endereco);

    // Define o parâmetro 'email' na URL com o email do aluno
    url.searchParams.set('email', aluno.email);

    // Define o parâmetro 'celular' na URL com o número de celular do aluno
    url.searchParams.set('celular', aluno.celular);

    // Redireciona o navegador para a URL construída
    window.location.href = url.toString();
}

// Adiciona um evento que será executado quando o conteúdo do DOM for completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    // Cria um objeto URLSearchParams para acessar os parâmetros da URL
    const params = new URLSearchParams(window.location.search);

    // Verifica se o parâmetro 'idAluno' está presente na URL
    if (params.has('idAluno')) {
        // Define o valor do campo de entrada do ID do aluno com o valor do parâmetro 'idAluno'
        document.querySelectorAll('input')[0].value = params.get('idAluno');

        // Define o valor do campo de entrada do nome do aluno com o valor do parâmetro 'nome'
        document.querySelectorAll('input')[1].value = params.get('nome');

        // Define o valor do campo de entrada do sobrenome do aluno com o valor do parâmetro 'sobrenome'
        document.querySelectorAll('input')[2].value = params.get('sobrenome');

        // Converte a data de nascimento do parâmetro para um objeto Date
        const dataNascimento = new Date(params.get('dataNascimento'));

        // Formata a data de nascimento para o formato YYYY-MM-DD
        const formattedDate = dataNascimento.toISOString().split('T')[0];

        // Define o valor do campo de entrada da data de nascimento com a data formatada
        document.querySelectorAll('input')[3].value = formattedDate;

        // Define o valor do campo de entrada do endereço do aluno com o valor do parâmetro 'endereco'
        document.querySelectorAll('input')[4].value = params.get('endereco');

        // Define o valor do campo de entrada do email do aluno com o valor do parâmetro 'email'
        document.querySelectorAll('input')[5].value = params.get('email');

        // Define o valor do campo de entrada do celular do aluno com o valor do parâmetro 'celular'
        document.querySelectorAll('input')[6].value = params.get('celular');
    }
});

/**
 * Envia os dados atualizados de um aluno para o servidor.
 * 
 * Esta função coleta os dados do aluno dos campos de entrada, valida os campos obrigatórios,
 * e envia uma requisição PUT para atualizar as informações do aluno no servidor. Se a 
 * atualização for bem-sucedida, ela solicita ao usuário a confirmação para navegar para 
 * a página de lista de alunos.
 * 
 * @async
 * @function enviarDadosAtualizacaoAluno
 * @returns {Promise<void>} Uma promessa que é resolvida quando a função é concluída.
 */
async function enviarDadosAtualizacaoAluno() {
    // Coleta os dados dos campos de entrada do formulário
    const aluno = {
        idAluno: document.querySelectorAll('input')[0].value, // ID do aluno
        nome: document.querySelectorAll('input')[1].value, // Nome do aluno
        sobrenome: document.querySelectorAll('input')[2].value, // Sobrenome do aluno
        dataNascimento: document.querySelectorAll('input')[3].value, // Data de nascimento do aluno
        endereco: document.querySelectorAll('input')[4].value, // Endereço do aluno
        email: document.querySelectorAll('input')[5].value, // Email do aluno
        celular: document.querySelectorAll('input')[6].value, // Celular do aluno
    }

    // Verifica se os campos obrigatórios estão preenchidos
    if (aluno.nome === '' || aluno.sobrenome === '' || aluno.celular === '') {
        alert('Preencha campos obrigatórios!'); // Alerta se algum campo obrigatório estiver vazio
        return; // Interrompe a execução da função
    }

    // Envia uma requisição PUT para atualizar os dados do aluno
    const response = await fetch(`http://localhost:3333/atualizar/aluno?idAluno=${aluno.idAluno}`, {
        method: 'PUT', // Método HTTP PUT para atualização
        headers: {
            'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
        },
        body: JSON.stringify(aluno), // Converte o objeto aluno para JSON e envia no corpo da requisição
    });

    // Verifica se a resposta não é bem-sucedida
    if (!response.ok) {
        const error = await response.json(); // Converte a resposta para JSON
        alert(error.message); // Exibe a mensagem de erro
        return; // Interrompe a execução da função
    }

    // Pergunta ao usuário se ele deseja acessar a lista de alunos
    const confirmacao = confirm('Aluno atualizado com sucesso! Deseja acessar a lista de alunos?');
    if (confirmacao) {
        window.location.href = 'listar-alunos.html'; // Redireciona para a página de lista de alunos
    }
}

/**
 * Limpa todos os campos de entrada (input) no documento, definindo seus valores como uma string vazia.
 */
function limparCampos() {
    // Seleciona todos os elementos de entrada (input) no documento e itera sobre cada um deles
    document.querySelectorAll('input').forEach(input =>
        // Define o valor do campo de entrada como uma string vazia
        input.value = ''
    );
}

// ------------------------------------------------------------------------------------------------------------------------------------------ //
async function buscaEndereco() {
    const cep = String(document.querySelector('[name="input-cep-aluno"]').value);

    if (cep != '') {
        const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);

        switch (response.status) {
            case 200:
                const endereco = await response.json();
                document.querySelector('[name="input-endereco-aluno"]').value = endereco.street;
                document.querySelector('[name="input-cidade-aluno"]').value = endereco.city;
                document.querySelector('[name="input-estado-aluno"]').value = endereco.state;
                break;
            case 400:
                alert('CEP não encontrado!');
                break;
        }
    }
}