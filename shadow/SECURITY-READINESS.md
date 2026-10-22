# RAI Shadow — critérios antes de ativar

O protótipo público é somente demonstração e não protege mensagens reais.

## Condições obrigatórias

- [ ] Confirmar a identidade da conta autenticada sem publicar seu UUID ou credenciais.
- [ ] Autorizar explicitamente a conta em `shadow_members`, com RLS validada.
- [ ] Verificar acesso tanto no cliente quanto no servidor e revogar sessões abertas.
- [ ] Armazenar verificador de PIN resistente a ataques de força bruta, nunca PIN em texto puro.
- [ ] Implementar criptografia autenticada ponta a ponta antes de habilitar mensagens.
- [ ] Testar perda de foco, segundo plano, retorno e logout em Android e desktop.
- [ ] Testar isolamento entre usuários autorizados e não autorizados.
- [ ] Fazer revisão de segurança antes de integrar à página principal.

Nenhuma etapa acima é considerada concluída somente porque o protótipo abre com cinco toques.
