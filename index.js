// Carrega os clientes salvos ou inicia uma lista totalmente vazia
let clientes = JSON.parse(localStorage.getItem('clientesCadastrados')) || [];
let excluidos = JSON.parse(localStorage.getItem('leadsExcluidos')) || [];


// LÓGICA DA PÁGINA DE CADASTRO (index.html)
const inputNome = document.getElementById('nome');
const inputCidadeEstado = document.getElementById('cidadeEstado');
const inputTelefone = document.getElementById('telefone'); 
const btnSalvar = document.getElementById('btnSalvar');

if (btnSalvar) {
    btnSalvar.addEventListener('click', () => {
        const nome = inputNome.value.trim();
        const cidadeEstado = inputCidadeEstado.value.trim();
        // Remove espaços ou traços caso o usuário digite
        const telefone = inputTelefone.value.trim().replace(/\D/g, ''); 

        if (nome === '' || cidadeEstado === '' || telefone === '') {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        const agora = new Date();

const novoCliente = {
    nome: nome,
    cidadeEstado: cidadeEstado,
    telefone: telefone,
    historico: '',
    dataCadastro: agora.toLocaleDateString('pt-BR'),
    status: 'lead'
};
        clientes.push(novoCliente);
        
        localStorage.setItem('clientesCadastrados', JSON.stringify(clientes));
        
        inputNome.value = '';
        inputCidadeEstado.value = '';
        inputTelefone.value = '';
        
        alert('Cliente cadastrado com sucesso! Clique no card abaixo para visualizar.');
    });
}

function mostrarClientes() {
    listaClientes.innerHTML = '';

    clientes.forEach((cliente, index) => {

        const card = document.createElement('div');
        card.className = 'cliente-card';

        // =====================
        // BOTÃO EXCLUIR
        // =====================
        const btnExcluir = document.createElement('button');
        btnExcluir.innerText = '🗑 Excluir';
        btnExcluir.className = 'btn-excluir';

        btnExcluir.addEventListener('click', () => {

            if (confirm(`Tem certeza que deseja excluir ${cliente.nome}?`)) {

                excluidos.push({
                    ...cliente,
                    dataExclusao: new Date().toLocaleString()
                });

                localStorage.setItem('leadsExcluidos', JSON.stringify(excluidos));

                clientes.splice(index, 1);
                localStorage.setItem('clientesCadastrados', JSON.stringify(clientes));

                mostrarClientes();
            }
        });

        // =====================
        // STATUS
        // =====================
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
            localStorage.setItem('clientesCadastrados', JSON.stringify(clientes));
        });

        // =====================
        // INFO
        // =====================
        const infoNome = document.createElement('p');
        infoNome.innerHTML = `<strong>👤 Nome:</strong><br>${cliente.nome}`;

        const infoCidade = document.createElement('p');
        infoCidade.innerHTML = `<strong>📍 Cidade:</strong><br>${cliente.cidadeEstado}`;

        const infoTelefone = document.createElement('p');
        infoTelefone.innerHTML = `<strong>📞 Tel:</strong> ${cliente.telefone}`;

        const infoData = document.createElement('p');
        infoData.innerHTML = `<strong>📅 Cadastro:</strong> ${cliente.dataCadastro}`;

        // =====================
        // WHATSAPP
        // =====================
        const linkWhats = document.createElement('a');

        let telefoneLimpo = cliente.telefone.replace(/\D/g, '');

        if (telefoneLimpo.length <= 11) {
            telefoneLimpo = '55' + telefoneLimpo;
        }

        linkWhats.href = `https://wa.me/${telefoneLimpo}`;
        linkWhats.target = "_blank";
        linkWhats.className = "btn-whatsapp";
        linkWhats.innerText = "💬 Chamar no WhatsApp";

        // =====================
        // HISTÓRICO
        // =====================
        const btnHistorico = document.createElement('a');
        btnHistorico.href = `historico.html?id=${index}`;
        btnHistorico.className = 'btn-historico';
        btnHistorico.innerText = '📋 Ver Histórico';

        // =====================
        // MONTAGEM DO CARD
        // =====================
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

mostrarClientes();
function abrirHistorico(index) {
    const cliente = clientes[index];

    if (!cliente.historico) {
    cliente.historico = {
        endereco: '',
        situacaoObra: '',
        projetoArquitetonico: '',
       linhaInteresse: '',
        Outro: '',
        Profundidade: '',
        Largura: '',
        Comprimento: '',
        Valor: '',
        dataProposta: '',
        dataRetorno: '',
        observacoes: ''
    };
}

document.getElementById('endereco').value =
    cliente.historico.endereco || '';

document.getElementById('situacaoObra').value =
    cliente.historico.situacaoObra || '';

document.getElementById('projetoArquitetonico').value =
    cliente.historico.projetoArquitetonico || '';

  document.getElementById('linhaInteresse').value =
    cliente.historico.linhaInteresse || '';

document.getElementById('Outro').value =
    cliente.historico.Outro || '';

document.getElementById('Profundidade').value =
    cliente.historico.Profundidade || '';

document.getElementById('Largura').value =
    cliente.historico.Largura || '';

document.getElementById('Comprimento').value =
    cliente.historico.Comprimento || '';

document.getElementById('Valor').value =
    cliente.historico.Valor || '';

document.getElementById('dataProposta').value =
    cliente.historico.dataProposta || '';

document.getElementById('dataRetorno').value =
    cliente.historico.dataRetorno || '';

document.getElementById('observacoes').value =
    cliente.historico.observacoes || '';

    const historicoAtual = cliente.historico.join('\n');

    const novoHistorico = prompt(
        `Histórico de ${cliente.nome}\n\nEdite ou adicione novas observações:`,
        historicoAtual
    );

    if (novoHistorico !== null) {
        cliente.historico = novoHistorico
            .split('\n')
            .filter(linha => linha.trim() !== '');

        localStorage.setItem(
            'clientesCadastrados',
            JSON.stringify(clientes)
        );

        alert('Histórico salvo com sucesso!');
    }
}
