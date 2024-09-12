function gerarNumeroBoleto() {
    let numero = '';
    for (let i = 0; i < 44; i++) {
        numero += Math.floor(Math.random() * 10);
    }
    
    return `${numero.substring(0, 5)}.${numero.substring(5, 10)}.${numero.substring(10, 15)}.${numero.substring(15, 20)}.${numero.substring(20)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const boletoIdElement = document.getElementById('boleto-id');
    boletoIdElement.textContent = gerarNumeroBoleto();

    document.querySelector('.copy.boleto').addEventListener('click', () => {
        navigator.clipboard.writeText(boletoIdElement.textContent);
    });
});