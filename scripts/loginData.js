// Validação do login e cadastro
document.addEventListener('DOMContentLoaded', function() {

  const signupForm = document.getElementById('signup-form');
  const loginForm = document.getElementById('login-form');

  //Cadastro
  if (signupForm) {
      signupForm.addEventListener('submit', function(e) {
          e.preventDefault();

          const username = document.getElementById('username').value.trim();
          const email = document.getElementById('email').value.trim();
          const password = document.getElementById('password').value;

          //Adicionando os dados no LocalStorage do navegador, só para
          //simular uma conexão com um banco de dados
          if (localStorage.getItem(email)) {
              alert('Usuário já registrado!');
          } else {
              const userData = {
                  username: username,
                  email: email,
                  password: password
              };
              localStorage.setItem(email, JSON.stringify(userData));
              window.location.href = 'cart.html';
          }
      });
  }

  //Login
  if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
          e.preventDefault();

          const loginEmail = document.getElementById('login-email').value.trim();
          const loginPassword = document.getElementById('login-password').value;

          const storedUserData = localStorage.getItem(loginEmail);

          // Validando para saber se o email existe a senha é a mesma
          if (storedUserData) {
              const userData = JSON.parse(storedUserData);

              if (userData.password === loginPassword) {
                  window.location.href = 'cart.html'; 
              } else {
                  alert('Usuário ou senha incorretos!');
              }
          } else {
              alert('Usuário não encontrado!');
          }
      });
  } 

  // Validação da senha (se possui todos os parâmetros necessários)
  const passwordInput = document.getElementById('password');

  if (passwordInput) {
      passwordInput.addEventListener('input', function() {
          const password = passwordInput.value;
          const missingTerms = [];

          //Quando falta um dos termos, a mensagem (title) do HTML é
          //atualizada dinamicamente enquanto o usuário digita.
          if (!/[a-z]/.test(password)) {
              missingTerms.push("letras minúsculas");
          }
          if (!/[A-Z]/.test(password)) {
              missingTerms.push("letras maiúsculas");
          }
          if (!/\d/.test(password)) {
              missingTerms.push("números");
          }
          if (!/[@$!%*?&]/.test(password)) {
              missingTerms.push("caracteres especiais (@$!%*?&)");
          }

          //Arrumando a sintaxe para o último elemento possuir um ponto
          //final, o penultimo um "e" e os outros uma vírgula
          let message = "A senha deve conter de 6 a 10 caracteres, incluindo ";
          if (missingTerms.length === 1) {
              message += missingTerms[0] + ".";
          } else if (missingTerms.length === 2) {
              message += missingTerms.join(" e ") + ".";
          } else if (missingTerms.length > 2) {
              const lastTerm = missingTerms.pop(); 
              message += missingTerms.join(", ") + " e " + lastTerm + ".";
          }

          passwordInput.title = message;
      });
    }
});
