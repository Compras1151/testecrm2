document.addEventListener('DOMContentLoaded', () => {

    // cria admin automaticamente na primeira vez
    let usuarios = JSON.parse(localStorage.getItem('usuariosCRM'));

    if (!usuarios) {

        usuarios = [
            {
                nome: "Administrador",
                senha: "123456",
                cargo: "admin"
            }
        ];

        localStorage.setItem(
            'usuariosCRM',
            JSON.stringify(usuarios)
        );
    }

    const btnEntrar = document.getElementById('btnEntrar');

    btnEntrar.addEventListener('click', () => {

        const nome = document
            .getElementById('usuario')
            .value
            .trim();

        const senha = document
            .getElementById('senha')
            .value;

        const usuario = usuarios.find(
            u =>
                u.nome === nome &&
                u.senha === senha
        );

        if (!usuario) {

            alert('Usuário ou senha inválidos');
            return;
        }

        localStorage.setItem(
            'usuarioLogado',
            JSON.stringify(usuario)
        );

        window.location.href = 'index.html';
    });

});
