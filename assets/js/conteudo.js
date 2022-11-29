const text = document.querySelector('[data-rolagem]');

window.addEventListener('scroll', () => {
    let posicao = window.scrollY;
    if(posicao > 150) {
        text.classList.add('esconde');
    } else {
        text.classList.remove('esconde');
    }
})