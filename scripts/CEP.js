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
        valorBaseFrete = 14.0;
    } else {
        valorBaseFrete = 25.0 + (cepInicio / 100);
    }

    return valorBaseFrete + variacao + centavos;
}

function formatarValorFrete(valor) {
    return valor.toFixed(2).replace('.', ',');
}

function simularFrete() {
    const cep = document.getElementById('cep').value;
    const valorFrete = calcularValorFrete(cep);
    const resultadoElem = document.getElementById('resultado');
    resultadoElem.textContent = `R$${formatarValorFrete(valorFrete)}`;
    resultadoElem.classList.add('show');
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
    resultadoElem.textContent = mensagem;
    resultadoElem.classList.remove('show');
}

document.getElementById('cep').addEventListener('input', formatarCEP);
document.getElementById('calcularFrete').addEventListener('click', simularFrete);