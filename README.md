# GS RISE · Nail Studio

Site responsivo em HTML, CSS e JavaScript puro. Abra `index.html` ou execute `npm start` e acesse http://localhost:3000.

## Personalização

Edite `config.js` para inserir o WhatsApp da manicure, Instagram, endereço, horários, serviços e valores. Os contatos comerciais da agência GS RISE não são usados como contatos da manicure. Nenhum número ou endereço fictício recebe solicitações.

O formulário prepara uma mensagem de WhatsApp com serviço, data, horário e nome. É uma solicitação, não uma reserva: não há servidor de agenda nem disponibilidade em tempo real. A profissional confirma pelo WhatsApp. Os horários e serviços iniciais são exemplos configuráveis. Dados pessoais não são armazenados no navegador.

Sem WhatsApp configurado, o formulário exibe uma prévia da mensagem. Instagram e endereço ausentes aparecem como pendentes.

`npm run check` valida JavaScript, arquivos e links internos. `npm run build` gera `dist` para hospedagem estática. `npm start` serve o projeto sem dependências.

Logo e fonte originais de https://gsstudio-eight.vercel.app/. Fotografias ilustrativas; veja `assets/CREDITS.md`.
