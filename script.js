// ===== Página principal =====
function iniciarFicha() {
    // Menu hambúrguer
    const menuBotao = document.getElementById("menu-botao");
    const menu = document.getElementById("menu");
    const menuFundo = document.getElementById("menu-fundo");
    const menuLinks = document.querySelectorAll(".menu-item");

    function alternarMenu() {
        menu.classList.toggle("aberto");
        menuBotao.classList.toggle("aberto");
        menuFundo.classList.toggle("aberto");

        const estaAberto = menu.classList.contains("aberto");
        menuBotao.setAttribute("aria-expanded", estaAberto);
        menuBotao.setAttribute("aria-label", estaAberto ? "Fechar menu" : "Abrir menu");
    }

    function fecharMenu() {
        menu.classList.remove("aberto");
        menuBotao.classList.remove("aberto");
        menuFundo.classList.remove("aberto");
        menuBotao.setAttribute("aria-expanded", false);
        menuBotao.setAttribute("aria-label", "Abrir menu");
    }

    menuBotao.addEventListener("click", alternarMenu);

    menuFundo.addEventListener("click", fecharMenu);

    menuLinks.forEach((link) => {
        link.addEventListener("click", fecharMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            fecharMenu();
        }
    });

    // Link ativo no menu
    function marcarSecaoAtual() {
        let secaoAtual = "";

        menuLinks.forEach((link) => {
            const destino = link.getAttribute("href");

            if (!destino.startsWith("#")) {
                return;
            }

            const secao = document.querySelector(destino);

            if (window.scrollY >= secao.offsetTop - 150) {
                secaoAtual = link.getAttribute("href");
            }
        });

        menuLinks.forEach((link) => {
            if (link.getAttribute("href") === secaoAtual) {
                link.classList.add("ativo");
            } else {
                link.classList.remove("ativo");
            }
        });
    }

    window.addEventListener("scroll", marcarSecaoAtual);

    marcarSecaoAtual();

    // Inventário
    const inventario = [
        {
            nome: "Garras de Aço",
            tipo: "arma",
            raridade: "lendario",
            descricao: "Garras de titânio retráteis, capazes de cortar aço, concreto e blindagem com um único golpe.",
            imagem: "imagens/item-garras.jpg",
            alt: "Par de luvas táticas com três garras de aço longas em cada mão"
        },
        {
            nome: "Katanas Gêmeas",
            tipo: "arma",
            raridade: "epico",
            descricao: "Katanas de aço reforçado, leves e equilibradas, feitas para golpes rápidos que combinam com o seu karatê.",
            imagem: "imagens/item-katanas.jpg",
            alt: "Duas katanas cruzadas com cabos pretos e dourados e bainhas camufladas"
        },
        {
            nome: "Máscara Tecnológica",
            tipo: "equipamento",
            raridade: "epico",
            descricao: "Respiração subaquática, visão no escuro e rádio integrado para falar com o esquadrão em qualquer lugar.",
            imagem: "imagens/item-mascara.jpg",
            alt: "Máscara tática tecnológica com viseira verde e filtros de respiração"
        },
        {
            nome: "Armadura Tática",
            tipo: "equipamento",
            raridade: "raro",
            descricao: "Camuflada para a selva, impermeável e flexível, protege o corpo sem atrapalhar saltos, escaladas e o nado.",
            imagem: "imagens/item-armadura.jpg",
            alt: "Armadura tática camuflada com ombreiras de metal e o emblema do esquadrão"
        },
        {
            nome: "Pistolas",
            tipo: "arma",
            raridade: "raro",
            descricao: "Pistolas táticas resistentes à água e à lama, que funcionam até depois de um mergulho no rio.",
            imagem: "imagens/item-pistolas.jpg",
            alt: "Duas pistolas táticas camufladas com detalhes dourados e seus coldres"
        },
        {
            nome: "Munição e Bombas",
            tipo: "suprimento",
            raridade: "comum",
            descricao: "Granadas, explosivos e cartuchos de reserva. Equipamento padrão de toda missão.",
            imagem: "imagens/item-municao.jpg",
            alt: "Granadas, bombas e cartuchos de munição com o emblema da onça"
        }
    ];

    const nomesRaridade = {
        lendario: "Lendário",
        epico: "Épico",
        raro: "Raro",
        comum: "Comum"
    };

    const gradeItens = document.getElementById("grade-itens");
    const contadorItens = document.getElementById("contador-itens");
    const inventarioVazio = document.getElementById("inventario-vazio");
    const filtroTipo = document.getElementById("filtro-tipo");
    const filtroRaridade = document.getElementById("filtro-raridade");
    const botaoLimpar = document.getElementById("limpar-filtros");
    const botaoLimparPainel = document.getElementById("botao-limpar-painel");
    const barraFiltro = document.getElementById("barra-filtro");

    function criarCard(item) {
        const card = document.createElement("article");
        card.classList.add("card-item");

        if (item.raridade === "lendario") {
            card.classList.add("card-lendario");
        } else if (item.raridade === "epico") {
            card.classList.add("card-epico");
        }

        const imagem = document.createElement("img");
        imagem.classList.add("card-imagem");
        imagem.src = item.imagem;
        imagem.alt = item.alt;

        const conteudo = document.createElement("div");
        conteudo.classList.add("card-conteudo");

        const selo = document.createElement("span");
        selo.classList.add("raridade", "raridade-" + item.raridade);
        selo.textContent = nomesRaridade[item.raridade];

        const titulo = document.createElement("h3");
        titulo.classList.add("card-titulo");
        titulo.textContent = item.nome;

        const descricao = document.createElement("p");
        descricao.textContent = item.descricao;

        conteudo.appendChild(selo);
        conteudo.appendChild(titulo);
        conteudo.appendChild(descricao);
        card.appendChild(imagem);
        card.appendChild(conteudo);

        return card;
    }

    function mostrarInventario() {
        const tipoAtual = filtroTipo.value;
        const raridadeAtual = filtroRaridade.value;

        const itensFiltrados = inventario.filter((item) => {
            const tipoOk = tipoAtual === "todos" || item.tipo === tipoAtual;
            const raridadeOk = raridadeAtual === "todas" || item.raridade === raridadeAtual;
            return tipoOk && raridadeOk;
        });

        gradeItens.innerHTML = "";

        itensFiltrados.forEach((item) => {
            gradeItens.appendChild(criarCard(item));
        });

        contadorItens.innerHTML = "<strong>" + itensFiltrados.length + "</strong>/" + inventario.length + " itens";

        barraFiltro.style.width = (itensFiltrados.length / inventario.length) * 100 + "%";

        filtroTipo.classList.toggle("ativo", tipoAtual !== "todos");
        filtroRaridade.classList.toggle("ativo", raridadeAtual !== "todas");

        const temFiltro = tipoAtual !== "todos" || raridadeAtual !== "todas";
        botaoLimparPainel.disabled = !temFiltro;

        if (itensFiltrados.length === 0) {
            inventarioVazio.classList.add("visivel");
        } else {
            inventarioVazio.classList.remove("visivel");
        }
    }

    filtroTipo.addEventListener("change", mostrarInventario);
    filtroRaridade.addEventListener("change", mostrarInventario);

    function limparFiltros() {
        filtroTipo.value = "todos";
        filtroRaridade.value = "todas";
        mostrarInventario();
    }

    botaoLimparPainel.addEventListener("click", limparFiltros);
    botaoLimpar.addEventListener("click", limparFiltros);

    mostrarInventario();

    // Ver mais
    const botaoVerMais = document.getElementById("botao-ver-mais");
    const historiaFaixa = document.getElementById("historia-faixa");
    const sobreHistoria = document.getElementById("sobre-historia");

    botaoVerMais.addEventListener("click", () => {
        const aberta = sobreHistoria.classList.toggle("aberta");
        historiaFaixa.classList.toggle("aberta", aberta);

        botaoVerMais.innerHTML = aberta
            ? 'Ver menos <i class="fa-solid fa-chevron-up"></i>'
            : 'Ver história completa <i class="fa-solid fa-chevron-down"></i>';

        botaoVerMais.setAttribute("aria-expanded", aberta);

        if (!aberta) {
            historiaFaixa.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    });

    // Missões e XP
    const xpAtualTexto = document.getElementById("xp-atual");
    const xpPreenchida = document.getElementById("xp-preenchida");
    const xpNivelTexto = document.getElementById("xp-nivel");
    const xpPatente = document.getElementById("xp-patente");
    const xpMensagem = document.getElementById("xp-mensagem");
    const missoesConcluidasTexto = document.getElementById("missoes-concluidas");

    const listaMissoes = document.getElementById("missoes");
    const botaoRedefinirMissoes = document.getElementById("redefinir-missoes");
    const missoes = document.querySelectorAll(".missao");
    const XP_MAXIMO = 100;

    function montarRodape(missao) {
        const rodape = missao.querySelector(".missao-rodape");
        const xp = missao.dataset.xp;
        const concluida = missao.classList.contains("missao-concluida");

        if (concluida) {
            rodape.innerHTML = "<span>✓ <b>+" + xp + " XP</b> recebidos</span>";

            if (missao.dataset.fixa !== "true") {
                rodape.innerHTML += '<button class="botao-missao botao-desfazer" type="button">Desfazer</button>';
            }
        } else {
            rodape.innerHTML = "<span>Recompensa <b>" + xp + " XP</b></span>" +
                '<button class="botao-missao" type="button">Concluir</button>';
        }
    }

    function atualizarXp() {
        let xp = 0;
        let concluidas = 0;

        missoes.forEach((missao) => {
            if (missao.classList.contains("missao-concluida")) {
                xp += Number(missao.dataset.xp);
                concluidas++;
            }
        });

        xpAtualTexto.textContent = xp;
        xpPreenchida.style.width = (xp / XP_MAXIMO) * 100 + "%";
        missoesConcluidasTexto.textContent = concluidas;

        let mudou = false;
        missoes.forEach((missao) => {
            if (missao.dataset.fixa !== "true" && missao.classList.contains("missao-concluida")) {
                mudou = true;
            }
        });
        botaoRedefinirMissoes.disabled = !mudou;

        if (xp >= XP_MAXIMO) {
            xpNivelTexto.textContent = 51;
            xpPatente.textContent = "Tenente · Esquadrão Sombra";
            xpMensagem.classList.add("visivel");
        } else {
            xpNivelTexto.textContent = 50;
            xpPatente.textContent = "Sargento · Esquadrão Sombra";
            xpMensagem.classList.remove("visivel");
        }
    }

    function alternarMissao(missao) {
        const ficouConcluida = missao.classList.toggle("missao-concluida");
        missao.classList.toggle("missao-andamento", !ficouConcluida);

        missao.querySelector(".missao-status").innerHTML = ficouConcluida
            ? '<i class="fa-solid fa-check"></i> Concluída'
            : '<i class="fa-solid fa-spinner"></i> Em andamento';

        montarRodape(missao);
        atualizarXp();
    }

    listaMissoes.addEventListener("click", (evento) => {
        const botao = evento.target.closest(".botao-missao");

        if (botao) {
            alternarMissao(botao.closest(".missao"));
        }
    });

    botaoRedefinirMissoes.addEventListener("click", () => {
        missoes.forEach((missao) => {
            if (missao.dataset.fixa !== "true" && missao.classList.contains("missao-concluida")) {
                alternarMissao(missao);
            }
        });
    });

    missoes.forEach(montarRodape);
    atualizarXp();

    // Atributos e overall
    const atributos = document.querySelectorAll(".atributo");
    const overallNumero = document.getElementById("overall-numero");
    const overallSegmentos = document.querySelectorAll(".overall-segmento");
    const botaoRedefinirAtributos = document.getElementById("redefinir-atributos");

    const ajustesAtributos = [];

    const PASSO_ATRIBUTO = 5;

    function atualizarOverall() {
        let soma = 0;
        let mudou = false;

        atributos.forEach((atributo) => {
            const valor = Number(atributo.querySelector(".atributo-valor").textContent);
            soma += valor;

            if (valor !== Number(atributo.dataset.padrao)) {
                mudou = true;
            }
        });

        botaoRedefinirAtributos.disabled = !mudou;

        const media = Math.round(soma / atributos.length);
        overallNumero.textContent = media;

        overallSegmentos.forEach((segmento, indice) => {
            segmento.classList.toggle("ligado", indice < Math.floor(media / 10));
        });

        overallNumero.classList.remove("mudou");
        void overallNumero.offsetWidth;
        overallNumero.classList.add("mudou");
    }

    atributos.forEach((atributo) => {
        const valorTexto = atributo.querySelector(".atributo-valor");
        const barra = atributo.querySelector(".barra-preenchida");
        const controle = atributo.querySelector(".barra-arrastar");
        const botaoMenos = atributo.querySelector('[data-acao="diminuir"]');
        const botaoMais = atributo.querySelector('[data-acao="aumentar"]');

        atributo.dataset.padrao = valorTexto.textContent;

        function definirValor(valor) {
            if (valor > 100) {
                valor = 100;
            } else if (valor < 0) {
                valor = 0;
            }

            valorTexto.textContent = valor;
            barra.style.width = valor + "%";
            controle.value = valor;

            botaoMenos.disabled = valor <= 0;
            botaoMais.disabled = valor >= 100;

            atualizarOverall();
        }

        controle.addEventListener("input", () => {
            definirValor(Number(controle.value));
        });

        botaoMenos.addEventListener("click", () => {
            definirValor(Number(valorTexto.textContent) - PASSO_ATRIBUTO);
        });

        botaoMais.addEventListener("click", () => {
            definirValor(Number(valorTexto.textContent) + PASSO_ATRIBUTO);
        });

        ajustesAtributos.push(() => definirValor(Number(atributo.dataset.padrao)));

        botaoMenos.disabled = Number(valorTexto.textContent) <= 0;
        botaoMais.disabled = Number(valorTexto.textContent) >= 100;
    });

    botaoRedefinirAtributos.addEventListener("click", () => {
        ajustesAtributos.forEach((voltarPadrao) => voltarPadrao());
    });

    atualizarOverall();

    // Formulário
    const formContato = document.getElementById("form-contato");
    const campoNome = document.getElementById("campo-nome");
    const campoEmail = document.getElementById("campo-email");
    const campoMensagem = document.getElementById("campo-mensagem");
    const campoWhatsapp = document.getElementById("campo-whatsapp");
    const campoSenha = document.getElementById("campo-senha");
    const formStatusTexto = document.getElementById("form-status-texto");
    const formSucesso = document.getElementById("form-sucesso");
    const sucessoNome = document.getElementById("sucesso-nome");
    const formFalha = document.getElementById("form-falha");
    const formFalhaTexto = document.getElementById("form-falha-texto");
    const botaoEnviar = document.getElementById("botao-enviar");
    const botaoNovoAlistamento = document.getElementById("novo-alistamento");
    const linkEntrar = document.getElementById("link-entrar");

    const WEBHOOK_ALISTAMENTO = "https://howlingantelope-n8n.cloudfy.live/webhook/alistamento";
    const CHAVE_ALISTAMENTO = "jaguarete-alistamento";

    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function verificarCampo(campo) {
        const valor = campo.value.trim();

        if (valor === "") {
            return "Este campo é obrigatório.";
        }

        if (campo === campoEmail && !formatoEmail.test(valor)) {
            return "Digite um e-mail válido, ex.: nome@email.com";
        }

        if (campo === campoMensagem && valor.length < 10) {
            return "Escreva pelo menos 10 caracteres.";
        }

        if (campo === campoWhatsapp) {
            const numeros = valor.replace(/\D/g, "");

            if (numeros.length < 10 || numeros.length > 11) {
                return "Digite o WhatsApp com DDD, ex.: (11) 91234-5678";
            }
        }

        if (campo === campoSenha && (valor.length < 6 || valor.length > 10)) {
            return "A senha precisa ter de 6 a 10 caracteres.";
        }

        return "";
    }

    function mostrarErro(campo, mensagem) {
        const caixa = campo.closest(".campo");
        caixa.classList.toggle("erro", mensagem !== "");
        caixa.querySelector(".campo-erro").textContent = mensagem;
        campo.setAttribute("aria-invalid", mensagem !== "");
    }

    function mudarStatus(texto, tipo) {
        formStatusTexto.textContent = texto;
        formStatusTexto.classList.toggle("erro", tipo === "erro");
        formStatusTexto.classList.toggle("ok", tipo === "ok");
    }

    const camposFormulario = [campoNome, campoEmail, campoWhatsapp, campoSenha, campoMensagem];

    function mascaraWhatsapp(valor) {
        const n = valor.replace(/\D/g, "").slice(0, 11);

        if (n.length === 0) {
            return "";
        }
        if (n.length <= 2) {
            return "(" + n;
        }
        if (n.length <= 6) {
            return "(" + n.slice(0, 2) + ") " + n.slice(2);
        }
        if (n.length <= 10) {
            return "(" + n.slice(0, 2) + ") " + n.slice(2, 6) + "-" + n.slice(6);
        }

        return "(" + n.slice(0, 2) + ") " + n.slice(2, 7) + "-" + n.slice(7);
    }

    campoWhatsapp.addEventListener("input", () => {
        campoWhatsapp.value = mascaraWhatsapp(campoWhatsapp.value);
    });

    camposFormulario.forEach((campo) => {
        campo.addEventListener("input", () => {
            formSucesso.classList.remove("visivel");

            if (campo.closest(".campo").classList.contains("erro")) {
                mostrarErro(campo, verificarCampo(campo));
            }
        });
    });

    formContato.addEventListener("submit", (evento) => {
        evento.preventDefault();

        let primeiroComErro = null;

        camposFormulario.forEach((campo) => {
            const mensagem = verificarCampo(campo);
            mostrarErro(campo, mensagem);

            if (mensagem !== "" && primeiroComErro === null) {
                primeiroComErro = campo;
            }
        });

        if (primeiroComErro !== null) {
            formSucesso.classList.remove("visivel");
            mudarStatus("Erro na transmissão", "erro");
            primeiroComErro.focus();
            return;
        }

        enviarAlistamento();
    });

    function mostrarAlistado(nome) {
        sucessoNome.textContent = nome;
        formSucesso.classList.add("visivel");
        formFalha.classList.remove("visivel");
        formContato.classList.add("enviado");
        mudarStatus("Transmissão concluída", "ok");
    }

    async function enviarAlistamento() {
        const nome = campoNome.value.trim();

        botaoEnviar.disabled = true;
        botaoEnviar.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
        formFalha.classList.remove("visivel", "email-em-uso");
        mudarStatus("Transmitindo...", "");

        if (WEBHOOK_ALISTAMENTO.startsWith("COLE_AQUI")) {
            formFalhaTexto.textContent = "O envio de alistamentos ainda não foi ativado. Tente de novo mais tarde.";
            formFalha.classList.add("visivel");
            mudarStatus("Erro na transmissão", "erro");
            botaoEnviar.disabled = false;
            botaoEnviar.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Enviar alistamento';
            return;
        }

        try {
            const resposta = await fetch(WEBHOOK_ALISTAMENTO, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: nome,
                    email: campoEmail.value.trim(),
                    whatsapp: campoWhatsapp.value.replace(/\D/g, ""),
                    senha: campoSenha.value,
                    motivo: campoMensagem.value.trim()
                })
            });

            const dados = await resposta.json();

            if (dados.sucesso === true) {
                mostrarAlistado(nome);
                formContato.reset();

                try {
                    localStorage.setItem(CHAVE_ALISTAMENTO, nome);
                } catch (erro) {
                }
            } else if (dados.codigo === "email_em_uso") {
                const email = campoEmail.value.trim();
                mostrarErro(campoEmail, "Este e-mail já está sendo utilizado.");
                formFalhaTexto.textContent = "Este e-mail já está sendo utilizado. Se você já se alistou, entre com seu e-mail e senha para ver o resultado.";
                linkEntrar.href = "meu-alistamento.html?email=" + encodeURIComponent(email);
                formFalha.classList.add("visivel", "email-em-uso");
                mudarStatus("E-mail já alistado", "erro");
            } else {
                formFalhaTexto.textContent = dados.mensagem || "O alistamento não foi aceito. Tente de novo.";
                formFalha.classList.add("visivel");
                mudarStatus("Erro na transmissão", "erro");
            }
        } catch (erro) {
            formFalhaTexto.textContent = "Não foi possível enviar. Verifique sua internet e tente de novo.";
            formFalha.classList.add("visivel");
            mudarStatus("Erro na transmissão", "erro");
        }

        botaoEnviar.disabled = false;
        botaoEnviar.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Enviar alistamento';
    }

    botaoNovoAlistamento.addEventListener("click", () => {
        formContato.classList.remove("enviado");
        formSucesso.classList.remove("visivel");
        mudarStatus("Aguardando transmissão", "");

        try {
            localStorage.removeItem(CHAVE_ALISTAMENTO);
        } catch (erro) {
        }

        campoNome.focus();
    });

    try {
        const alistado = localStorage.getItem(CHAVE_ALISTAMENTO);

        if (alistado) {
            mostrarAlistado(alistado);
        }
    } catch (erro) {
    }

    // Tema e saudação
    const botaoTema = document.getElementById("botao-tema");

    botaoTema.addEventListener("click", () => {
        const claro = document.body.classList.toggle("tema-claro");

        botaoTema.innerHTML = claro
            ? '<i class="fa-solid fa-moon"></i>'
            : '<i class="fa-solid fa-sun"></i>';

        botaoTema.setAttribute("aria-label", claro ? "Ativar modo escuro" : "Ativar modo claro");
    });

    const saudacaoTexto = document.getElementById("saudacao-texto");
    const saudacaoIcone = document.getElementById("saudacao-icone");
    const hora = new Date().getHours();

    if (hora >= 5 && hora < 12) {
        saudacaoTexto.textContent = "Bom dia, agente";
        saudacaoIcone.className = "fa-solid fa-sun";
    } else if (hora >= 12 && hora < 18) {
        saudacaoTexto.textContent = "Boa tarde, agente";
        saudacaoIcone.className = "fa-solid fa-cloud-sun";
    } else {
        saudacaoTexto.textContent = "Boa noite, agente";
        saudacaoIcone.className = "fa-solid fa-moon";
    }

    // Salvar no navegador (localStorage)
    const CHAVE_TEMA = "jaguarete-tema";
    const CHAVE_MISSOES = "jaguarete-missoes";
    const CHAVE_ATRIBUTOS = "jaguarete-atributos";

    const avisoSalvo = document.getElementById("aviso-salvo");
    const avisoSalvoTexto = document.getElementById("aviso-salvo-texto");
    let tempoAviso;

    function mostrarAviso(texto) {
        avisoSalvoTexto.textContent = texto;
        avisoSalvo.classList.add("visivel");

        clearTimeout(tempoAviso);
        tempoAviso = setTimeout(() => {
            avisoSalvo.classList.remove("visivel");
        }, 1500);
    }

    function salvarTema() {
        const claro = document.body.classList.contains("tema-claro");
        localStorage.setItem(CHAVE_TEMA, claro ? "claro" : "escuro");
    }

    function salvarMissoes() {
        const concluidas = [];

        missoes.forEach((missao, indice) => {
            if (missao.dataset.fixa !== "true" && missao.classList.contains("missao-concluida")) {
                concluidas.push(indice);
            }
        });

        localStorage.setItem(CHAVE_MISSOES, JSON.stringify(concluidas));
        mostrarAviso("Progresso salvo");
    }

    function salvarAtributos() {
        const valores = [];

        atributos.forEach((atributo) => {
            valores.push(Number(atributo.querySelector(".atributo-valor").textContent));
        });

        localStorage.setItem(CHAVE_ATRIBUTOS, JSON.stringify(valores));
        mostrarAviso("Atributos salvos");
    }

    function carregarProgresso() {
        let recuperou = false;

        if (localStorage.getItem(CHAVE_TEMA) === "claro") {
            botaoTema.click();
        }

        const missoesSalvas = JSON.parse(localStorage.getItem(CHAVE_MISSOES)) || [];
        missoesSalvas.forEach((indice) => {
            const missao = missoes[indice];

            if (missao && !missao.classList.contains("missao-concluida")) {
                alternarMissao(missao);
                recuperou = true;
            }
        });

        const atributosSalvos = JSON.parse(localStorage.getItem(CHAVE_ATRIBUTOS));
        if (atributosSalvos) {
            atributos.forEach((atributo, indice) => {
                const controle = atributo.querySelector(".barra-arrastar");

                if (atributosSalvos[indice] !== undefined && Number(controle.value) !== atributosSalvos[indice]) {
                    controle.value = atributosSalvos[indice];
                    controle.dispatchEvent(new Event("input"));
                    recuperou = true;
                }
            });
        }

        if (recuperou) {
            mostrarAviso("Progresso recuperado");
        }
    }

    try {
        carregarProgresso();

        botaoTema.addEventListener("click", salvarTema);

        listaMissoes.addEventListener("click", (evento) => {
            if (evento.target.closest(".botao-missao")) {
                salvarMissoes();
            }
        });
        botaoRedefinirMissoes.addEventListener("click", salvarMissoes);

        atributos.forEach((atributo) => {
            atributo.querySelector(".barra-arrastar").addEventListener("change", salvarAtributos);
            atributo.querySelectorAll(".botao-atributo").forEach((botao) => {
                botao.addEventListener("click", salvarAtributos);
            });
        });
        botaoRedefinirAtributos.addEventListener("click", salvarAtributos);
    } catch (erro) {
    }
}

// Tema nas outras páginas
function ligarTemaPaginaInterna() {
    const CHAVE_TEMA = "jaguarete-tema";
    const botaoTema = document.getElementById("botao-tema");

    function aplicarTema(claro) {
        document.body.classList.toggle("tema-claro", claro);
        botaoTema.innerHTML = claro
            ? '<i class="fa-solid fa-moon"></i>'
            : '<i class="fa-solid fa-sun"></i>';
        botaoTema.setAttribute("aria-label", claro ? "Ativar modo escuro" : "Ativar modo claro");
    }

    botaoTema.addEventListener("click", () => {
        const claro = !document.body.classList.contains("tema-claro");
        aplicarTema(claro);

        try {
            localStorage.setItem(CHAVE_TEMA, claro ? "claro" : "escuro");
        } catch (erro) {
        }
    });

    try {
        aplicarTema(localStorage.getItem(CHAVE_TEMA) === "claro");
    } catch (erro) {
    }
}

// ===== Meu alistamento =====
function iniciarMeuAlistamento() {
    // Endereço do webhook
    const WEBHOOK_CONSULTA = "https://howlingantelope-n8n.cloudfy.live/webhook/consultaalistamento";

    const CHAVE_LOGIN = "jaguarete-login-consulta";

    const INTERVALO_ATUALIZACAO = 30000;

    // Tema
    ligarTemaPaginaInterna();

    // Entrar
    const pagina = document.querySelector(".pagina-alistamento");
    const formEntrar = document.getElementById("form-entrar");
    const entrarEmail = document.getElementById("entrar-email");
    const entrarSenha = document.getElementById("entrar-senha");
    const entrarFalha = document.getElementById("entrar-falha");
    const entrarFalhaTexto = document.getElementById("entrar-falha-texto");
    const botaoEntrar = document.getElementById("botao-entrar");

    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function mostrarErro(campo, mensagem) {
        const caixa = campo.closest(".campo");
        caixa.classList.toggle("erro", mensagem !== "");
        caixa.querySelector(".campo-erro").textContent = mensagem;
        campo.setAttribute("aria-invalid", mensagem !== "");
    }

    function verificarEntrada() {
        let valido = true;

        if (!formatoEmail.test(entrarEmail.value.trim())) {
            mostrarErro(entrarEmail, "Digite o e-mail usado no alistamento.");
            valido = false;
        } else {
            mostrarErro(entrarEmail, "");
        }

        if (entrarSenha.value === "") {
            mostrarErro(entrarSenha, "Digite a sua senha.");
            valido = false;
        } else {
            mostrarErro(entrarSenha, "");
        }

        return valido;
    }

    function mostrarFalha(texto) {
        entrarFalhaTexto.textContent = texto;
        entrarFalha.classList.add("visivel");
    }

    function carregando(ativo) {
        botaoEntrar.disabled = ativo;
        botaoEntrar.innerHTML = ativo
            ? '<i class="fa-solid fa-spinner fa-spin"></i> Consultando...'
            : '<i class="fa-solid fa-magnifying-glass"></i> Consultar resultado';
    }

    [entrarEmail, entrarSenha].forEach((campo) => {
        campo.addEventListener("input", () => {
            entrarFalha.classList.remove("visivel");

            if (campo.closest(".campo").classList.contains("erro")) {
                verificarEntrada();
            }
        });
    });

    let ultimaConsulta = null;

    async function consultar(email, senha, silencioso) {
        if (!silencioso) {
            carregando(true);
            entrarFalha.classList.remove("visivel");
        }

        try {
            const resposta = await fetch(WEBHOOK_CONSULTA, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: email, senha: senha })
            });

            const dados = await resposta.json();

            if (dados.sucesso === true) {
                ultimaConsulta = { email: email, senha: senha };
                mostrarCracha(dados.ficha);
                formEntrar.reset();

                try {
                    sessionStorage.setItem(CHAVE_LOGIN, JSON.stringify(ultimaConsulta));
                } catch (erro) {
                }
            } else if (!silencioso) {
                pagina.classList.remove("logado");
                mostrarFalha(dados.mensagem || "E-mail ou senha incorretos.");
            }
        } catch (erro) {
            if (!silencioso) {
                pagina.classList.remove("logado");
                mostrarFalha("Não foi possível consultar agora. Verifique sua internet e tente de novo.");
            }
        }

        if (!silencioso) {
            carregando(false);
        }
    }

    setInterval(() => {
        if (ultimaConsulta !== null && pagina.classList.contains("logado") && !document.hidden) {
            consultar(ultimaConsulta.email, ultimaConsulta.senha, true);
        }
    }, INTERVALO_ATUALIZACAO);

    formEntrar.addEventListener("submit", (evento) => {
        evento.preventDefault();
        entrarFalha.classList.remove("visivel");

        if (!verificarEntrada()) {
            return;
        }

        if (WEBHOOK_CONSULTA.startsWith("COLE_AQUI")) {
            mostrarFalha("A consulta de alistamentos ainda não foi ativada. Tente de novo mais tarde.");
            return;
        }

        consultar(entrarEmail.value.trim(), entrarSenha.value);
    });

    // Crachá
    const cracha = document.getElementById("cracha");
    const crachaTipo = document.getElementById("cracha-tipo");
    const crachaNome = document.getElementById("cracha-nome");
    const crachaRegistro = document.getElementById("cracha-registro");
    const crachaDadoNome = document.getElementById("cracha-dado-nome");
    const crachaDadoEmail = document.getElementById("cracha-dado-email");
    const crachaDadoData = document.getElementById("cracha-dado-data");
    const crachaFaixa = document.getElementById("cracha-faixa");
    const crachaExplicacao = document.getElementById("cracha-explicacao");
    const botaoSair = document.getElementById("botao-sair");
    const botaoAtualizar = document.getElementById("botao-atualizar");
    const crachaAtualizado = document.getElementById("cracha-atualizado");
    const convocacao = document.getElementById("convocacao");
    let statusAnterior = null;

    const situacoes = {
        em_analise: {
            tipo: "Crachá de recruta",
            cargo: "Recruta",
            faixa: '<i class="fa-solid fa-hourglass-half"></i> Ficha em análise',
            texto: "O esquadrão está avaliando a sua ficha. Você receberá o resultado por e-mail e WhatsApp."
        },
        aprovado: {
            tipo: "Crachá de recruta",
            cargo: "Recruta convocado",
            faixa: '<i class="fa-solid fa-circle-check"></i> Aprovado na 1ª etapa',
            texto: "Parabéns! Você passou na primeira etapa do alistamento. Compareça ao Quartel Sombra da Mata para o segundo teste."
        },
        recusado: {
            tipo: "Crachá de recruta",
            cargo: "Recruta",
            faixa: '<i class="fa-solid fa-circle-xmark"></i> Não aprovado',
            texto: "Desta vez sua ficha não foi aceita. A floresta continua precisando de guardiões: tente de novo no futuro."
        }
    };

    function formatarData(texto) {
        const data = new Date(texto);

        if (isNaN(data)) {
            return "-";
        }

        return data.toLocaleDateString("pt-BR") + " · " +
            data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    }

    function mostrarCracha(ficha) {
        const situacao = situacoes[ficha.status] || situacoes.em_analise;
        const numero = String(ficha.numero || 0).padStart(4, "0");

        crachaTipo.textContent = situacao.tipo;
        crachaNome.textContent = ficha.nome;
        crachaRegistro.textContent = situacao.cargo + " · Ficha nº " + numero;
        crachaDadoNome.textContent = ficha.nome;
        crachaDadoEmail.textContent = ficha.email;
        crachaDadoData.textContent = formatarData(ficha.enviado_em);
        crachaFaixa.innerHTML = situacao.faixa;
        crachaExplicacao.textContent = situacao.texto;

        cracha.classList.toggle("aprovado", ficha.status === "aprovado");
        cracha.classList.toggle("recusado", ficha.status === "recusado");

        convocacao.classList.toggle("visivel", ficha.status === "aprovado");

        if (statusAnterior !== null && statusAnterior !== ficha.status) {
            cracha.classList.remove("mudou");
            void cracha.offsetWidth;
            cracha.classList.add("mudou");
        }
        statusAnterior = ficha.status;

        crachaAtualizado.textContent = "Atualizado às " +
            new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) +
            " · atualiza sozinho a cada 30 segundos";

        pagina.classList.add("logado");
    }

    botaoAtualizar.addEventListener("click", async () => {
        if (ultimaConsulta === null) {
            return;
        }

        botaoAtualizar.disabled = true;
        botaoAtualizar.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Atualizando...';

        await consultar(ultimaConsulta.email, ultimaConsulta.senha);

        botaoAtualizar.disabled = false;
        botaoAtualizar.innerHTML = '<i class="fa-solid fa-rotate"></i> Atualizar resultado';
    });

    botaoSair.addEventListener("click", () => {
        ultimaConsulta = null;
        statusAnterior = null;

        try {
            sessionStorage.removeItem(CHAVE_LOGIN);
        } catch (erro) {
        }

        pagina.classList.remove("logado");
        entrarEmail.focus();
    });

    let loginGuardado = null;

    try {
        loginGuardado = JSON.parse(sessionStorage.getItem(CHAVE_LOGIN));
    } catch (erro) {
    }

    if (loginGuardado) {
        consultar(loginGuardado.email, loginGuardado.senha, false);
    } else {
        const emailDoLink = new URLSearchParams(window.location.search).get("email");

        if (emailDoLink) {
            entrarEmail.value = emailDoLink;
            entrarSenha.focus();
        }
    }
}

// ===== Área do ADM =====
function iniciarAdm() {
    // Endereços dos webhooks
    const WEBHOOK_ADM_LOGIN = "https://howlingantelope-n8n.cloudfy.live/webhook/admlogin";
    const WEBHOOK_ADM_DECIDIR = "https://howlingantelope-n8n.cloudfy.live/webhook/admdecidir";

    ligarTemaPaginaInterna();

    // Entrar como ADM
    const paginaAdm = document.getElementById("pagina-adm");
    const formAdm = document.getElementById("form-adm");
    const admEmail = document.getElementById("adm-email");
    const admSenha = document.getElementById("adm-senha");
    const admFalha = document.getElementById("adm-falha");
    const admFalhaTexto = document.getElementById("adm-falha-texto");
    const botaoAdmEntrar = document.getElementById("botao-adm-entrar");
    const admNome = document.getElementById("adm-nome");
    const admAtualizado = document.getElementById("adm-atualizado");
    const botaoAdmAtualizar = document.getElementById("botao-adm-atualizar");
    const botaoAdmSair = document.getElementById("botao-adm-sair");

    let credenciaisAdm = null;
    let fichas = [];
    let filtroAtual = "todos";

    function mostrarErroCampo(campo, mensagem) {
        const caixa = campo.closest(".campo");
        caixa.classList.toggle("erro", mensagem !== "");
        caixa.querySelector(".campo-erro").textContent = mensagem;
    }

    function mostrarFalhaAdm(texto) {
        admFalhaTexto.textContent = texto;
        admFalha.classList.add("visivel");
    }

    async function carregarPainel(email, senha) {
        const resposta = await fetch(WEBHOOK_ADM_LOGIN, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, senha: senha })
        });

        return resposta.json();
    }

    formAdm.addEventListener("submit", async (evento) => {
        evento.preventDefault();
        admFalha.classList.remove("visivel");

        const email = admEmail.value.trim();
        const senha = admSenha.value;

        mostrarErroCampo(admEmail, email === "" ? "Digite o e-mail do ADM." : "");
        mostrarErroCampo(admSenha, senha === "" ? "Digite a senha." : "");

        if (email === "" || senha === "") {
            return;
        }

        botaoAdmEntrar.disabled = true;
        botaoAdmEntrar.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Verificando...';

        try {
            const dados = await carregarPainel(email, senha);

            if (dados.sucesso === true) {
                credenciaisAdm = { email: email, senha: senha };
                admNome.textContent = dados.adm.nome;
                fichas = dados.fichas;
                formAdm.reset();
                paginaAdm.classList.add("logado");
                mostrarFichas();
            } else {
                mostrarFalhaAdm(dados.mensagem || "Acesso restrito: este e-mail e senha não são de um ADM.");
            }
        } catch (erro) {
            mostrarFalhaAdm("Não foi possível verificar agora. Verifique sua internet e tente de novo.");
        }

        botaoAdmEntrar.disabled = false;
        botaoAdmEntrar.innerHTML = '<i class="fa-solid fa-user-shield"></i> Entrar como ADM';
    });

    // Lista de fichas
    const listaFichas = document.getElementById("lista-fichas");
    const fichasVazio = document.getElementById("fichas-vazio");
    const botoesResumo = document.querySelectorAll(".resumo-item");

    const nomesStatus = {
        em_analise: "Em análise",
        aprovado: "Aprovada",
        recusado: "Recusada"
    };

    function formatarData(texto) {
        const data = new Date(texto);

        if (isNaN(data)) {
            return "-";
        }

        return data.toLocaleDateString("pt-BR") + " · " +
            data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    }

    function formatarWhatsapp(numero) {
        const n = String(numero || "");

        if (n.length === 11) {
            return "(" + n.slice(0, 2) + ") " + n.slice(2, 7) + "-" + n.slice(7);
        }
        if (n.length === 10) {
            return "(" + n.slice(0, 2) + ") " + n.slice(2, 6) + "-" + n.slice(6);
        }
        return n;
    }

    function criarDado(rotulo, valor) {
        const linha = document.createElement("div");
        linha.classList.add("dado");

        const nome = document.createElement("span");
        nome.textContent = rotulo;

        const conteudo = document.createElement("b");
        conteudo.textContent = valor;

        linha.appendChild(nome);
        linha.appendChild(conteudo);
        return linha;
    }

    function criarBotao(texto, classes, novoStatus, ficha) {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = classes;
        botao.innerHTML = texto;
        botao.addEventListener("click", () => decidir(ficha, novoStatus, botao));
        return botao;
    }

    function criarFichaAdm(ficha) {
        const card = document.createElement("article");
        card.classList.add("ficha-adm", ficha.status);

        const topo = document.createElement("div");
        topo.classList.add("ficha-adm-topo");

        const numero = document.createElement("span");
        numero.classList.add("ficha-adm-numero");
        numero.textContent = "Ficha nº " + String(ficha.numero).padStart(4, "0");

        const selo = document.createElement("span");
        selo.classList.add("selo-status", ficha.status);
        selo.textContent = nomesStatus[ficha.status] || ficha.status;

        topo.appendChild(numero);
        topo.appendChild(selo);

        const nome = document.createElement("h3");
        nome.textContent = ficha.nome;

        const motivo = document.createElement("p");
        motivo.classList.add("ficha-adm-motivo");
        motivo.textContent = "“" + ficha.motivo + "”";

        card.appendChild(topo);
        card.appendChild(nome);
        card.appendChild(criarDado("E-mail", ficha.email));
        card.appendChild(criarDado("WhatsApp", formatarWhatsapp(ficha.whatsapp)));
        card.appendChild(criarDado("Enviada em", formatarData(ficha.enviado_em)));

        if (ficha.decidido_por) {
            card.appendChild(criarDado("Decidida por", ficha.decidido_por));
        }

        card.appendChild(motivo);

        const acoes = document.createElement("div");
        acoes.classList.add("ficha-adm-acoes");

        const aprovar = criarBotao('<i class="fa-solid fa-check"></i> Aprovar', "botao-decisao botao-aprovar", "aprovado", ficha);
        const recusar = criarBotao('<i class="fa-solid fa-xmark"></i> Recusar', "botao-decisao botao-recusar", "recusado", ficha);
        aprovar.disabled = ficha.status === "aprovado";
        recusar.disabled = ficha.status === "recusado";

        acoes.appendChild(aprovar);
        acoes.appendChild(recusar);

        if (ficha.status !== "em_analise") {
            acoes.appendChild(criarBotao("Voltar para análise", "botao-reabrir", "em_analise", ficha));
        }

        card.appendChild(acoes);
        return card;
    }

    function mostrarFichas() {
        ["em_analise", "aprovado", "recusado"].forEach((status) => {
            const total = fichas.filter((ficha) => ficha.status === status).length;
            document.getElementById("total-" + status).textContent = total;
        });
        document.getElementById("total-todos").textContent = fichas.length;

        const visiveis = fichas.filter((ficha) => filtroAtual === "todos" || ficha.status === filtroAtual);

        listaFichas.innerHTML = "";
        visiveis.forEach((ficha) => {
            listaFichas.appendChild(criarFichaAdm(ficha));
        });

        fichasVazio.classList.toggle("visivel", visiveis.length === 0);

        admAtualizado.textContent = "Atualizado às " +
            new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) + ".";
    }

    botoesResumo.forEach((botao) => {
        botao.addEventListener("click", () => {
            filtroAtual = botao.dataset.filtro;
            botoesResumo.forEach((outro) => outro.classList.toggle("ativo", outro === botao));
            mostrarFichas();
        });
    });

    // Aprovar e recusar
    const avisoSalvo = document.getElementById("aviso-salvo");
    const avisoSalvoTexto = document.getElementById("aviso-salvo-texto");
    let tempoAviso;

    function mostrarAviso(texto) {
        avisoSalvoTexto.textContent = texto;
        avisoSalvo.classList.add("visivel");
        clearTimeout(tempoAviso);
        tempoAviso = setTimeout(() => avisoSalvo.classList.remove("visivel"), 2000);
    }

    async function decidir(ficha, novoStatus, botao) {
        const textoOriginal = botao.innerHTML;
        botao.disabled = true;
        botao.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

        try {
            const resposta = await fetch(WEBHOOK_ADM_DECIDIR, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: credenciaisAdm.email,
                    senha: credenciaisAdm.senha,
                    numero: ficha.numero,
                    status: novoStatus
                })
            });

            const dados = await resposta.json();

            if (dados.sucesso === true) {
                ficha.status = novoStatus;
                ficha.decidido_por = credenciaisAdm.email;
                mostrarFichas();

                const mensagens = {
                    aprovado: "Ficha aprovada: o recruta foi avisado",
                    recusado: "Ficha recusada: o recruta foi avisado",
                    em_analise: "Ficha voltou para análise"
                };
                mostrarAviso(mensagens[novoStatus]);
                return;
            }

            mostrarAviso(dados.mensagem || "Não foi possível salvar a decisão.");
        } catch (erro) {
            mostrarAviso("Sem conexão: a decisão não foi salva.");
        }

        botao.disabled = false;
        botao.innerHTML = textoOriginal;
    }

    // Atualizar e sair
    botaoAdmAtualizar.addEventListener("click", async () => {
        botaoAdmAtualizar.disabled = true;

        try {
            const dados = await carregarPainel(credenciaisAdm.email, credenciaisAdm.senha);

            if (dados.sucesso === true) {
                fichas = dados.fichas;
                mostrarFichas();
            }
        } catch (erro) {
            mostrarAviso("Sem conexão: não foi possível atualizar.");
        }

        botaoAdmAtualizar.disabled = false;
    });

    botaoAdmSair.addEventListener("click", () => {
        credenciaisAdm = null;
        fichas = [];
        paginaAdm.classList.remove("logado");
        admEmail.focus();
    });
}

// Qual página está aberta
if (document.getElementById("form-contato")) {
    iniciarFicha();
} else if (document.getElementById("form-entrar")) {
    iniciarMeuAlistamento();
} else if (document.getElementById("form-adm")) {
    iniciarAdm();
}
