# Verificação

## Remoção do cabeçalho

Cabeçalho, seta e menu removidos; capa começa em y=0 e preenche 100svh. Conferidos desktop 1440×900 e celular 390×844: nenhuma faixa superior, rolagem horizontal ou erro de JavaScript. Selecionar Esmaltação em gel na lista continua preenchendo o formulário. Build e âncoras aprovados.

## Ajuste de cabeçalho e contato

Cabeçalho fino de 52px, com seta de 17px e menu de 19px, mantendo alvos de toque de 44px. Capa ocupa a altura restante da tela; botão Agendar meu momento removido da capa. Contatos reduzidos a dois ícones de 24px, centralizados lado a lado em faixa preta de 80px, com nomes acessíveis e destinos preservados.

Conferidos desktop 1440×900 e celular 390×844 por capturas; 320×740 e paisagem 844×390 sem rolagem horizontal ou conteúdo da capa cortado. Menu abre e fecha ao escolher Agendamento. Links de WhatsApp e Instagram, ausência do botão removido, cor e altura da faixa conferidos. Build aprovado e nenhum erro de JavaScript. Capturas em `.artifacts/revisao-compacta/`.

## Revisão de 13/11/2026

Aceitação: capa com foto em tela cheia, texto no canto inferior esquerdo e somente seta/menu no alto à direita. Remover logo do cabeçalho, estrelas, legenda da capa, faixa de frases, rodapé, CTA flutuante mobile e os textos de apoio indicados. Campo opcional com rótulo Observação. Dia e horário em linhas separadas no celular. Ícones do WhatsApp quadrados, preenchidos e sem contorno adicional.

Controles: menu abrir, selecionar seção e fechar; navegação pelo botão da capa; serviços que preenchem o formulário; formulário com data, horário, nome e observação; WhatsApp, Instagram e localização.

Verificado nesta revisão: build e âncoras; larguras 320, 390, 768, 844 em paisagem e 1440; capa e controles dentro da tela, imagem carregada, elementos removidos ausentes e nenhuma rolagem horizontal. Menu abre e fecha ao selecionar Agendamento. Domingo desabilita horários e apresenta aviso; nome com espaços é recusado; solicitação válida inclui serviço, data, horário, nome e observação. A abertura externa foi interceptada no navegador, sem envio real de mensagem. Nenhum erro de JavaScript observado. Capturas em `.artifacts/revisao-2026-11-13/`.

## Verificação da versão inicial

Inventário de aceitação: identidade original GS RISE (logo, Manrope, preto/off-white/verde), apresentação, serviços, galeria ilustrativa, localização pendente ou Google Maps configurado, Instagram pendente ou link configurado, WhatsApp como contato, solicitação com serviço/data/horário/nome/observação, resumo e prévia sem número configurado.

Controles: navegação por âncoras; menu mobile abrir/fechar/link/Escape; seleção de serviço pela lista; formulário; modal de prévia abrir/fechar/Escape; Instagram e localização; topo e CTA mobile contextual.

Estados: formulário vazio, dia fechado, data passada, solicitação preenchida, prévia; configuração com dados reais simulados somente no navegador. Cenários adicionais: nome só com espaços e mudança de dia após selecionar horário.

Visual: primeira dobra e todas as seções em desktop 1440×960 e mobile 390×844; menor largura 320px, tablet e paisagem; imagens carregadas, fontes e animações assentadas, ausência de overflow.

Sem envio real de mensagens. A agenda não possui confirmação automática ou controle de vagas. Dados de configuração pendentes estão explicitamente identificados.

Resultado: `npm run check`, build estático e fluxo completo aprovados. Menu, prévia, contatos configurados por interceptação local, datas inválidas, nome com espaços e troca de data verificados. Desktop 1440×960, celular 390×844, 320×740, tablet 768×1024 e paisagem 844×390 sem overflow horizontal ou erros de JavaScript. Imagens e logo carregadas. Capturas de evidência em `.artifacts/` (não versionadas).
