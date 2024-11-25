async function isbnSearch() {
    const isbn = String(document.querySelector('#isbn-search').value);

    const livro = await fetch(`https://brasilapi.com.br/api/isbn/v1/${isbn}`);

    if (livro.status === 200) {
        exibirLivro(await livro.json());
        // alert('Livro encontrado, consulte os logs');
        // console.log(await livro.json());
    } else if (livro.status === 400) {
        alert('ISBN inválido');
        throw new Error('ISBN inválido');
    } else if (livro.status === 404) {
        alert('ISBN não encontrado');
        throw new Error('ISBN não encontrado');
    } else if (livro.status === 500) {
        alert('Erro interno do servidor');
        throw new Error('Erro interno do servidor');
    }
}

document.querySelector('button').addEventListener('click', isbnSearch);

function exibirLivro(livro) {
    console.log(livro);
    const div = document.createElement('div');
    div.classList.add('livro');

    div.innerHTML = `
        <h2>Título: ${livro.title}</h2>
        <p>Autor(es): ${livro.authors}</p>
        <p>Editora: ${livro.publisher}</p>
        <p>Ano: ${livro.year}</p>
        <p>Número de páginas: ${livro.page_count}</p>
        <p>ISBN: ${livro.isbn}</p>
    `;

    document.querySelector('main').appendChild(div);
}