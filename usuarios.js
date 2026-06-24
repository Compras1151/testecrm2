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

const usuarioLogado = JSON.parse(
    localStorage.getItem('usuarioLogado')
);

if (
    !usuarioLogado ||
    usuarioLogado.cargo !== 'admin'
) {

    mostrarToast("Acesso permitido apenas para administrador");
    window.location.href = 'index.html';
}

let usuarios = JSON.parse(
    localStorage.getItem('usuariosCRM')
) || [];

const lista = document.getElementById('listaUsuarios');

function mostrarUsuarios() {

    lista.innerHTML = '';

    usuarios.forEach((usuario, index) => {

        const card = document.createElement('div');

        card.className = 'cliente-card';

        card.innerHTML = `
            <p><strong>Nome:</strong> ${usuario.nome}</p>
            <p><strong>Cargo:</strong> ${usuario.cargo}</p>
        `;

        // não deixa apagar admin
        if (usuario.cargo !== 'admin') {

            const btnExcluir =
                document.createElement('button');

            btnExcluir.innerText =
                '❌ Remover acesso';

            btnExcluir.onclick = () => {

                if (
                    confirm(
                        `Remover ${usuario.nome}?`
                    )
                ) {

                    usuarios.splice(index, 1);

                    localStorage.setItem(
                        'usuariosCRM',
                        JSON.stringify(usuarios)
                    );

                    mostrarUsuarios();
                }
            };

            card.appendChild(btnExcluir);
        }

        lista.appendChild(card);
    });
}

document
.getElementById('btnCadastrarUsuario')
.addEventListener('click', () => {

    const nome = document
        .getElementById('nomeUsuario')
        .value
        .trim();

    const senha = document
        .getElementById('senhaUsuario')
        .value
        .trim();

    if (!nome || !senha) {

        alert('Preencha todos os campos');
        return;
    }

    const jaExiste = usuarios.some(
        u => u.nome === nome
    );

    if (jaExiste) {

        alert('Usuário já existe');
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

    document.getElementById('nomeUsuario').value = '';
    document.getElementById('senhaUsuario').value = '';

    mostrarUsuarios();
});

mostrarUsuarios();
