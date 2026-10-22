# RAI Shadow — teste controlado em um aparelho

## Situação atual
O Connect publicado não inclui o Shadow. O código experimental está na branch `feature/rai-shadow-isolado`. O protótipo de PIN não protege mensagens reais.

## Antes de disponibilizar um endereço de teste
1. Conferir que o usuário autenticado está explicitamente habilitado em `shadow_members` (por padrão, ninguém está habilitado).
2. Conferir que o Connect experimental usa a mesma sessão Supabase do Connect normal.
3. Verificar que a entrada só aparece após cinco toques e autorização positiva; falhas de rede devem negar acesso.
4. Testar uma segunda conta sem autorização: não pode abrir a tela reservada.
5. Verificar que o Shadow não registra notificações, sons ou vibrações.
6. Verificar que sair ou minimizar destrói o iframe experimental e exige novo PIN.
7. Não enviar dados privados pelo protótipo: o PIN ainda não tem verificação segura no servidor, e não há criptografia ponta a ponta.
8. Só disponibilizar o teste por URL separada, com o aplicativo Connect principal preservado.

## Autorização administrativa (modelo, não executar automaticamente)
Identificar o usuário autenticado no painel Authentication do Supabase e usar seu UUID conferido. A concessão de acesso deve ser feita no painel administrativo, nunca por uma chamada do próprio navegador. Não incluir e-mail ou UUID pessoais em commits.

```sql
insert into public.shadow_members (user_id, enabled)
values ('UUID-VALIDADO-PELO-ADMINISTRADOR'::uuid, true)
on conflict (user_id) do update set enabled = excluded.enabled;
```

A concessão habilita apenas a descoberta da tela experimental. Não concede permissões de escrita nas tabelas de mensagens.
