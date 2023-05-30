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

    var idEmpresa = sessionStorage.ID_EMPRESA
    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = inp_nome.value;
    var sobrenomeVar = inp_ultimo_nome.value;
    var cargoVar = inp_cargo.value;
    var emailVar = inp_email.value;
    var senhaVar = inp_senha.value;
    var confirmacaoSenhaVar = inp_confirmacao.value;
    var statusVar = 1

    if (nomeVar == "" || sobrenomeVar == "" || cargoVar == "" || emailVar == "" || senhaVar == ""
        || confirmacaoSenhaVar == "") {
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
            sobrenomeServer: sobrenomeVar,
            cargoServer: cargoVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
            statusServer: statusVar
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            alert("Cadastro gestor realizado com sucesso!");

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
                throw "Nenhum resultado encontrados!!";
            }
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                managers.innerHTML = `
                    <thead class="manager">
                        <tr class="infos manager">
                            <th>ID</th>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Cargo</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    `
                for (let i = 0; i < resposta.length; i++) {
                    let situacao = null;
                    if (resposta[i].status == 1) {
                        situacao = "Ativo"
                        valor = "ativo"
                    } else if (resposta[i].status == 0) {
                        situacao = "Inativo"
                        valor = "inativo"
                    }
                    managers.innerHTML += `
                                <tbody class="manager">
                                    <tr class="infos manager">
                                        <td>${resposta[i].idGestor}</td>
                                        <td>${resposta[i].nome} ${resposta[i].sobrenome}</td>
                                        <td>${resposta[i].email}</td>
                                        <td>${resposta[i].cargo}</td>
                                        <td>${situacao}</td>
                                        <td class="actions">
                                            <img src="styles/assets/icone/edit-pencil.png" class="edit-pencil" onclick="getDadosGestor(${resposta[i].idGestor})" alt="">
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

function editarGestor(idGestor, nomeGestor, sobrenome, cargo, email, senha, status) {
    console.log(nomeGestor,
        sobrenome,
        cargo,
        email,
        senha,
        status)

    fetch(`/usuarios/editarGestor/${idGestor}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nomeGestor,
            sobrenomeServer: sobrenome,
            cargoServer: cargo,
            emailServer: email,
            senhaServer: senha,
            statusServer: status
        })
    })
    setTimeout(() => {
        managers.innerHTML = "";
        atualizarFeed();
    }, 10);
}

function getDadosGestor(idGestor) {
    console.log(idGestor)

    fetch(`/usuarios/getDadosGestor/${idGestor}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                throw "Nenhum resultado encontrado!!";
            }
            resposta.json().then(function (resposta) {
                // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                let situacao = null;
                if (resposta[0].status == 1) {
                    situacao = "Ativo"
                    valor = "ativo"
                } else if (resposta[0].status == 0) {
                    situacao = "Inativo"
                    valor = "inativo"
                }
                Swal.fire({
                    title: '<strong>Edição de Gestor</strong>',
                    html:
                        
                        ` <div class="edit-computer">
                            <div class="container">
                                <div class="edit-body">
                                    <div class="computer-infos-left">
                                        <div class="input-label">
                                            <label for="nomeGestor">Primeiro nome</label>
                                            <input type="text" name="" id="nomeGestor" value="${resposta[0].nome}">
                                        </div>
                                        <div class="input-label">
                                            <label for="sobrenome">Sobrenome</label>
                                            <input type="text" name="" id="sobrenome" value="${resposta[0].sobrenome}">
                                        </div>
                                        <div class="input-label">
                                            <label for="cargo">Cargo</label>
                                            <input type="text" cargo="" id="cargo" value="${resposta[0].cargo}">
                                        </div>
                                        <div class="input-label">
                                            <label for="Email">Email</label>
                                            <input type="text" name="" id="email" value="${resposta[0].email}">
                                        </div>
                                        <div class="input-label">
                                            <label for="senha">Senha</label>
                                            <input type="text" name="" id="senha" value="${resposta[0].senha}">
                                        </div>
                                        <div class="input-label">
                                        <label for="status">Status do monitoramento</label>
                                            <select name="" id="status">
                                                <option selected disabled value="${valor}">Situação: ${situacao}</option>
                                                <option value="ativo">Ativo</option>
                                                <option value="inativo">Inativo</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="computer-infos-right">
                                        <img class="monitor" src="styles/assets/icone/Gestor.png" width="200">
                                        <span>ID da Máquina: </span><span id="idMaquina">${resposta[0].idGestor}</span>
                                    </div>
                                </div>
                            </div>
                        </div>`,
                    width: 700,
                    background: '#FFFFFF',
                    denyButtonColor: '#2778c4',
                    showCloseButton: true,
                    showDenyButton: true,
                    showCancelButton: true,
                    focusConfirm: false,
                    denyButtonText: 'Editar janelas',
                    confirmButtonText: 'Finalizar',
                    cancelButtonText: 'Cancelar',
                    preConfirm: () => {
                        nomeGestor = Swal.getPopup().querySelector('#nomeGestor').value;
                        sobrenome = Swal.getPopup().querySelector('#sobrenome').value;
                        cargo = Swal.getPopup().querySelector('#cargo').value;
                        email = Swal.getPopup().querySelector('#email').value;
                        senha = Swal.getPopup().querySelector('#senha').value;
                        status = Swal.getPopup().querySelector('#status').value;


                        if (!nomeGestor || !sobrenome || !cargo || !email || !senha || !status) {
                            Swal.showValidationMessage(`Por favor, preencha todos os campos.`)
                        }

                        return {
                            nomeGestor: nomeGestor,
                            sobrenome: sobrenome,
                            cargo: cargo,
                            email: email,
                            senha: senha,
                            status: status
                        }
                    },
                    preDeny: () => {
                        Swal.fire('Any fool can use a computer')
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        editarGestor(idGestor, nomeGestor, sobrenome, cargo, email, senha, status);
                    }
                });
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}