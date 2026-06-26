function mostrarToast(mensagem, tipo = "sucesso") {

    const container =
        document.getElementById(
            'toast-container'
        );

    if (!container) {
        alert(mensagem);
        return;
    }

    const toast =
        document.createElement('div');

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
const usuarioLogado = {
    nome: "Administrador",
    cargo: "admin"
};

// =========================
// BOAS-VINDAS
// =========================

const bemVindo =
    document.getElementById('bemVindo');

if (bemVindo && usuarioLogado) {

    bemVindo.innerHTML = `
        <h3>
            Bem-vindo,
            ${usuarioLogado.nome}
        </h3>
        <p>
            Cargo:
            ${usuarioLogado.cargo}
        </p>
    `;
}

// =========================
// ESCONDE MENU USUÁRIOS
// =========================

const menuUsuarios =
    document.getElementById(
        'menuUsuarios'
    );

if (
    menuUsuarios &&
    usuarioLogado.cargo !== 'admin'
) {
    menuUsuarios.style.display = 'none';
}

// =========================
// CONTADOR EXCLUÍDOS
// =========================

function atualizarContadorExcluidos() {

    const excluidos =
        JSON.parse(
            localStorage.getItem(
                'leadsExcluidos'
            )
        ) || [];

    const contador =
        document.getElementById(
            'contadorExcluidos'
        );

    if (contador) {

        contador.innerText =
            `🗑 Leads excluídos: ${excluidos.length}`;
    }
}

atualizarContadorExcluidos();

// =========================
// SAIR
// =========================

const btnSair =
    document.getElementById(
        'btnSair'
    );

if (btnSair) {

    btnSair.addEventListener(
        'click',
        () => {

            localStorage.removeItem(
                'usuarioLogado'
            );

            mostrarToast(
                'Logout realizado!'
            );

            setTimeout(() => {

                window.location.href =
                    'login.html';

            }, 500);
        }
    );
}
