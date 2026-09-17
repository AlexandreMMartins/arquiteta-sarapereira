# Plano de crescimento - Sara Pereira Arquitetura

Data: 15 de setembro de 2026. Estado: implementação em curso; consultar IMPLEMENTACAO.md para funcionalidades disponíveis e dependências.

## Objetivo e pressupostos

Aumentar visitas relevantes e pedidos de potenciais clientes, acompanhando o percurso até reunião, proposta e adjudicação. Prioridade provisória: arquitetura residencial, remodelação/reabilitação e viabilidade de terrenos a partir de Tomar, com atuação noutras localidades (correção expressa da utilizadora). Confirmar serviços mais desejados, localidades efetivamente abrangidas e capacidade de resposta antes de fechar os textos.

Recomendação: reformular a experiência e criar várias páginas, mantendo o domínio e aproveitando a base Astro existente. Não há evidência nesta análise de que mudar de tecnologia ou domínio traga benefício comercial.

## Diagnóstico verificado

- Site publicado consultado diretamente e observado no navegador. Abertura visual cuidada, centrada no retrato e no título “Espaços com memória e futuro”. Falta indicação imediata da área geográfica.
- Serviços apresentados na mesma página, com detalhes num carrossel. Ausência de páginas de projetos, formulário e testemunhos na página observada.
- Projeto local: apenas homepage e página 404 em src/pages. Configuração de blog existente não corresponde a páginas públicas implementadas.
- Google Analytics sem identificador na configuração local. Existe identificação para verificação Google, mas isso não comprova acesso ou dados disponíveis na Search Console.
- Existem mecanismos de metadados, endereços canónicos, sitemap e otimização de imagens. Melhorar e validar os resultados, sem reconstruir tudo.
- robots.txt local permite rastreio e não anuncia o sitemap. A ferramenta web não conseguiu verificar robots/sitemap publicados; isso não prova falha do site.
- Componente local de transformação planta/modelo/visualização não apareceu no conteúdo publicado observado. Conciliar versões antes da implementação.
- Imagens de serviços descritas como representativas; transformação descrita como ilustrativa/fotorrealista. Autoria e associação a projetos reais por confirmar.
- A pesquisa encontrou o domínio pela marca. Não foram obtidos volumes de pesquisa, posições locais fiáveis, métricas de visitas ou conversão.
- Uma amostra local, Origam, apresenta portefólio e serviços detalhados. É referência de conteúdo, não demonstração de melhores resultados comerciais.

## Estrutura proposta

Menu: Projetos | Serviços | Sobre | Guias | Contacto.

- / - apresentação, seleção de projetos, necessidades do cliente, processo, Sara, prova social e contacto.
- /projetos - seleção de trabalhos reais.
- /projetos/[slug] - pedido inicial, contexto, intervenção, decisões, imagens, fase, localização aproximada, autoria e contacto.
- /servicos - visão global e encaminhamento por necessidade.
- /servicos/projetos-arquitetura - moradias e projetos de raiz.
- /servicos/remodelacao-reabilitacao - intervenção no existente.
- /servicos/viabilidade-terrenos - apoio antes da compra ou desenvolvimento do projeto.
- /servicos/levantamentos - página quando houver conteúdo suficiente e interesse comercial.
- /servicos/legalizacoes - apenas se confirmado como serviço efetivo e prioritário.
- /sobre - percurso, abordagem, formação e credenciais verificadas.
- /contactos - formulário, telefone, email e área de atuação.
- /guias e /guias/[slug] - conteúdos revistos pela arquiteta.
- /privacidade - informação correspondente ao tratamento de dados efetivamente implementado.

Execução e interiores podem integrar páginas relacionadas na primeira versão e ganhar páginas próprias quando justificado. Não criar páginas quase iguais por concelho nem publicar páginas vazias.

## Homepage e direção visual

1. Abertura com nome, arquitetura em Tomar e região, proposta de valor clara e imagem própria forte. Botões “Ver projetos” e “Falar sobre o meu projeto”.
2. Três projetos selecionados com contexto curto e fase claramente indicada.
3. Entradas por necessidade: construir casa, transformar uma casa, avaliar um terreno.
4. Processo em quatro passos, correspondentes ao serviço real, sem prometer prazos de entidades externas.
5. Sara e abordagem profissional: retrato, texto curto e ligação para Sobre.
6. Testemunhos autênticos, se disponíveis e autorizados.
7. Dúvidas frequentes e dois guias úteis, quando prontos.
8. Contacto simples e expectativa realista do que acontece a seguir.

Estética editorial de arquitetura: fotografias amplas, branco quente, tons de pedra, texto escuro, tipografia legível e uma cor de destaque. Preservar proximidade humana. Evitar tornar animações obrigatórias para chegar à informação. Substituir o carrossel como via principal de leitura por páginas de serviço.

Reutilizar o retrato se representar bem a Sara e tiver qualidade. Selecionar restantes imagens por autoria, relevância, resolução e coerência. Imagens geradas ou de banco só como ilustração claramente identificada; nunca como prova de obra realizada. Se não houver portefólio pronto, lançar serviços e apresentação primeiro e acrescentar trabalhos documentados depois.

## Contactos e confiança

Formulário: nome, email, telefone opcional, localidade do imóvel, serviço pretendido e mensagem. Permitir “Ainda não sei” no serviço. Não exigir documentos, orçamento ou dados completos do imóvel no primeiro contacto.

Implementar envio real com validação no servidor, proteção contra spam, estados de erro/sucesso e teste de receção. Explicar utilização dos dados e evitar dados pessoais nas ferramentas de estatísticas. Selecionar prestador de envio e configurar contas na fase de integração. Manter telefone e email acessíveis. Email no domínio é melhoria de apresentação opcional, dependente de configuração real.

## Pesquisa e promoção

### No site

- Associar cada página a uma necessidade distinta. Expressões iniciais a validar: arquiteta/arquiteto em Tomar, projeto de moradia em Tomar, remodelação/reabilitação em Tomar, análise de viabilidade de terreno.
- Títulos e descrições específicos, headings coerentes, ligações entre projetos/serviços/guias, imagens otimizadas e descrições adequadas.
- Dados estruturados coerentes com a informação pública verificada, sem inventar avaliações ou localização.
- Validar versão principal do domínio, redirecionamentos, sitemap, rastreio e indexação; preservar endereços existentes relevantes e redirecionar os que mudarem.
- Manter pré-visualização fora do índice e confirmar que essa restrição não passa para produção.

### Fora do site

- Verificar e completar Perfil de Empresa no Google: categoria, serviços, área de atuação, contactos, imagens reais e ligação ao site. Confirmar morada antes de publicar; não assumir informação de diretórios.
- Preparar processo para pedir avaliações a clientes reais. A comunicação aos clientes fica a cargo da Sara, salvo instrução explícita posterior.
- Cada projeto pode originar página, publicação no Instagram e atualização do perfil Google. Encaminhar para a página específica com identificação da origem.
- Explorar referências de parceiros reais e publicações locais relevantes, sem compra de ligações ou diretórios em massa.
- Campanha paga apenas como teste posterior, com orçamento e localidades definidos, após validar formulário e medição. Avaliar custo por contacto qualificado e por cliente; não definir investimento sem conhecer margem e capacidade.

### Conteúdos iniciais

1. O que preparar antes da primeira reunião com uma arquiteta?
2. O que verificar antes de comprar um terreno?
3. Que etapas tem um projeto de moradia?

Publicar inicialmente dois conteúdos completos, depois cerca de um por mês conforme capacidade. Temas de licenciamento/PDM/REN/RAN exigem fontes oficiais atuais, revisão técnica, data de atualização e distinção entre orientação geral e avaliação do caso concreto.

## Ordem de implementação e critérios de conclusão

| Fase | Entrega | Critério para concluir |
| --- | --- | --- |
| 1. Preparação | Prioridades comerciais, inventário de imagens, dados atuais e mapa de páginas | Conteúdo factual confirmado; dependências identificadas; registo de visitas/contactos existentes se acessível |
| 2. Design e textos | Homepage e modelos de serviço/projeto em computador e telemóvel | Atividade/localidade claras; contacto fácil; hierarquia visual consistente |
| 3. Construção | Homepage, Sobre, Contactos, três serviços prioritários e projetos disponíveis | Navegação funcional; ausência de conteúdo fictício; conteúdo importante acessível sem animações |
| 4. Integração | Formulário, medição, privacidade e preparação para pesquisa | Pedido de teste recebido; eventos apenas em sucesso real; nenhum dado pessoal nas estatísticas |
| 5. Verificação e publicação | Site revisto e disponibilizado no domínio existente | Links/imagens válidos; verificação de teclado, telemóvel e movimento reduzido; compilação e verificações relevantes aprovadas; cópia de segurança e possibilidade de reposição |
| 6. Promoção | Perfil Google, conteúdos e distribuição | Páginas específicas partilháveis, plano editorial e origem dos contactos identificável |

Fazer medições de desempenho em páginas representativas antes/depois. Não foi feito benchmark nesta análise: não afirmar que o site atual é lento. Controlar peso de imagens e scripts, sobretudo na animação local, que solicita antecipadamente todas as imagens da sequência.

## Medição após lançamento

- Antes: obter referência dos últimos 90 dias, se houver dados; caso contrário iniciar recolha e declarar ausência de histórico.
- Google: impressões, cliques e pesquisas sem o nome da marca; separar pesquisas informativas e comerciais.
- Site: visitas por origem, páginas de entrada, formulários recebidos com sucesso, cliques de telefone/email. Cliques não equivalem a contactos recebidos.
- Negócio: contactos qualificados, reuniões, propostas, adjudicações e valor, registados de forma simples.
- Contacto qualificado: serviço prestado, zona abrangida e intenção de avançar compatível com a atividade.
- Rever funcionamento na primeira semana; aquisição e páginas aos 30 dias; tendências e prioridades aos 60 e 90 dias. Comparar períodos equivalentes e evitar conclusões fortes com amostras pequenas.
- Definir metas numéricas de contactos/clientes depois de conhecer histórico e capacidade. Não prometer crescimento percentual ou posições sem dados.

## Dependências

Da Sara: serviços prioritários, localidades, imagens e autoria, descrições de projetos, credenciais, testemunhos autorizados e capacidade de resposta. Das contas: acesso à Search Console/Perfil de Empresa, estatísticas e prestador de envio quando necessário. Não pedir palavras-passe em conversa.

Sem essas respostas pode avançar o desenho, estrutura, modelos e textos provisórios baseados nos serviços existentes. Factos, testemunhos, novas promessas de serviço e portefólio aguardam validação antes da publicação.

## Fontes consultadas

- Site publicado: https://www.sarapereira-arquitetura.pt/
- Base local: src/pages/index.astro, src/navigation.ts, src/config.yaml, astro.config.ts, public/robots.txt, public/decapcms/config.yml e componente ProjectTransformation.
- Google SEO: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google pesquisa local: https://support.google.com/business/answer/7091?hl=pt
- Amostra de atelier local: https://www.origamgroup.com/

Limites: auditoria exploratória de conteúdo, estrutura e apresentação em computador. Não inclui auditoria completa de acessibilidade, teste de desempenho móvel, acesso a estatísticas privadas, validação de contas Google ou estudo quantitativo de palavras-chave.
