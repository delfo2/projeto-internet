const text = document.querySelector('[data-rolagem]');

window.addEventListener('scroll', () => {
    let posicao = window.scrollY;
    if(posicao > 100) {
        text.classList.add('esconde');
    } else {
        text.classList.remove('esconde');
    }
})