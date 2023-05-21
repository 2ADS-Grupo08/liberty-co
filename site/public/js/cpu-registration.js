function abrirPopup() {
    document.getElementById('popup_fundo').style.display = 'block';
    inp_host.value = "";
    inp_nome_dono.value = "";
    inp_ultimo_nome_dono.value = "";
    inp_SO.value = "";
}

function fecharPopup() {
    document.getElementById('popup_fundo').style.display = 'none';
    // body.style.overflowY = "visible";
}

function cadastrarMaquina(processos) {
    var idGestor = sessionStorage.ID_GESTOR;
    var hostName = inp_host.value;
    var nomeDono = inp_nome_dono.value;
    var ultimoNomeDono = inp_ultimo_nome_dono.value;
    var sistemaOperacional = inp_SO.value;
    var status = 1;

    if (hostName == "" || nomeDono == "" || ultimoNomeDono == "" || sistemaOperacional == "") {
        alert("Preencha todos os campos");
        return false;
    }

    fetch(`/maquinas/cadastrarMaquina/${idGestor}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            hostNameServer: hostName,
            nomeDonoServer: nomeDono,
            ultimoNomeDonoServer: ultimoNomeDono,
            sistemaOperacionalServer: sistemaOperacional,
            statusServer: status
        })
    }).then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            alert("Cadastro realizado com sucesso!");

            getIdMaquinaCadastrada(idGestor, processos);

            setTimeout(function () {
                window.location.reload();
            }, 10);
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
    return false;
}

function getIdMaquinaCadastrada(idGestor, processos) {
    //aguardar();
    fetch(`/maquinas/getIdMaquinaCadastrada/${idGestor}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                throw "Nenhum resultado encontrado!!";
            }
            resposta.json().then(function (resposta) {
                cadastrarProcessosSeremEncerrados(processos, resposta[0].idMaquina)
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function listarMaquinas() {
    computers.innerHTML = "";
    document.getElementById("listarMaquinasId").style.display = "none";
    document.getElementById("listarMaquinasInativasId").style.display = "flex";
    let idGestor = sessionStorage.ID_GESTOR;
    let situacao = "Ativo";
    let color = "green";
    //aguardar();
    fetch(`/maquinas/listarMaquinas/${idGestor}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                throw "Nenhum resultado encontrado!!";
            }
            resposta.json().then(function (resposta) {
                for (let i = 0; i < resposta.length; i++) {
                    computers.innerHTML += `
                        <div class="computer" id="computer">
                            <div class="cardHeader">
                                <div class="actions">
                                    <img src="styles/assets/icone/edit-pencil.png" class="edit-pencil" onclick="getDadosMaquina(${resposta[i].idMaquina})" alt="">
                                </div>
                                <div class="activity" id="activity" style="color: ${color};">
                                    <small>${situacao}</small>
                                </div>
                            </div>
                            <div class="cardFooter">
                                <img src="styles/assets/icone/monitor2.png" alt="">
                                <span>ID: ${resposta[i].idMaquina}</span>
                                <span>hostname: ${resposta[i].hostName}</span>
                            </div>
                        </div>
                    `;
                }
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        computers.innerHTML +=
            `
            <div class="title">
                <h1>NENHUMA MÁQUINA ATIVA</h1>
            </div>
        `
    });
}

function listarMaquinasInativas() {
    computers.innerHTML = "";
    document.getElementById("listarMaquinasInativasId").style.display = "none";
    document.getElementById("listarMaquinasId").style.display = "flex";
    let idGestor = sessionStorage.ID_GESTOR;
    let situacao = "Inativo";
    let color = "red";

    fetch(`/maquinas/listarMaquinasInativas/${idGestor}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                throw "Nenhum resultado encontrado!!";
            }
            resposta.json().then(function (resposta) {
                computers.innerHTML = "";
                for (let i = 0; i < resposta.length; i++) {
                    computers.innerHTML += `
                        <div class="computer" id="computer">
                            <div class="cardHeader">
                                <div class="actions">
                                    <img src="styles/assets/icone/edit-pencil.png" class="edit-pencil" onclick="getDadosMaquina(${resposta[i].idMaquina})" alt="">
                                    <img src="styles/assets/icone/icon-trash.png" class="trash" onclick="deletarMaquina(${resposta[i].idMaquina})"alt="">
                                </div>
                                <div class="activity" id="activity" style="color: ${color};">
                                    <small>${situacao}</small>
                                </div>
                            </div>
                            <div class="cardFooter">
                                <img src="styles/assets/icone/monitor2.png" alt="">
                                <span>ID: ${resposta[i].idMaquina}</span>
                                <span>hostname: ${resposta[i].hostName}</span>
                            </div>
                        </div>
                    `;
                }
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        computers.innerHTML +=
            `
            <div class="title">
                <h1>NENHUMA MÁQUINA INATIVA</h1>
            </div>
        `
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

                let situacao = null;
                if (resposta[0].status == 1) {
                    situacao = "Ativo"
                    valor = "ativo"
                } else if (resposta[0].status == 0) {
                    situacao = "Inativo"
                    valor = "inativo"
                }
                Swal.fire({
                    title: '<strong>Edição de máquina</strong>',
                    html:
                        ` <div class="edit-computer">
                            <div class="container">
                                <div class="edit-body">
                                    <div class="computer-infos-left">
                                        <div class="input-label">
                                            <label for="hostName">Hostname</label>
                                            <input type="text" name="" id="hostName" value="${resposta[0].hostName}">
                                        </div>
                                        <div class="input-label">
                                            <label for="nomeDono">Nome do Arquiteto</label>
                                            <input type="text" name="" id="nomeDono" value="${resposta[0].nomeDono}">
                                        </div>
                                        <div class="input-label">
                                            <label for="ultimoNomeDono">Último Nome</label>
                                            <input type="text" name="" id="ultimoNomeDono" value="${resposta[0].ultimoNomeDono}">
                                        </div>
                                        <div class="input-label">
                                            <label for="SO">Sistema Operacional</label>
                                            <input type="text" name="" id="SO" value="${resposta[0].sistemaOperacional}">
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
                                        <img class="monitor" src="styles/assets/icone/monitor2.png">
                                        <span>ID da Máquina: </span><span id="idMaquina">${resposta[0].idMaquina}</span>
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
                        hostName = Swal.getPopup().querySelector('#hostName').value;
                        nomeDono = Swal.getPopup().querySelector('#nomeDono').value;
                        ultimoNomeDono = Swal.getPopup().querySelector('#ultimoNomeDono').value;
                        sistemaOperacional = Swal.getPopup().querySelector('#SO').value;
                        status = Swal.getPopup().querySelector('#status').value;

                        if (!hostName || !nomeDono || !ultimoNomeDono || !sistemaOperacional || !status) {
                            Swal.showValidationMessage(`Por favor, preencha todos os campos.`)
                        }

                        return {
                            hostName: hostName,
                            nomeDono: nomeDono,
                            ultimoNomeDono: ultimoNomeDono,
                            sistemaOperacional: sistemaOperacional,
                            status: status
                        }
                    },
                    preDeny: () => {
                        Swal.fire('Any fool can use a computer')
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        editarMaquina(idMaquina, hostName, nomeDono, ultimoNomeDono, sistemaOperacional, status);
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

function editarMaquina(idMaquina, hostName, nomeDono, ultimoNomeDono, sistemaOperacional, status) {
    fetch(`/maquinas/editarMaquina/${idMaquina}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            hostNameServer: hostName,
            nomeDonoServer: nomeDono,
            ultimoNomeDonoServer: ultimoNomeDono,
            sistemaOperacionalServer: sistemaOperacional,
            statusServer: status
        })
    })
    setTimeout(() => {
        computers.innerHTML = "";
        listarMaquinas();
    }, 10);
}

function deletarMaquina(idMaquina) {
    Swal.fire({
        title: 'Tem certeza que quer deletar essa máquina?',
        text: "Voce não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, eu tenho!'
      }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/maquinas/deletarMaquina/${idMaquina}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (resposta) {
                if (resposta.ok) {
                    Swal.fire(
                        'Deletada!',
                        'Sua Máquina foi deletada com sucesso.',
                        'success'
                      )
                    setTimeout(() => {
                        listarMaquinasInativas();
                    }, 5);
                } else if (resposta.status == 404) {
                    window.alert("Deu 404!");
                } else {
                    throw ("Houve um erro ao tentar deletar a Maquina! Código da resposta: " + resposta.status);
                }
            }).catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
        }
      })

}

var processos = [];
function criarListaProcessosSeremEncerrados() {
    var hostName = inp_host.value;
    var nomeDono = inp_nome_dono.value;
    var ultimoNomeDono = inp_ultimo_nome_dono.value;
    var sistemaOperacional = inp_SO.value;
    if (hostName == "" || nomeDono == "" || ultimoNomeDono == "" || sistemaOperacional == "") {
        alert("Preencha todos os campos");
        return false;
    }
    fecharPopup();
    Swal.fire({
        width: 500,
        title: `<strong>Lista de executáveis a serem encerrados</strong>`,
        html: `<small>PSC: Voce poderá editar isso mais tarde</small>
                <ul id="executables" class="executables"></ul>`,
        inputLabel: 'Nome do executável',
        inputPlaceholder: 'Ex: chrome.exe',
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
        denyButtonColor: '#008CFF',
        confirmButtonColor: '#2778c4',
        cancelButtonText: 'Cancelar',
        denyButtonText: 'Finalizar',
        confirmButtonText: 'Adicionar a lista',
    }).then((result) => {
        if (result.isConfirmed) {
            criarListaProcessosSeremEncerrados();
            for (let index = 0; index <= processos.length; index++) {
                if (processos.indexOf(result.value) == - 1) {
                    processos.push(result.value);
                    executables.innerHTML += `
                        <li id="executable" class="executable">
                            ${processos}, 
                        </li>`;
                    break;
                } else {
                    alert("janela já cadastrada");
                    break;
                }
            }
        } else if (result.isDenied) {
            cadastrarMaquina(processos);
            processos = [];
        }
    })
}

function cadastrarProcessosSeremEncerrados(processos, idMaquina) {
    for (let i = 0; i < processos.length; i++) {
        console.log(processos[i])
        fetch(`/maquinas/cadastrarProcessosSeremEncerrados/${idMaquina}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                processoServer: processos[i],
            })
        }).then(function (resposta) {
            console.log("resposta: ", resposta);
    
            if (resposta.ok) {

                // setTimeout(function () {
                //     window.location.reload();
                // }, 10);
            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
        
    }
    return false;
}