let shippingCost = 0;

document.addEventListener('DOMContentLoaded', function() {
    const quantityControls = document.querySelectorAll('.quantity-control');

    quantityControls.forEach(function(control) {
        // Seleciona os botões e o input dentro de cada controle
        const decreaseBtn = control.querySelector('.decrease');
        const increaseBtn = control.querySelector('.increase');
        const quantityInput = control.querySelector('.quantity');

        // Diminuir quantidade
        decreaseBtn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });

        // Aumentar quantidade
        increaseBtn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue < 10) {  // Limite máximo de 10
                quantityInput.value = currentValue + 1;
            }
        });
    });

});

function formatCurrency(value) {
    return `R$${value.toFixed(2).replace('.', ',')}`;
}

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

function simularFrete() {
    const cep = document.getElementById('cep').value;
    shippingCost = calcularValorFrete(cep);

    const resultadoElem = document.getElementById('resultado');
    animateValueChange(resultadoElem, `R$${formatarValorFrete(shippingCost)}`);

    updateTotal();
}

function updateTotal() {

    const subtotalElem = document.querySelector('.subtotal-content');
    const subtotal = parseFloat(subtotalElem.textContent.replace('R$', '').replace(',', '.'));

    const total = subtotal + shippingCost;

    const totalElem = document.querySelector('.total-content');
    animateValueChange(totalElem, formatCurrency(total));
}


function animateValueChange(element, newValue) {

    element.classList.remove('show');

    setTimeout(() => {
        element.textContent = newValue;
        element.classList.add('fade-in');

        setTimeout(() => {
            element.classList.add('show');
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

function mostrar(mensagem) {
    const resultadoElem = document.getElementById('resultado');
    const totalElem = document.getElementById('total');
    resultadoElem.textContent = mensagem;
    resultadoElem.classList.remove('show');
    totalElem.classList.remove('show');
}

document.getElementById('cep').addEventListener('input', formatarCEP);
document.getElementById('calcularFrete').addEventListener('click', simularFrete);
