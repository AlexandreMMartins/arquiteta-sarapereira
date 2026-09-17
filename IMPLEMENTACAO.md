# Reformulação - estado e ativação

## Disponível

- Nova homepage e linguagem visual, mantendo os materiais do projeto.
- Tomar como base do atelier, sem restringir a área de trabalho.
- Seis páginas de serviços, página Sobre e sequência ilustrativa Abordagem.
- Três guias introdutórios, contactos e privacidade.
- Formulário com validação, escolha de serviço por ligação, preparação de email, revisão e cópia. Não simula envio nem apresenta uma confirmação falsa.
- Metadados por página, endereços canónicos no domínio existente, dados estruturados da atividade, sitemap e robots.
- Eventos `site:contact` sem dados pessoais para futura ligação a estatísticas. Nenhuma ferramenta de estatísticas é ativada sem configuração.

## Dependências para lançamento comercial completo

1. **Portefólio e testemunhos:** fornecer trabalhos identificados, imagens autorizadas, autoria, fase e descrição. A versão atual usa imagens identificadas como ilustrativas. Não contém projetos ou avaliações inventados.
2. **Envio direto:** a versão estática prepara um email para o visitante enviar. A função opcional `netlify/functions/contact.mjs` permite envio direto através de Resend num alojamento Netlify, depois de configurar os valores de `.env.example`. Num alojamento Sites estático, usar um endpoint equivalente no próprio domínio ou com política CORS apropriada. Nunca apontar PUBLIC_CONTACT_ENDPOINT para uma função inexistente. Validar envio real e atualizar privacidade antes da ativação. Incluir limitação de pedidos no alojamento e proteção adicional contra abuso antes de divulgar um endpoint público.
3. **Medição:** associar Search Console e Perfil de Empresa Google; decidir ferramenta de estatísticas, configurar a política de privacidade e eventual consentimento antes de a ativar. Os eventos atuais não são armazenados, não demonstram visitas e não permitem medir conversão por si só.
4. **Google e redes sociais:** completar os perfis com informação confirmada e ligar às páginas de serviço. Não foram alteradas contas externas nem publicadas mensagens.
5. **Revisão editorial:** validar os textos do atelier e dos guias com a Sara antes do lançamento no domínio público. Guias não alegam revisão técnica que ainda não aconteceu.

## Publicação

O domínio canónico existente é https://www.sarapereira-arquitetura.pt. A pré-visualização privada não substitui esse domínio nem altera DNS. Ao publicar no alojamento atual, manter os endereços existentes e verificar que o sitemap se encontra em /sitemap-index.xml. A configuração estática do Sites serve as páginas; não executa as funções Netlify.

## Preservação

Os componentes anteriores de transformação e respetivos recursos foram preservados. O novo percurso Abordagem usa imagens responsivas e texto acessível, sem depender de animação. Os ficheiros e dependências do projeto existente foram mantidos.

## Verificação realizada

- Compilação estática das 17 páginas e diagnóstico Astro sem erros.
- Verificação de links, recursos, âncoras e metadados das 17 páginas sem falhas.
- Verificação de estilo/código nos ficheiros novos e páginas.
- Dez verificações do contacto opcional: método, origem, conteúdo inválido, email, spam, serviço, configuração em falta, entrega simulada, destino fixo e falha do prestador. Nenhum email real enviado.
- Pré-visualização local respondeu com sucesso. Não foi realizado teste visual interativo de navegador nesta fase.

## Estado da publicação

A publicação privada não foi realizada: a autorização para guardar a versão no repositório foi recusada. As alterações permanecem locais, sem commit nem envio para o alojamento. O registo privado Sites foi criado, mas não tem versão publicada. O domínio público não foi alterado.
