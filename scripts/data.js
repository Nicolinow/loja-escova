document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            console.log('Tentando registrar:', username, email, password);

            if (localStorage.getItem(username)) {
                alert('Usuário já registrado!');
            } else {
                const userData = {
                    email: email,
                    password: password
                };
                localStorage.setItem(username, JSON.stringify(userData));
                window.location.href = 'cart.html';
            }

        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const loginEmail = document.getElementById('login-email').value.trim();
            const loginPassword = document.getElementById('login-password').value;

            console.log('Tentando login:', loginEmail, loginPassword);

            const storedUserData = localStorage.getItem(loginEmail);

            if (storedUserData) {
                const userData = JSON.parse(storedUserData);
                console.log('Dados do usuário encontrados:', userData);

                if (userData.password === loginPassword) {
                    window.location.href = 'cart.html'; 
                } else {
                    alert('Senha incorreta!');
                }
            } else {
                alert('Usuário não encontrado!');
            }

        });
    }
});
