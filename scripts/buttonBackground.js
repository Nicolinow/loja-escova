function changeBackgroundColor() {
    var button = document.querySelector('.copy');
        button.classList.add('active');
        button.innerHTML = 'Copiado!';
    setTimeout(function() {
        button.classList.remove('active');
        button.style.backgroundColor = '#eeeeee';
        button.innerHTML = 'Copiar';
    }, 300);

    var colors = ['#ffeab0', '#ffc3a7', '#ffa9ce', '#cca8ff', '#a4c9ff'];
    var currentColor = button.style.backgroundColor;
    var newColor = colors[Math.floor(Math.random() * colors.length)];

    while (newColor === currentColor) {
        newColor = colors[Math.floor(Math.random() * colors.length)];
    }

    button.style.backgroundColor = newColor;
}