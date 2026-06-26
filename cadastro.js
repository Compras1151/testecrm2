const usuarioLogado = {
    nome: "Administrador",
    cargo: "admin"
};
}
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
                   mostrarToast("Preencha todos os campos!");
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

       mostrarToast("Cliente cadastrado com sucesso!");
    });

});
