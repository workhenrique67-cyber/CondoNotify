const moradores = {

    "101": {
        nome: "Henrique",
        telefone: "5521980350791"
    },

    "102": {
        nome: "Raquel",
        telefone: "5521981909040"
    },

    "103": {
        nome: "Maria",
        telefone: "5521888888888"
    },

    "201": {
        nome: "Carlos",
        telefone: "5521777777777"
    },

    "202": {
        nome: "Fernanda",
        telefone: "5521666666666"
    },

    "203": {
    nome: "Pedro Lima",
    telefone: "5521981000003"
},

"301": {
    nome: "Juliana Martins",
    telefone: "5521981000004"
},

"302": {
    nome: "Lucas Almeida",
    telefone: "5521981000005"
},

"303": {
    nome: "Beatriz Rocha",
    telefone: "5521981000006"
},

"401": {
    nome: "Rafael Gomes",
    telefone: "5521981000007"
},

"402": {
    nome: "Amanda Costa",
    telefone: "5521981000008"
},

"403": {
    nome: "Thiago Santos",
    telefone: "5521981000009"
}

};

let totalMensagens = 0;

const porteiros = [

    {
        nome: "Carlos Oliveira",
        turno: "Noturno",
        usuario: "CarlosOliveira",
        senha: "Condo@2026"
    },

    {
        nome: "Marcos Silva",
        turno: "Diurno",
        usuario: "MarcosSilva",
        senha: "Portaria#2026"
    },

    {
        nome: "Ana Costa",
        turno: "Vespertino",
        usuario: "AnaCosta",
        senha: "Seguranca@2026"
    }

];

function salvarHistorico(texto) {

    let historico =
        JSON.parse(
            localStorage.getItem("historico")
        ) || [];

    historico.unshift(texto);

    localStorage.setItem(
        "historico",
        JSON.stringify(historico)
    );

    atualizarHistorico();
}

function atualizarHistorico() {

    let historico =
        JSON.parse(
            localStorage.getItem("historico")
        ) || [];

    const divHistorico =
        document.getElementById(
            "historicoMensagens"
        );

    if (!divHistorico) return;

    if (historico.length === 0) {

        divHistorico.innerHTML =
            "Nenhuma mensagem enviada.";

        return;
    }

    divHistorico.innerHTML =
        historico
            .slice(0, 10)
            .join("<br><br>");
}

function login() {

    const usuario =
        document.getElementById("usuario").value;

    const senha =
        document.getElementById("senha").value;

    const porteiroEncontrado =
        porteiros.find(p =>

            p.usuario === usuario &&
            p.senha === senha

        );

    if (porteiroEncontrado) {

        document.getElementById("login")
            .style.display = "none";

        document.getElementById("dashboard")
            .style.display = "block";

        const nomePorteiro =
            document.getElementById("nomePorteiro");

        const turnoPorteiro =
            document.getElementById("turnoPorteiro");

        if (nomePorteiro) {

            nomePorteiro.textContent =
                ` Bem-vindo, ${porteiroEncontrado.nome}`;
        }

        if (turnoPorteiro) {

            turnoPorteiro.textContent =
                ` Turno: ${porteiroEncontrado.turno}`;
        }

    }

    else {

        alert("Usuário ou senha inválidos!");

    }
}

function abrirNovaMensagem() {

    document.getElementById("dashboard")
        .style.display = "none";

    document.getElementById("novaMensagem")
        .style.display = "block";
}

 function voltarDashboard() {

 document.getElementById("dashboard")
 .style.display = "block";

 document.getElementById("novaMensagem")
  .style.display = "none";

 document.getElementById("sobreProjeto")
   .style.display = "none";

 document.getElementById("sobreCriador")
   .style.display = "none";
}

function abrirSobreProjeto() {

    document.getElementById("dashboard")
        .style.display = "none";

    document.getElementById("sobreProjeto")
        .style.display = "block";
}

function abrirSobreCriador() {

    document.getElementById("dashboard")
        .style.display = "none";

    document.getElementById("sobreCriador")
        .style.display = "block";
}

function enviarMensagem() {

    const bloco =
        document.getElementById("bloco").value;

    const apartamento =
        document.getElementById("apartamento").value;

    const telefone =
        document.getElementById("telefone").value;

    const aviso =
        document.getElementById("tipoAviso").value;

    if (telefone === "") {

        alert("Telefone não encontrado!");

        return;
    }

    const mensagem =

`🏢 CondoNotify

${aviso}

Bloco: ${bloco}

Apartamento: ${apartamento}

Mensagem enviada pela Portaria.`;

    const link =

`https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

    window.open(link, "_blank");

    totalMensagens++;

    document.getElementById(
        "contadorMensagens"
    ).textContent = totalMensagens;

    const horario =
        new Date().toLocaleTimeString(
            "pt-BR",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    salvarHistorico(
        `${horario} - ${aviso} - ${bloco} - ${apartamento}`
    );
}

function atualizarTelefone() {

    const apartamento =
        document.getElementById("apartamento").value;

    const telefoneInput =
        document.getElementById("telefone");

    if (moradores[apartamento]) {

        telefoneInput.value =
            moradores[apartamento].telefone;
    }

    else {

        telefoneInput.value = "";
    }
}

window.onload = function () {

    const blocos = [
        "Alpha",
        "Bravo",
        "Charlie",
        "Delta",
        "Echo"
    ];

    const selectBloco =
        document.getElementById("bloco");

    blocos.forEach(bloco => {

        const option =
            document.createElement("option");

        option.value = bloco;

        option.textContent = bloco;

        selectBloco.appendChild(option);
    });

    const apartamentos = [

        "101", "102", "103",

        "201", "202", "203",

        "301", "302", "303",

        "401", "402", "403"

    ];

    const selectApartamento =
        document.getElementById("apartamento");

    apartamentos.forEach(ap => {

        const option =
            document.createElement("option");

        option.value = ap;

        if (moradores[ap]) {

            option.textContent =
                `${ap} - ${moradores[ap].nome}`;

        } else {

            option.textContent = ap;
        }

        selectApartamento.appendChild(option);

    });

    selectApartamento.addEventListener(
        "change",
        atualizarTelefone
    );

    atualizarTelefone();

    atualizarHistorico();

};

function abrirChatbot() {

    document.getElementById("chatbot")
        .style.display = "block";
}

function fecharChatbot() {

    document.getElementById("chatbot")
        .style.display = "none";
}

function responderBot() {

    const pergunta =
        document.getElementById("pergunta")
        .value
        .toLowerCase();

    const chatArea =
        document.getElementById("chatArea");

    let resposta = "";

    if (pergunta.includes("apartamento")) {

        resposta =
            "O condomínio possui 60 apartamentos.";

    }

    else if (
        pergunta.includes("mensagem")
    ) {

        resposta =
            "Clique em Nova Mensagem para enviar um aviso.";

    }

    else if (
        pergunta.includes("criador")
    ) {

        resposta =
            "Henrique Freire desenvolveu o CondoNotify.";

    }

    else if (
        pergunta.includes("bloco")
    ) {

        resposta =
            "O condomínio possui 5 blocos: Alpha, Bravo, Charlie, Delta e Echo.";

    }

    else if (
    pergunta.includes("delivery")
) {

    resposta =
        "Utilize a opção Delivery Chegou para avisar o morador.";

}

else if (
    pergunta.includes("visitante")
) {

    resposta =
        "Utilize a opção Visitante Chegou para avisar o morador.";

}

else if (
    pergunta.includes("porteiro")
) {

    resposta =
        "Existem três porteiros cadastrados no sistema.";

}

else {

    resposta =
        "🤖 Ainda estou em fase de aprendizagem. Tente perguntar sobre apartamentos, blocos, mensagens, delivery, visitantes ou sobre o criador do projeto.";
}

chatArea.innerHTML +=

`<br><b>Você:</b> ${pergunta}
<br><b>CondoBot:</b> ${resposta}<br>`;

document.getElementById("pergunta").value = "";}
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}