const api = 'http://localhost:3000/clientes';

document.getElementById('form').onsubmit = event => {
    event.preventDefault();
    const cliente ={
        nome: nome.value,
        email: email.value,
        telefone: telefone.value,
        endereco: endereco.value
    };

    fetch(api, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(cliente)
    })
    .then(() => {
        alert('Cliente Cadastrado com Sucesso!');
        event.target.reset();
    });
};