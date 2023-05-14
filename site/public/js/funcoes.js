// sessão
function validarSessao() {
    // aguardar();
    var razaoSoc = sessionStorage.RAZAO_SOCIAL_EMPRESA;
    var cnpj = sessionStorage.CNPJ_EMPRESA;

    var b_empresa = document.getElementById("b_empresa");
    var b_cnpj = document.getElementById("b_cnpj");
    console.log(razaoSoc);
    console.log(cnpj);

    if (razaoSoc != null && cnpj != null) {
        // alert(`Seja bem-vindo, ${razaoSoc}!`);
        b_empresa.innerHTML = razaoSoc;
        b_cnpj.innerHTML = cnpj;

        // finalizarAguardar();
    } else {
        window.location = "../index.html";
    }
}

function validarSessaoGestor() {
    // aguardar();
    var nome = sessionStorage.NOME;
    var ultimoNome = sessionStorage.ULTIMO_NOME;
    var cargo = sessionStorage.CARGO;
    var empresa = sessionStorage.ID_EMPRESA;
    console.log(nome);

    var b_nome = document.getElementById("b_nome");
    var b_ultimoNome = document.getElementById("b_ultimoNome");
    var b_cargo = document.getElementById("b_cargo");

    if (nome != null && ultimoNome != null && cargo != null && empresa != null) {
        // alert(`Seja bem-vindo, ${razaoSoc}!`);
        b_nome.innerHTML = nome;
        b_ultimoNome.innerHTML = ultimoNome;
        b_cargo.innerHTML = cargo;

        // finalizarAguardar();
    } else {
        window.location = "../index.html";
    }
}

function limparSessao() {
    // aguardar();
    sessionStorage.clear();
    // finalizarAguardar();
    window.location = "../index.html";
}

