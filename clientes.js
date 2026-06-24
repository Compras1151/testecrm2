let clientes = JSON.parse(localStorage.getItem('clientesCadastrados')) || [];
let excluidos = JSON.parse(localStorage.getItem('leadsExcluidos')) || [];

const listaClientes = document.getElementById('listaClientes');

function mostrarClientes() {

    listaClientes.innerHTML = '';

    clientes.forEach((cliente, index) => {

        const card = document.createElement('div');
        card.className = 'cliente-card';

        // EXCLUIR
        const btnExcluir = document.createElement('button');
        btnExcluir.innerText = '🗑 Excluir';

        btnExcluir.onclick = () => {

            if (confirm(`Excluir ${cliente.nome}?`)) {

                excluidos.push({
                    ...cliente,
                    dataExclusao: new Date().toLocaleString()
                });

                clientes.splice(index, 1);

                localStorage.setItem('clientesCadastrados', JSON.stringify(clientes));
                localStorage.setItem('leadsExcluidos', JSON.stringify(excluidos));

                mostrarClientes();
            }
        };

        // INFO
        card.innerHTML = `
            <p><strong>${cliente.nome}</strong></p>
            <p>${cliente.telefone}</p>
            <p>${cliente.cidadeEstado}</p>
        `;

        card.prepend(btnExcluir);
        listaClientes.appendChild(card);
    });
}

mostrarClientes();
