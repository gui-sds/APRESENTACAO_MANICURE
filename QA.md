# Verificação

Inventário de aceitação: identidade original GS RISE (logo, Manrope, preto/off-white/verde), apresentação, serviços, galeria ilustrativa, localização pendente ou Google Maps configurado, Instagram pendente ou link configurado, WhatsApp como contato, solicitação com serviço/data/horário/nome/observação, resumo e prévia sem número configurado.

Controles: navegação por âncoras; menu mobile abrir/fechar/link/Escape; seleção de serviço pela lista; formulário; modal de prévia abrir/fechar/Escape; Instagram e localização; topo e CTA mobile contextual.

Estados: formulário vazio, dia fechado, data passada, solicitação preenchida, prévia; configuração com dados reais simulados somente no navegador. Cenários adicionais: nome só com espaços e mudança de dia após selecionar horário.

Visual: primeira dobra e todas as seções em desktop 1440×960 e mobile 390×844; menor largura 320px, tablet e paisagem; imagens carregadas, fontes e animações assentadas, ausência de overflow.

Sem envio real de mensagens. A agenda não possui confirmação automática ou controle de vagas. Dados de configuração pendentes estão explicitamente identificados.

Resultado: `npm run check`, build estático e fluxo completo aprovados. Menu, prévia, contatos configurados por interceptação local, datas inválidas, nome com espaços e troca de data verificados. Desktop 1440×960, celular 390×844, 320×740, tablet 768×1024 e paisagem 844×390 sem overflow horizontal ou erros de JavaScript. Imagens e logo carregadas. Capturas de evidência em `.artifacts/` (não versionadas).
