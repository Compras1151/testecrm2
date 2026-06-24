const usuarioLogado = localStorage.getItem('usuarioLogado');

if (!usuarioLogado) {
    window.location.href = 'login.html';
}
const params = new URLSearchParams(window.location.search);
const clienteIndex = params.get('id');

let clientes = JSON.parse(
localStorage.getItem('clientesCadastrados')
) || [];

const cliente = clientes[clienteIndex];

const nomeCliente = document.getElementById('nomeCliente');
const btnSalvar = document.getElementById('salvarHistorico');

if (!cliente) {

```
nomeCliente.innerHTML = 'Cliente não encontrado';
```

} else 
nomeCliente.innerHTML =
    `📋 Histórico - ${cliente.nome}`;

// Cria estrutura padrão caso não exista
if (
    !cliente.historico ||
    typeof cliente.historico !== 'object'
) {
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

// Carrega os dados salvos
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

btnSalvar.addEventListener('click', () => {

    cliente.historico = {
        endereco:
            document.getElementById('endereco').value,

        situacaoObra:
            document.getElementById('situacaoObra').value,

        projetoArquitetonico:
            document.getElementById('projetoArquitetonico').value,

        linhaInteresse:
            document.getElementById('linhaInteresse').value,

        Outro:
            document.getElementById('Outro').value,

        Profundidade:
            document.getElementById('Profundidade').value,

        Largura:
            document.getElementById('Largura').value,

        Comprimento:
            document.getElementById('Comprimento').value,

        Valor:
            document.getElementById('Valor').value,

        dataProposta:
            document.getElementById('dataProposta').value,

        dataRetorno:
            document.getElementById('dataRetorno').value,

        observacoes:
            document.getElementById('observacoes').value
    };

    localStorage.setItem(
        'clientesCadastrados',
        JSON.stringify(clientes)
    );

    alert('Histórico salvo com sucesso!');
});
