// =====================================
// VERIFICA LOGIN E PERMISSÃO
// =====================================

const usuarioLogado = JSON.parse(
    localStorage.getItem('usuarioLogado')
);

if (!usuarioLogado) {
    window.location.href = 'login.html';
}

// SOMENTE ADMIN PODE ACESSAR
if (usuarioLogado.cargo !== 'admin') {

    alert('Acesso permitido apenas para administradores.');

    window.location.href = 'index.html';

    throw new Error('Acesso negado');
}

// =====================================
// TOAST
// =====================================

function mostrarToast(mensagem, tipo = "sucesso") {

    const container =
        document.getElementById('toast-container');

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

// =====================================
// CARREGA USUÁRIOS
// =====================================

let usuarios = JSON.parse(
    localStorage.getItem('usuariosCRM')
) || [];

if (usuarios.length === 0) {

    usuarios.push({
        nome: 'Admin',
        senha: '123456',
        cargo: 'admin'
    });

    localStorage.setItem(
        'usuariosCRM',
        JSON.stringify(usuarios)
    );
}

const lista =
    document.getElementById('listaUsuarios');

// =====================================
// LISTA USUÁRIOS
// =====================================

function mostrarUsuarios() {

    lista.innerHTML = '';

    usuarios.forEach((usuario, index) => {

        const card =
            document.createElement('div');

        card.className = 'cliente-card';

        card.innerHTML = `
            <p><strong>👤 Nome:</strong> ${usuario.nome}</p>
            <p><strong>🔑 Cargo:</strong> ${usuario.cargo}</p>
        `;

        // NÃO PERMITE EXCLUIR ADMIN
        if (usuario.cargo !== 'admin') {

            const btnExcluir =
                document.createElement('button');

            btnExcluir.innerText =
                '❌ Remover acesso';

            btnExcluir.onclick = () => {

                if (
                    confirm(
                        `Remover acesso de ${usuario.nome}?`
                    )
                ) {

                    usuarios.splice(index, 1);

                    localStorage.setItem(
                        'usuariosCRM',
                        JSON.stringify(usuarios)
                    );

                    mostrarToast(
                        'Usuário removido com sucesso!',
                        'sucesso'
                    );

                    mostrarUsuarios();
                }
            };

            card.appendChild(btnExcluir);
        }

        lista.appendChild(card);
    });
}

// =====================================
// CADASTRAR USUÁRIO
// =====================================

const btnCadastrar =
    document.getElementById(
        'btnCadastrarUsuario'
    );

if (btnCadastrar) {

    btnCadastrar.addEventListener(
        'click',
        () => {

            const nome =
                document
                    .getElementById(
                        'nomeUsuario'
                    )
                    .value
                    .trim();

            const senha =
                document
                    .getElementById(
                        'senhaUsuario'
                    )
                    .value
                    .trim();

            if (!nome || !senha) {

                mostrarToast(
                    'Preencha todos os campos!',
                    'erro'
                );

                return;
            }

            const jaExiste =
                usuarios.some(
                    usuario =>
                        usuario.nome
                            .toLowerCase() ===
                        nome.toLowerCase()
                );

            if (jaExiste) {

                mostrarToast(
                    'Usuário já cadastrado!',
                    'erro'
                );

                return;
            }

            usuarios.push({
                nome,
                senha,
                cargo: 'funcionario'
            });

            localStorage.setItem(
                'usuariosCRM',
                JSON.stringify(usuarios)
            );

            document.getElementById(
                'nomeUsuario'
            ).value = '';

            document.getElementById(
                'senhaUsuario'
            ).value = '';

            mostrarToast(
                'Usuário cadastrado com sucesso!',
                'sucesso'
            );

            mostrarUsuarios();
        }
    );
}

// =====================================
// INICIA
// =====================================

mostrarUsuarios();
