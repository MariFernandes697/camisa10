(function () {
    const form = document.getElementById('loginForm');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const btn = document.getElementById('submitBtn');
    const errUser = document.getElementById('error-username');
    const errPass = document.getElementById('error-password');
    const togglePassword = document.getElementById('togglePassword');
    const toggleIcon = document.getElementById('toggleIcon');


    function validateUsername(value) {
      if (!value || value.trim().length === 0) return 'Por favor, informe seu usuário.';
      if (value.trim().length < 3) return 'Precisa ter ao menos 3 caracteres.';
      return '';
    }
    function validatePassword(value) {
      if (!value || value.length === 0) return 'Por favor, informe sua senha.';
      if (value.length < 6) return 'Precisa ter ao menos 6 caracteres.';
      return '';
    }

    function showError(inputEl, errorEl, message) {
      if (message) {
        errorEl.textContent = message;
        inputEl.classList.add('is-invalid');
        inputEl.setAttribute('aria-invalid', 'true');
      } else {
        errorEl.textContent = '';
        inputEl.classList.remove('is-invalid');
        inputEl.removeAttribute('aria-invalid');
      }
    }

    username.addEventListener('input', () => {
      const msg = validateUsername(username.value);
      showError(username, errUser, msg);
    });
    password.addEventListener('input', () => {
      const msg = validatePassword(password.value);
      showError(password, errPass, msg);
    });

    togglePassword.addEventListener('click', () => {
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      const isHidden = type === 'password';
      toggleIcon.className = isHidden ? 'bi bi-eye-slash' : 'bi bi-eye';
      togglePassword.setAttribute('aria-label', isHidden ? 'Mostrar senha' : 'Esconder senha');
      togglePassword.title = isHidden ? 'Mostrar senha' : 'Esconder senha';
      password.focus();
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const userMsg = validateUsername(username.value);
      const passMsg = validatePassword(password.value);
      showError(username, errUser, userMsg);
      showError(password, errPass, passMsg);

      if (userMsg || passMsg) {
        if (userMsg) { username.focus(); }
        else { password.focus(); }
        return;
      }

      btn.disabled = true;
      const previousText = btn.textContent;
      btn.textContent = 'Entrando...';

      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = previousText;
      }, 800);
    });

    [username, password].forEach(el => el.addEventListener('focus', () => {
      const associatedErr = el.id === 'username' ? errUser : errPass;
      associatedErr.textContent = '';
      el.classList.remove('is-invalid');
    }));
  })();