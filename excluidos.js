const usuarioLogado = localStorage.getItem('usuarioLogado');

if (!usuarioLogado) {
    window.location.href = 'login.html';
}
let excluidos = JSON.parse(localStorage.getItem('leadsExcluidos')) || [];

const lista = document.getElementById('listaExcluidos');
const inputBusca = document.getElementById('buscaExcluidos');

// 🔍 BUSCA
if (inputBusca) {
    inputBusca.addEventListener('input', () => {
        mostrarExcluidos(inputBusca.value);
    });
}

// =========================
// FUNÇÃO PRINCIPAL
// =========================
function mostrarExcluidos(filtro = '') {

    lista.innerHTML = '';

    const excluidosFiltrados = excluidos.filter(cliente =>
        (cliente.nome || '').toLowerCase().includes(filtro.toLowerCase()) ||
        (cliente.telefone || '').includes(filtro)
    );

    excluidosFiltrados.forEach((cliente) => {

        const card = document.createElement('div');
        card.className = 'cliente-card';

        card.innerHTML = `
            <p><strong>👤 Nome:</strong> ${cliente.nome || 'Não informado'}</p>
            <p><strong>📞 Telefone:</strong> ${cliente.telefone || 'Não informado'}</p>
            <p><strong>📍 Cidade:</strong> ${cliente.cidadeEstado || 'Não informado'}</p>
            <p><strong>🗑 Excluído em:</strong> ${cliente.dataExclusao || 'Não informado'}</p>
        `;

        // =========================
        // ♻ RESTAURAR
        // =========================
        const btnRestaurar = document.createElement('button');
        btnRestaurar.innerText = '♻ Restaurar';

        btnRestaurar.onclick = () => {

            let clientes = JSON.parse(
                localStorage.getItem('clientesCadastrados')
            ) || [];

            const jaExiste = clientes.some(
                c => c.telefone === cliente.telefone
            );

            if (jaExiste) {
                alert('Esse cliente já existe na lista ativa!');
                return;
            }

            // adiciona na lista principal
            clientes.push(cliente);

            localStorage.setItem(
                'clientesCadastrados',
                JSON.stringify(clientes)
            );

            // remove da lixeira pela posição real
            const posicaoReal = excluidos.findIndex(
                c => c.telefone === cliente.telefone
            );

            if (posicaoReal !== -1) {
                excluidos.splice(posicaoReal, 1);

                localStorage.setItem(
                    'leadsExcluidos',
                    JSON.stringify(excluidos)
                );
            }

            alert('♻ Cliente restaurado com sucesso!');

            mostrarExcluidos(inputBusca?.value || '');
        };

        // =========================
        // ❌ EXCLUIR DEFINITIVO
        // =========================
        const btnExcluirDefinitivo = document.createElement('button');
        btnExcluirDefinitivo.innerText = '❌ Excluir definitivo';

        btnExcluirDefinitivo.onclick = () => {

            if (!confirm('Excluir permanentemente este cliente?')) {
                return;
            }

            const posicaoReal = excluidos.findIndex(
                c => c.telefone === cliente.telefone
            );

            if (posicaoReal !== -1) {

                excluidos.splice(posicaoReal, 1);

                localStorage.setItem(
                    'leadsExcluidos',
                    JSON.stringify(excluidos)
                );
            }

            mostrarExcluidos(inputBusca?.value || '');
        };

        // =========================
        // ÁREA DOS BOTÕES
        // =========================
        const areaBotoes = document.createElement('div');
        areaBotoes.className = 'area-botoes';

        areaBotoes.appendChild(btnRestaurar);
        areaBotoes.appendChild(btnExcluirDefinitivo);

        card.appendChild(areaBotoes);

        lista.appendChild(card);
    });
}

// inicializa
mostrarExcluidos();
