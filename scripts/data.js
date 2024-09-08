document.addEventListener('DOMContentLoaded', function() {
  ('DOM completamente carregado e analisado');

  // Validação do login e cadastro
  const signupForm = document.getElementById('signup-form');
  const loginForm = document.getElementById('login-form');

  if (signupForm) {
      ('Signup form encontrado');
      signupForm.addEventListener('submit', function(e) {
          e.preventDefault();

          const username = document.getElementById('username').value.trim();
          const email = document.getElementById('email').value.trim();
          const password = document.getElementById('password').value;

          if (localStorage.getItem(email)) {
              alert('Usuário já registrado!');
          } else {
              const userData = {
                  username: username,
                  email: email,
                  password: password
              };
              ('Armazenando usuário:', userData);
              localStorage.setItem(email, JSON.stringify(userData));
              window.location.href = 'cart.html';
          }
      });
  } else {
      ('Signup form não encontrado');
  }

  if (loginForm) {
      ('Login form encontrado');
      loginForm.addEventListener('submit', function(e) {
          e.preventDefault();

          const loginEmail = document.getElementById('login-email').value.trim();
          const loginPassword = document.getElementById('login-password').value;

          const storedUserData = localStorage.getItem(loginEmail);

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

  // Validação da senha
  const passwordInput = document.getElementById('password');

  if (passwordInput) {
      passwordInput.addEventListener('input', function() {
          const password = passwordInput.value;
          const missingTerms = [];

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
  } else {
      ('Password input não encontrado');
  }
});
