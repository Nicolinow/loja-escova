const addCarrinhoButtons = document.querySelectorAll('[id^="Add-Carrinho-"]');

function adicionarAoCarrinho(event) {
    const button = event.target;
    const produtoId = button.id.replace('Add-Carrinho-', '');

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || {};

    // Verifica se o carrinho tem uma entrada para o produtoId
    if (!carrinho[produtoId]) {
        carrinho[produtoId] = 0;
    }
    carrinho[produtoId] += 1;

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function atualizarNumeroItensCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || {};

    let totalItens = Object.values(carrinho).reduce((total, quantidade) => total + quantidade, 0);

    const itemsCartSpan = document.getElementById('items-cart');
    if (itemsCartSpan) {
        itemsCartSpan.textContent = totalItens;
        if (totalItens === 0) {
            itemsCartSpan.classList.remove('appear');
        } else {
            itemsCartSpan.classList.add('appear');
            itemsCartSpan.textContent = totalItens > 9 ? '9+' : totalItens;
        }
    }
}

// Adiciona o event listener para cada botão
addCarrinhoButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        adicionarAoCarrinho(event);
        atualizarNumeroItensCarrinho();
    });
});

document.addEventListener('DOMContentLoaded', atualizarNumeroItensCarrinho);
localStorage.clear();