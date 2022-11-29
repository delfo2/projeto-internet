const botoesAddCarrinho = document.querySelectorAll('[data-botao="carrinho"]');
const listaCarrinho = document.querySelector('[data-carrinho="produto"]');

const produtosMemoria = JSON.parse(localStorage.getItem('itens')) || [];
let produtoClicado = JSON.parse(localStorage.getItem('quantidade'));

const textoCarrinho = document.querySelector('[data-carrinho="texto"]');

produtosMemoria.forEach(element => {
    criarHtml(element);
});

botoesAddCarrinho.forEach(element => {
    element.addEventListener('click', function () {
        if(listaCarrinho.childElementCount < 10) {
            const grupo = this.parentNode;
            const titulo = grupo.querySelector('[data-produto="titulo"]').innerHTML.replace('<br> ', '');
            const img = grupo.querySelector('[data-imagem]');
            const itemAtual = {
                'titulo': titulo,
                'imagem': img.attributes.src.nodeValue
            }
            
            criarHtml(itemAtual);
            atualizaContagem();
            atualizaMemoria(itemAtual);
            textoCarrinho.textContent = 'Produto adicionado';
            textoCarrinho.parentNode.classList.add('fundo__amarelo');
            setTimeout(() => {
                textoCarrinho.textContent = 'Carrinho';
                textoCarrinho.parentNode.classList.remove('fundo__amarelo');
            },1000);
        } else {
            textoCarrinho.textContent = 'Limite atingido.';
            textoCarrinho.parentNode.classList.add('fundo__amarelo');
            setTimeout(() => {
                textoCarrinho.parentNode.classList.remove('fundo__amarelo');
            },1000);
        }
    })
})

function criarHtml (objeto) {
    const novaLi = document.createElement('li');
    novaLi.classList.add('produtos__lista');
    
    const novaImg = document.createElement('img');
    novaImg.classList.add('lista__imagem');
    novaImg.setAttribute('src', objeto.imagem);
    novaLi.appendChild(novaImg);
    
    const novoProduto = document.createElement('p');
    novoProduto.classList.add('carrinho__produto');
    novoProduto.innerHTML = objeto.titulo;
    novaLi.appendChild(novoProduto);

    novaLi.appendChild(criarBotao(objeto.titulo));
    
    listaCarrinho.appendChild(novaLi);
}

function criarBotao (titulo) {
    const novoBotao = document.createElement('button');
    novoBotao.classList.add('produtos__botao');
    novoBotao.innerHTML = 'x';
    
    novoBotao.addEventListener('click', function () {
        removeItem(this.parentNode,titulo);
    })
    return novoBotao;
}

function removeItem (botao, titulo) {
    botao.remove();
    produtosMemoria.splice(produtosMemoria.findIndex(item => item.titulo === titulo),1)
    atualizaContagem();
    localStorage.setItem('itens', JSON.stringify(produtosMemoria));
}

function atualizaContagem () {
    produtoClicado = listaCarrinho.childElementCount;
    localStorage.setItem('quantidade', JSON.stringify(produtoClicado));
    if(produtoClicado === 0) {
        textoCarrinho.textContent = 'Escolha um produto';
    } else {
        textoCarrinho.textContent = `${produtoClicado} produtos no carrinho`;
    }
}

function atualizaMemoria (objeto){
    produtosMemoria.push(objeto);
    localStorage.setItem('itens', JSON.stringify(produtosMemoria));
}
