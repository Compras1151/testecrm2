const usuarios = [
    {
        nome: "Letícia de Avila Dalpra",
        senha: "Leticia27/12/2007"
    },
    {
        nome: "Isael",
        senha: "Isael03/09"
    },
    {
        nome: "Ismael Maikon Junckes",
        senha: "Ismael27/07"
    },
    {
        nome: "Mateus",
        senha: "Mateus2026"
    }
];

document.getElementById('btnEntrar').addEventListener('click', () => {

    const usuario = document.getElementById('usuario').value.trim();
    const senha = document.getElementById('senha').value;

    const encontrado = usuarios.find(
        u => u.nome === usuario && u.senha === senha
    );

    if (encontrado) {

        localStorage.setItem(
            'usuarioLogado',
            JSON.stringify(encontrado)
        );

        window.location.href = 'index.html';

    } else {

        alert('Usuário ou senha inválidos');

    }

});
