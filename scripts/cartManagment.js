let shippingCost = 0;

function calcularValorFrete(cepDestino) {
    const cepNumerico = cepDestino.replace(/\D/g, '');
    const cepInicio = parseInt(cepNumerico.substring(0, 2));
    const cepFim = parseInt(cepNumerico.slice(-4));
    const variacao = (cepFim % 5) * 2;
    const centavos = (cepFim % 100) / 100;

    let valorBaseFrete;

    if (cepInicio === 20 || cepInicio === 21) {
        valorBaseFrete = 7.0;
    } else if (cepInicio >= 1 && cepInicio <= 29) {
        valorBaseFrete = 20.0;
    } else {
        valorBaseFrete = 40.0 + (cepInicio / 100);
    }

    return valorBaseFrete + variacao + centavos;
}

function formatarValorFrete(valor) {
    return valor.toFixed(2).replace('.', ',');
}

function calcularTempoEntrega(cep) {
    let tempoEntrega = localStorage.getItem(`tempoEntrega_${cep}`);
    if (!tempoEntrega) {
        tempoEntrega = Math.floor(Math.random() * (16 - 5 + 1)) + 5;
        localStorage.setItem(`tempoEntrega_${cep}`, tempoEntrega);
    }
    return tempoEntrega;
}

function simularFrete() {
    const cep = document.getElementById('cep').value;
    shippingCost = calcularValorFrete(cep);

    const resultadoElem = document.getElementById('resultado');
    animateValueChange(resultadoElem, `R$${formatarValorFrete(shippingCost)}`);

    const tempoEntrega = calcularTempoEntrega(cep);
    const timeElem = document.getElementById('time');
    animateValueChange(timeElem, `${tempoEntrega} dias úteis`);

    atualizarTotal();
}

function atualizarTotal() {
    const subtotalElem = document.querySelector('.subtotal-content');
    const subtotal = parseFloat(subtotalElem.textContent.replace('R$', '').replace('.', '').replace(',', '.')) || 0;

    const total = subtotal + shippingCost;

    const totalElem = document.querySelector('.total-content');
    if (shippingCost > 0) {
        totalElem.style.display = 'block';
    } else {
        totalElem.style.display = 'none';
    }
    animateValueChange(totalElem, `R$${total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
    localStorage.setItem('valorTotal', total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
}

function animateValueChange(element, newValue, callback) {
    if (element.textContent === newValue) {
        if (callback) callback();
        return;
    }

    element.classList.remove('show');

    setTimeout(() => {
        element.textContent = newValue;
        element.classList.add('fade-in');

        setTimeout(() => {
            element.classList.add('show');
            if (callback) callback();
        }, 200);

    }, 400);
}

function formatarCEP() {
    const cepInput = document.getElementById('cep');
    let cep = cepInput.value.replace(/\D/g, ''); 
    if (cep.length > 5) {
        cep = cep.slice(0, 5) + '-' + cep.slice(5); 
    }
    cepInput.value = cep;

    validarCEP(); 
}

function validarCEP() {
    const cep = document.getElementById('cep').value;
    const botaoCalcular = document.getElementById('calcularFrete');

    if (cep.length === 9 && /^\d{5}-\d{3}$/.test(cep)) {
        botaoCalcular.disabled = false;
    } else {
        botaoCalcular.disabled = true;
    }
}

function updateTotalValue(id, quantidade) {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const produto = produtos.find(p => p.id === id);
    const valorTotal = quantidade * produto.preco;
    const valorTotalElem = document.getElementById(`total${id}`);

    animateValueChange(valorTotalElem, `R$${valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, () => {
        atualizarSubtotal();
        atualizarTotal();
    });

}

function renderCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || {};
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    document.querySelector('.Qtd-product').innerHTML = '';
    document.querySelector('.Item-product').innerHTML = '';
    document.querySelector('.Up-product').innerHTML = '';
    document.querySelector('.Tv-product').innerHTML = '';

    let subtotal = 0;

    produtos.forEach(produto => {
        if (carrinho[produto.id] > 0) {
            const qtdControl = document.createElement('p');
            qtdControl.className = 'quantity-control';
            
            const quantityInput = document.createElement('input');
            quantityInput.className = 'quantity';
            quantityInput.type = 'number';
            quantityInput.id = `quantity${produto.id}`;
            quantityInput.value = carrinho[produto.id];
            quantityInput.min = 0;
            quantityInput.max = 9;
            quantityInput.addEventListener('change', () => {
                if (quantityInput.value < 1) {
                    delete carrinho[produto.id];
                } else {
                    carrinho[produto.id] = quantityInput.value;
                }
                updateTotalValue(produto.id, quantityInput.value);
                localStorage.setItem('carrinho', JSON.stringify(carrinho));
                atualizarNumeroItensCarrinho();
                atualizarSubtotal();
                atualizarTotal();
                renderCarrinho(); // Re-renderiza o carrinho para refletir as mudanças
            });

            const decreaseButton = document.createElement('button');
            decreaseButton.className = 'decrease';
            decreaseButton.textContent = '↓';
            decreaseButton.addEventListener('click', () => {
                if (quantityInput.value > 1) {
                    quantityInput.value--;
                    carrinho[produto.id] = quantityInput.value;
                    updateTotalValue(produto.id, quantityInput.value);
                } else {
                    delete carrinho[produto.id];
                }
                localStorage.setItem('carrinho', JSON.stringify(carrinho));
                atualizarNumeroItensCarrinho();
                atualizarSubtotal();
                atualizarTotal(); 
                renderCarrinho(); // Re-renderiza o carrinho para refletir as mudanças
            });
            
            const increaseButton = document.createElement('button');
            increaseButton.className = 'increase';
            increaseButton.textContent = '↑';
            increaseButton.addEventListener('click', () => {
                if (quantityInput.value < 9) {
                    quantityInput.value++;
                    carrinho[produto.id] = quantityInput.value;
                    updateTotalValue(produto.id, quantityInput.value);
                }
                localStorage.setItem('carrinho', JSON.stringify(carrinho));
                atualizarNumeroItensCarrinho();
                atualizarSubtotal();
                atualizarTotal();
            });
            
            qtdControl.appendChild(decreaseButton);
            qtdControl.appendChild(quantityInput);
            qtdControl.appendChild(increaseButton);

            document.querySelector('.Qtd-product').appendChild(qtdControl);
            
            const itemElement = document.createElement('p');
            itemElement.textContent = produto.nome;
            document.querySelector('.Item-product').appendChild(itemElement);
            
            const precoElement = document.createElement('p');
            precoElement.textContent = `R$${produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            document.querySelector('.Up-product').appendChild(precoElement);
            
            const valorTotal = carrinho[produto.id] * produto.preco;
            const valorTotalElement = document.createElement('p');
            valorTotalElement.id = `total${produto.id}`;
            document.querySelector('.Tv-product').appendChild(valorTotalElement);
            animateValueChange(valorTotalElement, `R$${valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);

            subtotal += valorTotal;
        }
    });

    const subtotalElem = document.querySelector('.subtotal-content');
    animateValueChange(subtotalElem, `R$${subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
    atualizarTotal();
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

function atualizarSubtotal() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || {};
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    let subtotal = 0;

    produtos.forEach(produto => {
        if (carrinho[produto.id] > 0) {
            subtotal += carrinho[produto.id] * produto.preco;
        }
    });

    const subtotalElem = document.querySelector('.subtotal-content');
    animateValueChange(subtotalElem, `R$${subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
    atualizarTotal();
}

document.addEventListener('DOMContentLoaded', () => {
    atualizarNumeroItensCarrinho();
    renderCarrinho();
});

document.getElementById('cep').addEventListener('input', formatarCEP);
document.getElementById('calcularFrete').addEventListener('click', simularFrete);

const addCarrinhoButtons = document.querySelectorAll('[id^="Add-Carrinho-"]');

function adicionarAoCarrinho(event) {
    const button = event.target;
    const produtoId = parseInt(button.id.replace('Add-Carrinho-', ''), 10);

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || {};

    if (!carrinho[produtoId]) {
        carrinho[produtoId] = 0;
    }

    if (carrinho[produtoId] < 9) {
        carrinho[produtoId] += 1;
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarNumeroItensCarrinho(); // Atualiza o número de itens no carrinho
    } else {
        delete carrinho[produtoId];
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        alert('Você não pode adicionar mais de 9 itens deste produto. O produto foi removido do carrinho.');
    }
}

addCarrinhoButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        adicionarAoCarrinho(event);
        atualizarNumeroItensCarrinho();
    });
});

document.addEventListener('DOMContentLoaded', atualizarNumeroItensCarrinho);
