// Validação do formulário
(function(){

    // definindo as variáveis
    const form = document.getElementById('form-contato');
    const feedback = document.getElementById('feedback');
    const botaoLimpar = document.getElementById('limpar');
    const recipient = 'camisa10@gmail.com';

    if (!form) return;

    function mostrarErro(field, mensagem){
        const span = form.querySelector('.erro[data-for="' + field + '"]');
        if(span) span.textContent = mensagem;
    }

    function limparErros(){
        form.querySelectorAll('.erro').forEach( e => e.textContent = '' );
    }

    function validarEmail(email){
        return /^\S+@\S+\.\S+$/.test(email);
    }

    function validar(data){
        let valido = true;
        limparErros();

        if(!data.nome || data.nome.trim().length < 2){
            mostrarErro('nome', '(3 caracteres no mínimo).');
            valido = false;
        }

        if(!data.email || !validarEmail(data.email)){
            mostrarErro('email', 'Email inválido.');
            valido = false;
        }

        if(!data.mensagem || data.mensagem.trim().length < 10){
            mostrarErro('mensagem', 'Mensagem muito curta.');
            valido = false;
        }

        return valido;
    }

    function linkFormulario(data){
        const assunto = encodeURIComponent('[Contato Camisa 10] ' + (data.assunto || ''));
        const linhaLink = [
            `Nome: ${data.nome}`,
            `Email: ${data.email}`,
            `Categoria: ${data.categoria || '—'}`,
            '',
            data.mensagem
        ];
        const corpo = encodeURIComponent(linhaLink.join('\n'));
        return `mailto:${recipient}?subject=${assunto}&body=${corpo}`;
    }

    form.addEventListener('submit', function(l){
        l.preventDefault();
        feedback.textContent = '';
        feedback.style.color = '';

        const formData = {
            nome: form.nome.value.trim(),
            email: form.email.value.trim(),
            mensagem: form.mensagem.value.trim()
        };

        if(!validar(formData)){
            feedback.style.color = '#b00020';
            feedback.textContent = 'Corrija os campos destacados.';
            return;
        }

        const mailto = linkFormulario(formData);
        window.location.href = mailto;

        feedback.style.color = '#0a7';
        feedback.textContent = 
            'O e-mail foi aberto com sua mensagem. Caso não abra, copie o texto e envie manualmente para ' 
            + recipient + '.';
    });

    botaoLimpar.addEventListener('click', function(){
        limparErros();
        form.reset();
        feedback.textContent = '';
    });

})();
