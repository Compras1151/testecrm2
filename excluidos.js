let excluidos = JSON.parse(localStorage.getItem('leadsExcluidos')) || [];

const lista = document.getElementById('listaExcluidos');
const inputBusca = document.getElementById('buscaExcluidos');

// 🔍 BUSCA
inputBusca.addEventListener('input', () => {
    mostrarExcluidos(inputBusca.value);
});

// =========================
// FUNÇÃO PRINCIPAL
// =========================
function mostrarExcluidos(filtro = '') {
    lista.innerHTML = '';

    excluidos
        .filter(cliente =>
            cliente.nome.toLowerCase().includes(filtro.toLowerCase()) ||
            cliente.telefone.includes(filtro)
        )
        .forEach((cliente, index) => {

            const card = document.createElement('div');
            card.className = 'cliente-card';

            card.innerHTML = `
                <p><strong>👤 Nome:</strong> ${cliente.nome}</p>
                <p><strong>📞 Telefone:</strong> ${cliente.telefone}</p>
                <p><strong>📍 Cidade:</strong> ${cliente.cidadeEstado}</p>
                <p><strong>🗑 Excluído em:</strong> ${cliente.dataExclusao || 'Não informado'}</p>
            `;

            // =========================
            // ♻ BOTÃO RESTAURAR
            // =========================
            const btnRestaurar = document.createElement('button');
            btnRestaurar.innerText = '♻ Restaurar';

            btnRestaurar.onclick = () => {

                let clientes = JSON.parse(localStorage.getItem('clientesCadastrados')) || [];

                const jaExiste = clientes.some(c => c.telefone === cliente.telefone);

                if (jaExiste) {
                    alert("Esse cliente já existe na lista ativa!");
                    return;
                }

                clientes.push(cliente);
                localStorage.setItem('clientesCadastrados', JSON.stringify(clientes));

                excluidos.splice(index, 1);
                localStorage.setItem('leadsExcluidos', JSON.stringify(excluidos));

                mostrarExcluidos();
            };

            // =========================
            // ❌ BOTÃO EXCLUIR DEFINITIVO
            // =========================
            const btnExcluirDefinitivo = document.createElement('button');
            btnExcluirDefinitivo.innerText = '❌ Excluir definitivo';
            btnExcluirDefinitivo.style.marginLeft = '10px';

            btnExcluirDefinitivo.onclick = () => {
                if (confirm("Excluir permanentemente este cliente?")) {

                    excluidos.splice(index, 1);
                    localStorage.setItem('leadsExcluidos', JSON.stringify(excluidos));

                    mostrarExcluidos();
                }
            };

            // =========================
            // ADICIONA NO CARD
            // =========================
            card.appendChild(btnRestaurar);
            card.appendChild(btnExcluirDefinitivo);

            lista.appendChild(card);
        });
}

// inicializa
mostrarExcluidos();
