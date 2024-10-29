let livros = [];
const PORT = 3000;
const endPointGetAll = `http://localhost:${PORT}/livros`;
getBuscaLivros();
const button = document.getElementById('btnAtualizarLivro');
const modal = document.getElementById('modal-update');
const botaoFechar = document.getElementById('btnFecharModal');


async function getBuscaLivros() {
    const response = await fetch(endPointGetAll);
    let livros = await response.json();
    exibirLivros(livros);
    
    console.table(livros);
};