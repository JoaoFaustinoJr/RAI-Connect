# RAI Shadow — desenvolvimento isolado

O Shadow compartilha o projeto Supabase do Connect, mas usa somente tabelas `shadow_*`. Não usar tabelas, buckets, canais Realtime ou push do Connect.

## Estado
- Fundação SQL criada: `shadow_members`, `shadow_conversations`, `shadow_participants`, `shadow_messages`.
- RLS ativo; acesso a mensagens bloqueado para clientes até criação e teste de políticas específicas.
- Sem notificações, sem integração com conversas do Connect.
- Ainda não existe interface, PIN ou criptografia ponta a ponta implementados.

## Próximas etapas
1. Implementar adesão/autorização de membros e RLS de participantes sem recursão.
2. Implementar PIN de seis dígitos usando armazenamento seguro e limitação de tentativas; nunca armazenar PIN em texto simples.
3. Implementar criptografia no cliente e gestão segura de chaves antes de permitir mensagens.
4. Testar acesso cruzado com dois usuários autorizados e um não autorizado.
5. Integrar gesto de cinco toques no beija-flor apenas após testes; sem revelar acesso a não autorizados.
6. Não registrar assinaturas push nem incluir conteúdo em notificações.

Não publicar no branch `main` até validação de segurança.
