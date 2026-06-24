const usuarioLogado = localStorage.getItem('usuarioLogado');

if (!usuarioLogado) {
    window.location.href = 'login.html';
}
let clientes = JSON.parse(localStorage.getItem('clientesCadastrados')) || [];
let excluidos = JSON.parse(localStorage.getItem('leadsExcluidos')) || [];

const listaClientes = document.getElementById('listaClientes');

function mostrarClientes() {

    function mostrarClientes() {

    // recarrega do localStorage toda vez
    clientes = JSON.parse(
        localStorage.getItem('clientesCadastrados')
    ) || [];

    listaClientes.innerHTML = '';

    clientes.forEach((cliente, index) => {

        const card = document.createElement('div');
        card.className = 'cliente-card';

        // =========================
        // BOTÃO EXCLUIR
        // =========================
        const btnExcluir = document.createElement('button');
        btnExcluir.className = 'btn-excluir';
        btnExcluir.innerHTML = '🗑️';
        btnExcluir.title = 'Excluir Cliente';

        btnExcluir.addEventListener('click', () => {

            if (confirm(`Tem certeza que deseja excluir ${cliente.nome}?`)) {

                excluidos.push({
                    ...cliente,
                    dataExclusao: new Date().toLocaleString('pt-BR')
                });

                localStorage.setItem(
                    'leadsExcluidos',
                    JSON.stringify(excluidos)
                );

                clientes.splice(index, 1);

                localStorage.setItem(
                    'clientesCadastrados',
                    JSON.stringify(clientes)
                );

                mostrarClientes();
            }
        });

        // =========================
        // STATUS
        // =========================
        const selectStatus = document.createElement('select');

        selectStatus.className = 'select-status';

        selectStatus.innerHTML = `
            <option value="lead">🟢 Lead</option>
            <option value="desclassificado">🔴 Desclassificado</option>
            <option value="proposta">🔵 Proposta Enviada</option>
            <option value="naoRespondeu">🟡 Não Respondeu</option>
            <option value="venda">⚫ Venda</option>
            <option value="semRetorno">🟣 Proposta sem Retorno</option>
        `;

        selectStatus.value = cliente.status || 'lead';

        selectStatus.addEventListener('change', () => {

            cliente.status = selectStatus.value;

            localStorage.setItem(
                'clientesCadastrados',
                JSON.stringify(clientes)
            );
        });

        // =========================
        // INFORMAÇÕES
        // =========================
        const infoNome = document.createElement('p');
        infoNome.innerHTML =
            `<strong>👤 Nome:</strong><br>${cliente.nome}`;

        const infoCidade = document.createElement('p');
        infoCidade.innerHTML =
            `<strong>📍 Cidade/Estado:</strong><br>${cliente.cidadeEstado || 'Não informado'}`;

        const infoTelefone = document.createElement('p');
        infoTelefone.innerHTML =
            `<strong>📞 Telefone:</strong><br>${cliente.telefone || 'Não informado'}`;

        const infoData = document.createElement('p');
        infoData.innerHTML =
            `<strong>📅 Cadastro:</strong><br>${cliente.dataCadastro || 'Não informado'}`;

        // =========================
        // WHATSAPP
        // =========================
        const linkWhats = document.createElement('a');

        let telefoneLimpo =
            (cliente.telefone || '').replace(/\D/g, '');

        if (
            telefoneLimpo.length >= 10 &&
            telefoneLimpo.length <= 11
        ) {
            telefoneLimpo = '55' + telefoneLimpo;
        }

        linkWhats.href = `https://wa.me/${telefoneLimpo}`;
        linkWhats.target = '_blank';
        linkWhats.className = 'btn-whatsapp';
        linkWhats.innerHTML = '💬 Chamar no WhatsApp';

        // =========================
        // HISTÓRICO
        // =========================
        const btnHistorico = document.createElement('a');

        btnHistorico.href = `historico.html?id=${index}`;
        btnHistorico.className = 'btn-historico';
        btnHistorico.innerHTML = '📋 Ver Histórico';

        // =========================
        // MONTAGEM DO CARD
        // =========================
        card.appendChild(btnExcluir);
        card.appendChild(selectStatus);
        card.appendChild(infoNome);
        card.appendChild(infoCidade);
        card.appendChild(infoTelefone);
        card.appendChild(infoData);
        card.appendChild(btnHistorico);
        card.appendChild(linkWhats);

        listaClientes.appendChild(card);
    });
}

if (listaClientes) {
    mostrarClientes();
}
