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

// =========================
// VERIFICA LOGIN
// =========================

const usuarioLogado = JSON.parse(
    localStorage.getItem('usuarioLogado')
);

if (!usuarioLogado) {
    window.location.href = 'login.html';
}

// =========================
// ESCONDE MENU USUÁRIOS
// =========================

const menuUsuarios =
    document.getElementById('menuUsuarios');

if (
    menuUsuarios &&
    usuarioLogado.cargo !== 'admin'
) {
    menuUsuarios.style.display = 'none';
}

// =========================
// CONTADOR DE EXCLUÍDOS
// =========================

function atualizarContadorExcluidos() {

    let excluidos =
        JSON.parse(
            localStorage.getItem('leadsExcluidos')
        ) || [];

    const el =
        document.getElementById(
            'contadorExcluidos'
        );

    if (el) {

        el.innerText =
            `🗑 Leads excluídos: ${excluidos.length}`;
    }
}

atualizarContadorExcluidos();

// =========================
// BOTÃO SAIR
// =========================

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
