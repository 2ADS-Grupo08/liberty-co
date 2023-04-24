// Modais
function abrirPopup() {
    $("#inp_cnpj").mask("99.999.999/9999-99");
    $("#inp_cep").mask("99999-999");
    document.getElementById('popup_fundo').style.display = 'block';
    body.style.overflowY = "hidden";
    inp_razao.value = "";
    inp_email.value = "";
    inp_cnpj.value = "";
    inp_senha.value = "";
    inp_confirmacao.value = "";
}

function fecharPopup() {
    document.getElementById('popup_fundo').style.display = 'none';
    body.style.overflowY = "visible";
}

function abrirLogin() {
    $("#inp_cnpj1").mask("99.999.999/9999-99");
    document.getElementById('popup_fundo').style.display = 'none';
    document.getElementById('popup_fundo_login').style.display = 'block';
    body.style.overflowY = "hidden";
    inp_cnpj1.value = "";
    inp_email1.value = "";
    inp_token1.value = "";
    inp_senha1.value = "";
}

function fecharPopupLogin() {
    document.getElementById('popup_fundo_login').style.display = 'none';
    body.style.overflowY = "visible";
}

function abrirCadastro() {
    document.getElementById('popup_fundo_login').style.display = 'none';
    document.getElementById('popup_fundo').style.display = 'block';
}

function abrirLoginEmpresaGestor(value) {

    if(value == 'selEmpresa') {
        document.getElementById('inputLogin').style.display = 'flex';
        document.getElementById('inputLoginGestor').style.display = 'none';
        document.getElementById('optEmpresa').selected = true;
        document.getElementById('optGestor').selected = false;
        inp_cnpj1.value = "";
        inp_email1.value = "";
        inp_token1.value = "";
        inp_senha1.value = "";
    } else if(value == 'selGestor') {
        document.getElementById('inputLogin').style.display = 'none';
        document.getElementById('inputLoginGestor').style.display = 'flex';
        document.getElementById('optGestor2').selected = true;
        document.getElementById('optEmpresa2').selected = false;
        inp_cnpj1.value = "";
        inp_email1.value = "";
        inp_token1.value = "";
    }
}

// Fim Modais

// Funções de cadastrar e logar
function cadastrarEmpresa() {
    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var razaoVar = inp_razao.value;
    var cnpjVar = inp_cnpj.value;
    var emailVar = inp_email.value;
    var cepVar = inp_cep.value;
    var logVar = inp_logradouro.value;
    var bairroVar = inp_bairro.value;
    var numVar = inp_numero.value;
    var compVar = inp_complemento.value;
    var senhaVar = inp_senha.value;
    var confirmacaoSenhaVar = inp_confirmacao.value;

    if (razaoVar == "" || cnpjVar == "" || emailVar == "" || cepVar == "" || logVar == ""
        || bairroVar == "" || numVar == "" || senhaVar == "" || confirmacaoSenhaVar == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Preencha todos os campos!',
              })
    }

    cnpjVar = cnpjVar.replace("-", "");
    cnpjVar = cnpjVar.replace("/", "");
    cnpjVar = cnpjVar.replace(".", "");
    cnpjVar = cnpjVar.replace(".", "");
    cepVar = cepVar.replace("-", "");

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrarEmpresa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            razaoServer: razaoVar,
            cnpjServer: cnpjVar,
            emailServer: emailVar,
            cepServer: cepVar,
            logServer: logVar,
            bairroServer: bairroVar,
            numServer: numVar,
            compServer: compVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            alert("Cadastro realizado com sucesso! Redirecionando para tela de Login...");

            setTimeout(() => {
                abrirLogin();
            }, "2000")
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
    return false;
}

function entrar() {

    var cnpjVar = inp_cnpj1.value;
    var emailVar = inp_email1.value;
    // var tokenVar = inp_token1.value;
    var senhaVar = inp_senha1.value;

    if (cnpjVar == "" || emailVar == "" || senhaVar == "") {
        alert("Preencha todos os campos");
        return false;
    }

    console.log("FORM LOGIN: ", cnpjVar);
    console.log("FORM SENHA: ", senhaVar);

    cnpjVar = cnpjVar.replace("-", "");
    cnpjVar = cnpjVar.replace("/", "");
    cnpjVar = cnpjVar.replace(".", "");
    cnpjVar = cnpjVar.replace(".", "");

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cnpjServer: cnpjVar,
            emailServer: emailVar,
            // tokenServer: tokenVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.EMAIL_EMPRESA = json.email;
                sessionStorage.RAZAO_SOCIAL_EMPRESA = json.razaoSoc;
                sessionStorage.CNPJ_EMPRESA = json.cnpj;
                sessionStorage.ID_EMPRESA = json.idInstituicao;
                
                setTimeout(function () {
                        window.location = "./manager-registration.html";
                    }, 1000); // apenas para exibir o loading
            });


        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function entrarGestor() {

    var emailVar = inp_emailGestor.value;
    var senhaVar = inp_senhaGestor.value;

    if (emailVar == "" || senhaVar == "") {
        alert("Preencha todos os campos");
        return false;
    }

    fetch("/usuarios/autenticarGestor", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrarGestor()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.ID_GESTOR = json.idGestor;
                sessionStorage.NOME = json.nome;
                sessionStorage.ULTIMO_NOME = json.ultimoNome;
                sessionStorage.CARGO = json.cargo;
                sessionStorage.ID_EMPRESA = json.fkInstituicao;
                
                setTimeout(function () {
                        window.location = "./cpu-registration.html";
                    }, 1000); // apenas para exibir o loading
            });


        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    inp_cep.value = "";
    inp_logradouro.value = "";
    inp_bairro.value = "";
    inp_numero.value = "";
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        inp_logradouro.value = conteudo.logradouro;
        inp_bairro.value = conteudo.bairro;
    } else {
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisaCep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            inp_logradouro.value = "...";
            inp_bairro.value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);
            inp_logradouro.disabled = true;
            inp_logradouro.style.backgroundColor = "#818181";
            inp_bairro.disabled = true;
            inp_bairro.style.backgroundColor = "#818181";
        } else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};