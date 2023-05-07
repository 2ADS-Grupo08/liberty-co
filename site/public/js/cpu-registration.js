function abrirPopup() {
    document.getElementById('popup_fundo').style.display = 'block';
    inp_host.value = "";
    inp_nomeArq.value = "";
    inp_ultimo_nome_arq.value = "";
    inp_SO.value = "";
}

function fecharPopup() {
    document.getElementById('popup_fundo').style.display = 'none';
    // body.style.overflowY = "visible";
}

function cadastrarMaquina() {
    var idGestor = sessionStorage.ID_GESTOR
    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var hostName = inp_host.value;
    var nomeArq = inp_nomeArq.value;
    var ultimoNomeArq = inp_ultimo_nome_arq.value;
    var SO = inp_SO.value;

    if (hostName == "" || nomeArq == "" || ultimoNomeArq == "" || SO == "") {
        alert("Preencha todos os campos");
        return false;
    }

    // Enviando o valor da nova input
    fetch(`/maquinas/cadastrarMaquina/${idGestor}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            hostNameServer: hostName,
            nomeArqServer: nomeArq,
            ultimoNomeArqServer: ultimoNomeArq,
            soServer: SO,
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

function listarMaquinas() {
    let idGestor = sessionStorage.ID_GESTOR

    //aguardar();
    fetch(`/maquinas/listarMaquinas/${idGestor}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                throw "Nenhum resultado encontrado!!";
            }
            resposta.json().then(function (resposta) {
                // console.log("Dados recebidos: ", JSON.stringify(resposta));

                let atividade = null;
                for (let i = 0; i < resposta.length; i++) {
                    if (resposta[i].status == 1) {
                        atividade = "Ativo"
                        computers.innerHTML += `
                            <div class="computer" id="computer">
                                <div class="cardHeader">
                                    <div class="actions">
                                        <img src="styles/assets/icone/edit-pencil.png" class="edit-pencil" onclick="getDadosMaquina(${resposta[i].idMaquina})" alt="">
                                        <img src="styles/assets/icone/icon-trash.png" class="trash" onclick="teste()"alt="">
                                    </div>
                                    <div class="activity" id="activity" style="color: green;">
                                        <small>${atividade}</small>
                                    </div>
                                </div>
                                <div class="cardFooter">
                                    <img src="styles/assets/icone/monitor2.png" alt="">
                                    <span>${resposta[i].hostName}</span>
                                </div>
                            </div>
                            `;
                    } else if (resposta[i].status == 0) {
                        atividade = "Inativo"
                        computers.innerHTML += `
                            <div class="computer" id="computer">
                                <div class="cardHeader">
                                    <div class="actions">
                                        <img src="styles/assets/icone/edit-pencil.png" class="edit-pencil" onclick="getDadosMaquina(${resposta[i].idMaquina})" alt="">
                                        <img src="styles/assets/icone/icon-trash.png" class="trash" onclick="teste()"alt="">
                                    </div>
                                    <div class="activity" id="activity" style="color: firebrick;">
                                        <small>${atividade}</small>
                                    </div>
                                </div>
                                <div class="cardFooter">
                                    <img src="styles/assets/icone/monitor2.png" alt="">
                                    <span>${resposta[i].hostName}</span>
                                </div>
                            </div>
                            `;
                    }
                }
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function getDadosMaquina(idMaquina) {
    console.log(idMaquina)

    fetch(`/maquinas/getDadosMaquina/${idMaquina}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                throw "Nenhum resultado encontrado!!";
            }
            resposta.json().then(function (resposta) {
                // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                let atividade = null;
                if (resposta[0].status == 1) {
                    atividade = "Ativo"
                } else if (resposta[0].status == 0) {
                    atividade = "Inativo"
                }
                Swal.fire({
                    title: '<strong>Edição de máquina</strong>',
                    html:
                        ` <div class="edit-computer">
                            <div class="container">
                                <div class="edit-body">
                                    <div class="computer-infos-left">
                                        <div class="input-label">
                                            <label for="">Hostname</label>
                                            <input type="text" name="" id="hostName" value="${resposta[0].hostName}">
                                        </div>
                                        <div class="input-label">
                                            <label for="">Nome do Arquiteto</label>
                                            <input type="text" name="" id="nomeArq" value="${resposta[0].nomeArq}">
                                        </div>
                                        <div class="input-label">
                                            <label for="">Último Nome</label>
                                            <input type="text" name="" id="ultimoNomeArq" value="${resposta[0].ultimoNomeArq}">
                                        </div>
                                        <div class="input-label">
                                            <label for="">Sistema Operacional</label>
                                            <input type="text" name="" id="SO" value="${resposta[0].SO}">
                                        </div>
                                        <div class="input-label">
                                        <label for="">Status</label>
                                            <select name="" id="status">
                                                <option selected disabled>Situação: ${atividade}</option>
                                                <option value="ativo">Ativo</option>
                                                <option value="inativo">Inativo</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="computer-infos-right">
                                        <img class="monitor" src="styles/assets/icone/monitor2.png">
                                        <span>ID da Máquina: </span><span id="idMaquina">${resposta[0].idMaquina}</span>
                                    </div>
                                </div>
                            </div>
                        </div>`,
                    width: 700,
                    background: '#FFFFFF',
                    showCloseButton: true,
                    showCancelButton: true,
                    focusConfirm: false,
                    confirmButtonText: 'Finalizar',
                    cancelButtonText: 'Cancelar',
                    preConfirm: () => {
                        hostName = Swal.getPopup().querySelector('#hostName').value;
                        nomeArq = Swal.getPopup().querySelector('#nomeArq').value;
                        ultimoNomeArq = Swal.getPopup().querySelector('#ultimoNomeArq').value;
                        SO = Swal.getPopup().querySelector('#SO').value;
                        status = Swal.getPopup().querySelector('#status').value;

                        if (!hostName || !nomeArq || !ultimoNomeArq || !SO || !status) {
                            Swal.showValidationMessage(`Por favor, preencha todos os campos.`)
                        }

                        return {
                            hostName: hostName,
                            nomeArq: nomeArq,
                            ultimoNomeArq: ultimoNomeArq,
                            SO: SO,
                            status: status
                        }
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        console.log(hostName,
                            nomeArq,
                            ultimoNomeArq,
                            SO,
                            status)
                        fetch(`/maquinas/editarMaquina/${idMaquina}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                hostNameServer: hostName,
                                nomeArqServer: nomeArq,
                                ultimoNomeArqServer: ultimoNomeArq,
                                soServer: SO,
                                statusServer: status
                            })
                        })
                        setTimeout(() => {
                            computers.innerHTML = "";
                            listarMaquinas();
                        }, 5);
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

var array = [];
function encerrarExecutaveis() {
    fecharPopup();
    Swal.fire({
        width: 500,
        title: `<strong>Lista de executáveis a serem encerrados</strong>`,
        inputLabel: 'Nome do executável',
        inputPlaceholder: 'Ex: chrome.exe',
        html: `<div id="executables" class="executables"></div>`,
        inputAutoFocus: true,
        input: 'text',
        inputValidator: (value) => {
            return new Promise((resolve) => {
                if (/\.exe$/.test(value)) {
                    resolve()
                } else {
                    resolve('Escreva o nome de um executável!!')
                }
            })
        },
        showCloseButton: true,
        showCancelButton: true,
        showDenyButton: true,
        focusConfirm: false,
        denyButtonColor: '#2778c4',
        confirmButtonColor: '#008CFF',
        cancelButtonText: 'Cancelar',
        denyButtonText: 'Finalizar',
        confirmButtonText: 'Adicionar a lista',
        // returnInputValueOnDeny: true,
    }).then((result) => {
        if (result.isConfirmed) {

            Swal.fire('Adicionada com sucesso')
            encerrarExecutaveis()
            array.push(` ` + result.value);
            executables.innerHTML += array;

        } else if (result.isDenied) {
            Swal.fire('Saved!', '', 'success')
            cadastrarMaquina();
        }
    })
}