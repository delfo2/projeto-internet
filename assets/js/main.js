//ouvinte de rolagem de tela
const text = document.querySelector('[data-rolagem]');

window.addEventListener('scroll', () => {
    let posicao = window.scrollY;
    if(posicao > 150) {
        text.classList.add('esconde');
    } else {
        text.classList.remove('esconde');
    }
})

//esconder menu de links
const btnMenu = document.querySelector('[data-menu]');
const btnlink = document.querySelector('[data-link]');

btnMenu.addEventListener('click', () => {
    if(btnlink.classList.length == 1) {
        btnlink.classList.add('esconde');
    } else {
        btnlink.classList.remove('esconde');
    }
})

//verificando quantos produtos tem no local storage
const produtosMemoria = JSON.parse(localStorage.getItem('itens')) || [];
let quantidadeItens = produtosMemoria.length || 'Escolha um produto';

const textoCarrinho = document.querySelector('[data-carrinho="texto"]');
const grupoCarrinho = document.querySelector('[data-carrinho="grupo"]')

function atualizaContagem () {
    quantidadeItens = listaCarrinho.childElementCount;
    if(quantidadeItens === 0) {
        textoCarrinho.textContent = 'Escolha um produto';
    } else {
        textoCarrinho.textContent = `${quantidadeItens} produtos no carrinho`;
    }
}

grupoCarrinho.addEventListener('mouseover', () => {
    atualizaContagem();
})
grupoCarrinho.addEventListener('mouseout', () => {
    textoCarrinho.innerHTML = 'Carrinho';
    if(listaCarrinho.childElementCount == 10){
        textoCarrinho.textContent = 'Limite atingido.';
    }
})

//esconder botão do carrinho
const btnCarrinho = document.querySelector('[data-carrinho="botao"]');
const listaCarrinho = document.querySelector('[data-carrinho="produto"]');

btnCarrinho.addEventListener('click', () => {
    if(listaCarrinho.classList.length == 1) {
        listaCarrinho.classList.add('esconde');
    } else {
        listaCarrinho.classList.remove('esconde');
    }
})


//                   LÓGICA DOS PRODUTOS                    //


const botoesAddCarrinho = document.querySelectorAll('[data-botao="carrinho"]');

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

function atualizaMemoria (objeto){
    produtosMemoria.push(objeto);
    localStorage.setItem('itens', JSON.stringify(produtosMemoria));
}
