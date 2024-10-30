const botoes = document.querySelectorAll('.btn');

botoes.forEach(botao => {
    botao.addEventListener('click', filtrarLivros);
});

function filtrarLivros() {
    const elementoBtn = document.getElementById(this.id);
    const categoria = elementoBtn.value;    
    
    console.log(categoria);
    console.table(livros);
    let livrosFiltrados = livros.filter(livro => livro.categoria === categoria);
    console.table(livrosFiltrados);
    exibirLivros(livrosFiltrados);
};

function exibirValorTotalLivrosDisponiveis(valorTotal) {
    elementoValortotalLivros.innerHTML = `
        <div class="livros__disponiveis">
        <p>Todos os livros disponíveis por R$ <span id="valor">${valorTotal}</span></p>
        </div>
    `;
};