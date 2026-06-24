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
