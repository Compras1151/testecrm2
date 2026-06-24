document.addEventListener('DOMContentLoaded', () => {

    let clientes = JSON.parse(localStorage.getItem('clientesCadastrados')) || [];

    const inputNome = document.getElementById('nome');
    const inputCidadeEstado = document.getElementById('cidadeEstado');
    const inputTelefone = document.getElementById('telefone');
    const btnSalvar = document.getElementById('btnSalvar');

    if (!btnSalvar) {
        console.log("Botão não encontrado");
        return;
    }

    btnSalvar.addEventListener('click', () => {

        const nome = inputNome.value.trim();
        const cidadeEstado = inputCidadeEstado.value.trim();
        const telefone = inputTelefone.value.trim().replace(/\D/g, '');

        if (!nome || !cidadeEstado || !telefone) {
            alert('Preencha todos os campos!');
            return;
        }

        clientes.push({
            nome,
            cidadeEstado,
            telefone,
            historico: '',
            dataCadastro: new Date().toLocaleDateString('pt-BR'),
            status: 'lead'
        });

        localStorage.setItem('clientesCadastrados', JSON.stringify(clientes));

        inputNome.value = '';
        inputCidadeEstado.value = '';
        inputTelefone.value = '';

        alert('Cliente cadastrado com sucesso!');
    });

});
