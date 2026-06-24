let excluidos = JSON.parse(localStorage.getItem('leadsExcluidos')) || [];

const lista = document.getElementById('listaExcluidos');

function mostrarExcluidos() {
    lista.innerHTML = '';

    excluidos.forEach((cliente, index) => {

        const card = document.createElement('div');
        card.className = 'cliente-card';

        card.innerHTML = `
            <p><strong>👤 Nome:</strong> ${cliente.nome}</p>
            <p><strong>📞 Telefone:</strong> ${cliente.telefone}</p>
            <p><strong>📍 Cidade:</strong> ${cliente.cidadeEstado}</p>
            <p><strong>🗑 Excluído em:</strong> ${cliente.dataExclusao}</p>
        `;

        // BOTÃO RESTAURAR
        const btnRestaurar = document.createElement('button');
        btnRestaurar.innerText = '♻ Restaurar';

        btnRestaurar.onclick = () => {

            let clientes = JSON.parse(localStorage.getItem('clientesCadastrados')) || [];

            // 🔎 VERIFICA SE JÁ EXISTE
            const jaExiste = clientes.some(c => c.telefone === cliente.telefone);

            if (jaExiste) {
                alert("Esse cliente já existe na lista ativa!");
                return;
            }

            // ♻ RESTAURA
            clientes.push(cliente);
            localStorage.setItem('clientesCadastrados', JSON.stringify(clientes));

            // 🗑 REMOVE DA LIXEIRA
            excluidos.splice(index, 1);
            localStorage.setItem('leadsExcluidos', JSON.stringify(excluidos));

            mostrarExcluidos();
        };

        card.appendChild(btnRestaurar);
        lista.appendChild(card);
    });
}

mostrarExcluidos();
