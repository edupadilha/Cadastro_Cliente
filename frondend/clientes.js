const api = 'http://localhost:3000/clientes';
const lista = document.getElementById('lista');

// Referências aos campos do formulário (ajuste os IDs se forem diferentes)
const formEdicao = document.getElementById('formEdicao');
const id = document.getElementById('id');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const telefone = document.getElementById('telefone');
const endereco = document.getElementById('endereco');

function limparCampos() {
    if (id) id.value = '';
    nome.value = '';
    email.value = '';
    telefone.value = '';
    endereco.value = '';
}

function carregar() {
    const nomeBusca = document.getElementById('busca')?.value || '';

    fetch(`${api}?nome=${encodeURIComponent(nomeBusca)}`)
        .then(res => {
            if (!res.ok) throw new Error('Erro ao buscar clientes');
            return res.json();
        })
        .then(dados => {
            lista.innerHTML = "";
            if (dados.length === 0) {
                lista.innerHTML = `<tr><td colspan="3" style="text-align:center;">Nenhum cliente encontrado</td></tr>`;
                return;
            }
            dados.forEach(c => {
                lista.innerHTML += `
                    <tr>
                        <td>${c.nome}</td>
                        <td>${c.email}</td>
                        <td>
                            <button type="button" onclick='editar(${JSON.stringify(c)})'>Editar</button>
                            <button type="button" onclick='deletar(${c.id})'>Excluir</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(err => {
            console.error('Erro ao carregar clientes:', err);
            lista.innerHTML = '<tr><td colspan="3" style="text-align:center;">Erro ao carregar dados.</td></tr>';
        });
}

function editar(c) {
    // Garante que todos os campos sejam preenchidos (ou deixados em branco se ausentes)
    if (id) id.value = c.id || '';
    nome.value = c.nome || '';
    email.value = c.email || '';
    telefone.value = c.telefone || '';
    endereco.value = c.endereco || '';
}

formEdicao.onsubmit = (event) => {
    event.preventDefault();
    
    const clienteId = id ? id.value : null;

    // VALIDAÇÃO BÁSICA
    if (!nome.value.trim()) {
        alert('O campo "Nome" é obrigatório.');
        return;
    }

    const metodo = clienteId ? 'PUT' : 'POST';
    const url = clienteId ? `${api}/${clienteId}` : api;

    fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome: nome.value,
            email: email.value,
            telefone: telefone.value,
            endereco: endereco.value
        })
    })
    .then(res => {
        if (!res.ok) throw new Error('Erro ao salvar cliente');
        return res.json();
    })
    .then(() => {
        alert(clienteId ? 'Cliente atualizado com sucesso!' : 'Cliente cadastrado com sucesso!');
        limparCampos();
        carregar();
    })
    .catch(err => {
        console.error('Erro ao salvar cliente:', err);
        alert('Erro ao salvar cliente. Tente novamente.');
    });
};

function deletar(clienteId) {
    if (!confirm("Deseja excluir este cliente?")) return;
    
    fetch(`${api}/${clienteId}`, { method: "DELETE" })
        .then(res => {
            if (!res.ok) throw new Error('Erro ao excluir cliente');
            return res.json();
        })
        .then(() => {
            alert('Cliente excluído com sucesso!');
            carregar();
        })
        .catch(err => {
            console.error('Erro ao excluir cliente:', err);
            alert('Erro ao excluir cliente. Tente novamente.');
        });
}

// Carrega ao iniciar
carregar();