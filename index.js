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

const usuarioLogado = localStorage.getItem('usuarioLogado');

if (!usuarioLogado) {
    window.location.href = 'login.html';
}
function atualizarContadorExcluidos() {
    let excluidos = JSON.parse(localStorage.getItem('leadsExcluidos')) || [];

    const el = document.getElementById('contadorExcluidos');
    if (el) {
        el.innerText = `🗑 Leads excluídos: ${excluidos.length}`;
    }
}

atualizarContadorExcluidos();

const btnSair =
document.getElementById('btnSair');

if (btnSair) {

    btnSair.addEventListener('click', () => {

        localStorage.removeItem(
            'usuarioLogado'
        );

        window.location.href =
            'login.html';
    });
}
