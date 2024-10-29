const elementoInserir = document.getElementById('livros');
const elementoValortotalLivros = document.getElementById('valor_total_livros_disponiveis');

function exibirLivros(listaLivros) {
    elementoValortotalLivros.innerHTML = '';
    elementoInserir.innerHTML = '';
    listaLivros.forEach(livro => {
        let disponibilidade = livro.quantidade >0 ? 'livro__imagens' : 'livro__imagens indisponivel';
        elementoInserir.innerHTML += `
        <div class="livro">
        <img class="livro__imagens" src="./imagens/livroImagem.webp" />
        <h2 class="livro__titulo">
          ${livro.titulo}
        </h2>
        <p class="livro__descricao">${livro.autor.nome}</p>
        <p class="livro__preco" id="preco">R$${livro.preco.toFixed(2)}</p>
        <div class="tags">
          <span class="tag">${livro.categoria}</span>
          <div class="tags">
            <button class="tag btn__atualizar" id="btnAtualizarLivro">Atualizar</button>
            <button class="tag btn__excluir" id="btnExcluirLivro">Excluir</button>
          </div>
        </div>
      </div>
        `;
    });

    const buttonsUpdate = document.querySelectorAll('#btnAtualizarLivro');
    const buttonsFechar = document.querySelectorAll('#btnFecharModal');
    const buttonsUpload = document.querySelectorAll('#btnCadastrarLivros');

    buttonsUpload.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.getElementById('modal-upload');
            modal.showModal();
        });
    });

    buttonsUpdate.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.getElementById('modal-update');
            modal.showModal();
        });
    });
    buttonsFechar.forEach(button => {
        button.addEventListener('click', () => {
            const modal1 = document.getElementById('modal-update');
            modal1.close();
            const modal2 = document.getElementById('modal-upload');
            modal2.close();
        });
    });
};