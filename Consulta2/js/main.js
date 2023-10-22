const pesquisarCep = async () => {
    const cep = document.getElementById('cep').value;
    const urlViaCep = `http://viacep.com.br/ws/${cep}/json/`;
    limpaFormulario();

    if (cepEhValido(cep)) {
        const dadosRetorno = await fetch(urlViaCep);
        const dadosJson = await dadosRetorno.json();

        if (dadosRetorno.status != 200 || dadosJson.logradouro == undefined) {
            alert('Cep não localizado na base de dados do Via Cep.')
        } else {
            preencherFormulario(dadosJson);
        }
    } else if (cep != ""){
        alert('Cep invalido.')
    }

}

const preencherFormulario = (dadosJson) => {
    document.getElementById('endereco').value = dadosJson.logradouro;
    document.getElementById('numero').value = dadosJson.ddd;
    document.getElementById('bairro').value = dadosJson.bairro;
    document.getElementById('cidade').value = dadosJson.localidade;
    document.getElementById('estado').value = dadosJson.uf;
}

const limpaFormulario = () => {
    document.getElementById('endereco').value = "";
    document.getElementById('numero').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('estado').value = "";
}

const cepEhValido = (cep) => {
    return cep.length == 8 && ehNumero(cep);
}

const ehNumero = (cep) => {
    return /^[0-9]+$/.test(cep)     
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);