const usuarios = [
    {
        nome: "João Silva",
        senha: "123456"
    },
    {
        nome: "Maria Oliveira",
        senha: "abc123"
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
