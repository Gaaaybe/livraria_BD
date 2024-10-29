let livros = [];
const endPointAPI = 'https://guilhermeonrails.github.io/casadocodigo/livros.json';
getBuscaLivros();
const button = document.getElementById('btnAtualizarLivro');
const modal = document.getElementById('modal-update');
const botaoFechar = document.getElementById('btnFecharModal');


async function getBuscaLivros() {
    const response = await fetch(endPointAPI);
    livros = await response.json();
    let livrosDesconto = aplicarDesconto(livros);
    exibirLivros(livrosDesconto);
    
    console.table(livros);
};