function abrirPopup() {
    document.getElementById('popup_fundo').style.display = 'block';
    inp_nome.value = "";
    inp_ultimo_nome.value = "";
    inp_cargo.value = "";
    inp_email.value = "";
    inp_senha.value = "";
    inp_confirmacao.value = "";
}

function fecharPopup() {
    document.getElementById('popup_fundo').style.display = 'none';
    body.style.overflowY = "visible";
}

function cadastrarGestor() {

    let idEmpresa = sessionStorage.ID_EMPRESA
    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = inp_nome.value;
    var ultimoNomeVar = inp_ultimo_nome.value;
    var cargoVar = inp_cargo.value;
    var emailVar = inp_email.value;
    var senhaVar = inp_senha.value;
    var confirmacaoSenhaVar = inp_confirmacao.value;

    if (razaoVar == "" || cnpjVar == "" || emailVar == "" || cepVar == "" || logVar == ""
        || bairroVar == "" || numVar == "" || senhaVar == "" || confirmacaoSenhaVar == "") {
        alert("Preencha todos os campos");
        return false;
    }

    // Enviando o valor da nova input
    fetch(`/usuarios/cadastrarGestor/${idEmpresa}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nomeVar,
            ultimoNomeServer: ultimoNomeVar,
            cargoServer: cargoVar,
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            alert("Cadastro realizado com sucesso!");

            setTimeout(function () {
                window.location.reload();
            }, 2000);
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
    return false;
}

function atualizarFeed() {
    let idEmpresa = sessionStorage.ID_EMPRESA

    //aguardar();
    fetch(`/usuarios/listarGestores/${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                throw "Nenhum resultado encontrado!!";
            }
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                for (let i = 0; i < resposta.length; i++) {
                    managers.innerHTML += `
                                <tbody class="manager">
                                    <tr class="infos manager">
                                        <td>${resposta[i].idGestor}</td>
                                        <td>${resposta[i].nome}</td>
                                        <td>${resposta[i].cargo}</td>
                                        <td class="actions">
                                            <img src="styles/assets/icone/edit-pencil.png" class="edit-pencil" onclick="editarMaquina()" alt="">
                                            <img src="styles/assets/icone/icon-trash.png" class="trash" onclick="teste()" alt="">
                                        </td>
                                    </tr>
                                </tbody>
                            `;
                }
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}