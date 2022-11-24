const btnMenu = document.querySelector('[data-menu]');
const btnlink = document.querySelector('[data-link]');

btnMenu.addEventListener('click', () => {
    if(btnlink.classList.length == 1) {
        btnlink.classList.add('esconde');
    } else {
        btnlink.classList.remove('esconde');
    }
})

const btnCarrinho = document.querySelector('[data-carrinho="botao"]');
const listCarrinho = document.querySelector('[data-carrinho="produto"]');

btnCarrinho.addEventListener('click', () => {
    if(listCarrinho.classList.length == 1) {
        listCarrinho.classList.add('esconde');
    } else {
        listCarrinho.classList.remove('esconde');
    }
})

const produtosEscolhidos = '2 itens no carrinho';
const textCarrinho = document.querySelector('[data-carrinho="texto"]');
const grupoCarrinho = document.querySelector('[data-carrinho="grupo"]')

grupoCarrinho.addEventListener('mouseover', () => {
    textCarrinho.innerHTML = produtosEscolhidos;
})
grupoCarrinho.addEventListener('mouseout', () => {
    textCarrinho.innerHTML = 'Carrinho';
})