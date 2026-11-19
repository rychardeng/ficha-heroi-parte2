# Ficha de Herói: Jaguaretê, a Onça Verdadeira (Parte 2)

Projeto Prático (Parte 2) da disciplina de Tecnologia Web. É a mesma ficha da Parte 1, agora com JavaScript: o inventário é montado pelo código, os atributos e as missões podem ser alterados, e o formulário de contato virou um alistamento para o Esquadrão Sombra da Mata.

## O personagem

**Marcos Hedmar** é um soldado do Exército Brasileiro que, durante uma missão em um laboratório secreto na Floresta Amazônica, cai em um tanque de mutação e vira um homem-onça. O Exército o batiza de **Jaguaretê** (do tupi, "a onça verdadeira"). Promovido a sargento, ele comanda o **Esquadrão Sombra da Mata**, uma unidade secreta que protege a floresta. A história completa está na seção Sobre o Herói, no botão "Ver história completa".

## Como abrir

Abra a pasta no VS Code e clique em **Go Live** (extensão Live Server), ou dê dois cliques no `index.html`.

O envio do alistamento, a página "Meu alistamento" e a Área do ADM precisam de internet, porque conversam com o servidor (n8n + Supabase).

## Acesso à Área do ADM

Caso a professora queira visualizar a Área do ADM, basta clicar em **ADM** no menu e entrar com o acesso abaixo. Lá aparecem todas as fichas de alistamento enviadas, e é possível aprovar ou recusar cada uma.

- **E-mail:** sgtjaguarete@gmail.com
- **Senha:** MarcosHedemar24

## Estrutura de pastas

```
ficha-heroi-parte2/
├── index.html              (ficha do herói)
├── meu-alistamento.html    (o recruta consulta o resultado)
├── adm.html                (Área do ADM)
├── style.css
├── script.js
├── README.md
└── imagens/
```

Todo o JavaScript está em um único `script.js`. No final do arquivo, o código verifica qual página está aberta e só executa a parte daquela página.

## Funcionalidades em JavaScript

### Requisitos mínimos

1. **Menu responsivo:** no celular, o botão ☰ abre e fecha o menu alternando a classe `aberto` com `classList.toggle`. O ícone vira ✕ quando o menu está aberto. O menu também fecha ao clicar em um link, fora do menu ou na tecla Esc.
2. **Inventário dinâmico:** os 6 itens ficam em um array de objetos (nome, tipo, raridade, descrição e imagem). O `forEach` percorre o array e cria cada card com `createElement`. Tem filtro por **tipo** e por **raridade**, feito com `filter`, e um botão "Limpar" para voltar a mostrar tudo.
3. **Barra de XP:** cada missão tem um botão "Concluir" que soma XP, atualiza o contador e aumenta a largura da barra. Ao chegar em 100 XP, um `if` mostra a mensagem **"Nível up!"** e o nível sobe de 50 para 51 (promovido a Tenente). Missões concluídas podem ser desfeitas.
4. **Ver mais:** o botão da seção Sobre o Herói mostra e esconde os capítulos da história. O texto do botão troca entre "Ver história completa" e "Ver menos" com o operador ternário.
5. **Formulário (alistamento):** o `preventDefault()` impede o envio enquanto há erros. Todos os campos são obrigatórios, o e-mail é validado com regex, o WhatsApp tem máscara `(11) 91234-5678` e a senha precisa ter de 6 a 10 caracteres. Os erros aparecem em vermelho embaixo de cada campo, e a mensagem de sucesso aparece na tela, sem `alert()`.
6. **Transições com classes:** os estados visuais são classes trocadas pelo JS (`aberto`, `ativo`, `aberta`, `visivel`, `missao-concluida`, `campo-erro`), usando as transições do CSS da Parte 1.

### Requisitos adicionais

- **Contador dinâmico:** "X itens" é calculado a partir do array do inventário e muda com os filtros.
- **Modo claro/escuro:** o botão flutuante troca a classe `tema-claro` no `<body>`.
- **Scroll suave:** `scroll-behavior: smooth` no CSS, e o menu destaca a seção que está na tela.
- **Saudação por horário:** usa `new Date().getHours()` para mostrar "Bom dia", "Boa tarde" ou "Boa noite, agente".

### Outras funcionalidades

- **Atributos ajustáveis:** cada atributo tem botões − e + e também pode ser arrastado na barra. O **Overall** é a média dos 5 atributos. O botão "Redefinir padrão" volta aos valores originais.
- **Meu alistamento (`meu-alistamento.html`):** o recruta entra com e-mail e senha e vê um crachá com o status da ficha: em análise, aprovado ou recusado. O crachá se atualiza sozinho a cada 30 segundos.
- **Área do ADM (`adm.html`):** login restrito, lista de todas as fichas montada com `createElement`, filtros por status e botões para aprovar ou recusar.

## Pesquisa complementar

Funcionalidades que não foram vistas diretamente em aula:

- **localStorage:** guarda no navegador o tema escolhido, as missões concluídas e os valores dos atributos. Ao apertar F5, tudo continua como o usuário deixou. Os dados são salvos como texto com `JSON.stringify` e lidos de volta com `JSON.parse`.
- **sessionStorage:** mantém o login da página "Meu alistamento" enquanto a aba está aberta, para o F5 não deslogar.
- **fetch com async/await:** envia os dados do formulário para um webhook e espera a resposta do servidor antes de mostrar a mensagem de sucesso ou de erro. O `try/catch` trata a falta de internet.
- **n8n e Supabase:** o webhook é um fluxo no **n8n** que valida os dados, salva a ficha em uma tabela do **Supabase** (banco de dados) e envia e-mail e WhatsApp para o recruta e para o ADM. A chave secreta do banco fica só no n8n, nunca no site.
- **setInterval:** consulta o status do alistamento a cada 30 segundos, e não consulta quando a aba está escondida (`document.hidden`).

## Decisões de UI/UX

Princípios da Parte 1 (estáticos):

- **Hierarquia visual:** o nome "Jaguaretê" é o maior texto da página e aparece logo na capa, ao lado da imagem do personagem.
- **Contraste e legibilidade:** fundo escuro com texto claro (WCAG AA). No modo claro, as cores foram ajustadas para manter o contraste nos botões e selos de raridade.
- **Área de toque (Lei de Fitts):** botões e links com no mínimo 44px de altura.
- **Proximidade (Gestalt):** ícone, nome, valor e barra de cada atributo ficam agrupados.

Princípios de interação (Parte 2):

- **Visibilidade do estado do sistema:** o ícone do menu troca ☰ ↔ ✕. Os filtros mostram a opção escolhida e quantos itens estão aparecendo. O botão de enviar mostra "Enviando..." enquanto espera o servidor. O crachá tem uma faixa de cor: amarela (em análise), verde (aprovado) e vermelha (recusado).
- **Feedback imediato:** concluir uma missão atualiza a barra de XP na hora. Mexer em um atributo atualiza o Overall com uma pequena animação. Ao salvar algo, aparece o aviso "Progresso salvo".
- **Prevenção de erros:** o formulário mostra o erro embaixo do campo, sempre em vermelho, antes de enviar. A máscara do WhatsApp evita números no formato errado. Se o e-mail já foi usado, aparece um aviso com o link para entrar em "Meu alistamento". O formulário nunca falha em silêncio: se a internet cair, aparece uma mensagem de falha.
- **Controle e liberdade do usuário:** o menu, a história e os filtros podem ser fechados ou desfeitos sem recarregar a página. Missões concluídas podem ser desfeitas, e os atributos e as missões têm botão "Redefinir".
- **Consistência com a Parte 1:** os novos estados (ativo, aberto, concluído, erro) usam as mesmas cores, bordas e transições das variáveis do `:root`. As páginas novas seguem o mesmo visual da ficha.

## Tecnologias

- HTML5 semântico, CSS3 (Flexbox, Grid, media queries, variáveis) e JavaScript em arquivo externo
- Google Fonts (Black Ops One, Barlow e Barlow Condensed) e ícones do Font Awesome
- n8n (webhooks) e Supabase (banco de dados)

## Autor

Rychard: projeto individual de Tecnologia Web.
