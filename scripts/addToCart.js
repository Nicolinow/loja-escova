const addCarrinhoButtons = document.querySelectorAll('[id^="Add-Carrinho-"]');

function adicionarAoCarrinho(event) {
    const button = event.target;
    const produtoId = parseInt(button.id.replace('Add-Carrinho-', ''), 10);

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || {};

    if (!carrinho[produtoId]) {
        carrinho[produtoId] = 0;
    }

    if (carrinho[produtoId] < 9) {
        carrinho[produtoId] = parseInt(carrinho[produtoId], 10) + 1; // Incrementa como número
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarNumeroItensCarrinho(); // Atualiza o número de itens no carrinho
    } else {
        alert('Você não pode adicionar mais de 9 itens deste produto.');
    }
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

addCarrinhoButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        adicionarAoCarrinho(event);
        atualizarNumeroItensCarrinho();
    });
});

document.addEventListener('DOMContentLoaded', atualizarNumeroItensCarrinho);