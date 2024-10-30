const elementoInserir = document.getElementById('livros');
const elementoValortotalLivros = document.getElementById('valor_total_livros_disponiveis');
const formUpload = document.getElementById('formUpload');

function exibirLivros(listaLivros) {
    elementoValortotalLivros.innerHTML = '';
    elementoInserir.innerHTML = '';
    listaLivros.forEach(livro => {
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
            <button class="tag btn__excluir" id="btnExcluirLivro" data-id="${livro._id}">Excluir</button>
          </div>
        </div>
      </div>
        `;
    });

    const buttonsExcluir = document.querySelectorAll('#btnExcluirLivro');
    buttonsExcluir.forEach(button => {
        button.addEventListener('click', async (event) => {
            const livroId = event.target.getAttribute('data-id');
            console.log('livroId:', livroId);
            const confirmacao = window.confirm('Você tem certeza que quer deletar o livro?');
            if (confirmacao) {
                try {
                    const response = await fetch(`http://localhost:3000/livros/${livroId}`, {
                        method: 'DELETE'
                    });
                    if (response.ok) {
                        alert('Livro deletado com sucesso!');
                        // Remover o livro da lista e atualizar a interface
                        listaLivros = listaLivros.filter(livro => livro._id !== livroId);
                        exibirLivros(listaLivros);
                    } else {
                        alert('Erro ao deletar o livro.');
                    }
                } catch (error) {
                    console.error('Erro:', error);
                    alert('Erro ao deletar o livro.');
                }
            }
        });
    });

    const buttonsUpdate = document.querySelectorAll('#btnAtualizarLivro');
    const buttonsFechar = document.querySelectorAll('#btnFecharModal');
    const buttonsUpload = document.querySelectorAll('#btnCadastrarLivros');
    const modal1 = document.getElementById('modal-upload');
    const modal2 = document.getElementById('modal-update');

    buttonsUpload.forEach(button => {
        button.addEventListener('click', () => {
            modal1.showModal();
        });
    });

    buttonsUpdate.forEach(button => {
        button.addEventListener('click', () => {
            modal2.showModal();
        });
    });
    buttonsFechar.forEach(button => {
        button.addEventListener('click', () => {
            modal1.close();
            modal2.close();
        });
    });

    formUpload.addEventListener('submit', async (event) => {
      event.preventDefault();
      const confirmacao = window.confirm('Você tem certeza que quer cadastrar o produto?');
      if (confirmacao) {
          const titulo = document.getElementById('titulo').value;
          const editora = document.getElementById('editora').value;
          const preco = document.getElementById('preco').value;
          const paginas = document.getElementById('paginas').value;
          const categoria = document.getElementById('categoria').value;
          const autor = document.getElementById('autor').value;

          console.log('titulo:', titulo, 'editora:', editora, 'preco:', preco, 'paginas:', paginas, 'categoria:', categoria, 'autor:', autor);

          if (titulo && autor && preco && categoria && editora && paginas) {
              const novoLivro = {
                  titulo,
                  editora,
                  preco,
                  paginas,
                  categoria,
                  autor
              };
              console.log('novoLivro:', novoLivro);

              try {
                  const response = await fetch('http://localhost:3000/livros', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(novoLivro)
                  });

                  if (response.ok) {
                      alert('Produto cadastrado com sucesso!');
                      const livroCadastrado = await response.json();
                      listaLivros.push(livroCadastrado);
                      exibirLivros(listaLivros);
                      modal1.close();
                      modal2.close();
                      formUpload.reset();
                  } else {
                      alert('Erro ao cadastrar o produto.');
                  }
              } catch (error) {
                  console.error('Erro:', error);
                  alert('Erro ao cadastrar o produto.');
              }
          } else {
              alert('Por favor, preencha todos os campos obrigatórios.');
          }
      }
  });

};