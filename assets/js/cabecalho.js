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

//verificando se existe ou não arquivos selecionados no Local Storage
let produtosEscolhidos = JSON.parse(localStorage.getItem('quantidade')) || 'Escolha um produto';
localStorage.setItem('quantidade', JSON.stringify(produtosEscolhidos));

const textCarrinho = document.querySelector('[data-carrinho="texto"]');
const grupoCarrinho = document.querySelector('[data-carrinho="grupo"]')

grupoCarrinho.addEventListener('mouseover', () => {
    if(!isNaN(localStorage.quantidade)) {
        let quantidadeAtual = JSON.parse(localStorage.getItem('quantidade'));
        produtosEscolhidos = `${quantidadeAtual} produtos no carrinho`;
        if(quantidadeAtual === 0) {
            produtosEscolhidos = 'Escolha um produto';
        }
    }
    textCarrinho.innerHTML = produtosEscolhidos;
})
grupoCarrinho.addEventListener('mouseout', () => {
    textCarrinho.innerHTML = 'Carrinho';
    if(localStorage.quantidade >= 10){
        textCarrinho.textContent = 'Limite atingido.';
    }
})

//esconder botão do carrinho
const btnCarrinho = document.querySelector('[data-carrinho="botao"]');
const listCarrinho = document.querySelector('[data-carrinho="produto"]');

btnCarrinho.addEventListener('click', () => {
    if(listCarrinho.classList.length == 1) {
        listCarrinho.classList.add('esconde');
    } else {
        listCarrinho.classList.remove('esconde');
    }
})