function mostrarToast(mensagem, tipo = "sucesso") {

    const container = document.getElementById('toast-container');

    const toast = document.createElement('div');

    toast.className = `toast ${tipo}`;
    toast.innerText = mensagem;

    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}
document.addEventListener('DOMContentLoaded', () => {

    let usuarios = JSON.parse(localStorage.getItem('usuariosCRM'));

    const usuario = usuarios.find(u =>
    u.nome.toLowerCase() === nome.toLowerCase() &&
    u.senha === senha
);

console.log("Digitado:", nome, senha);
console.log("Usuários:", usuarios);
console.log("Encontrado:", usuario);

    // cria admin se não existir nada
    if (!usuarios || usuarios.length === 0) {

        usuarios = [
            {
                nome: "Admin",
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

        const nome = document.getElementById('usuario').value.trim();
        const senha = document.getElementById('senha').value.trim();

        const usuario = usuarios.find(u =>
            u.nome.toLowerCase() === nome.toLowerCase() &&
            u.senha === senha
        );

        if (!usuario) {
mostrarToast("Usuário ou senha inválidos!"); 
            return;
        }

        localStorage.setItem(
            'usuarioLogado',
            JSON.stringify(usuario)
        );

        window.location.href = 'index.html';
    });

});
