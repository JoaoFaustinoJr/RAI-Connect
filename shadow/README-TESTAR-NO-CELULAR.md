# Teste do RAI Shadow no celular

## Já é possível testar
- O arquivo `shadow/prototipo.html` funciona offline, com PIN **somente demonstrativo**.
- O arquivo `shadow/teste-entrada.html` testa a detecção de cinco toques com autorização simulada, quando servido por HTTP(S). Como ele importa `entry-gate.js`, **não funciona necessariamente abrindo via file://**.

## Ainda não disponível
- Link HTTPS implantado e verificado para a ramificação experimental.
- Autorização real da conta em `shadow_members`.
- Proteção do PIN por backend e criptografia ponta a ponta.

## Como testar com segurança
1. Não substituir nem desinstalar o Connect atual.
2. Testar o protótipo HTML local sem usar PIN pessoal.
3. Para a página `teste-entrada.html`, hospedar temporariamente a pasta da ramificação experimental num domínio de testes separado, sem alterar o GitHub Pages principal.
4. Não usar conversas privadas ou dados sensíveis na demonstração.
5. Somente depois de conferir identidade do usuário, conceder autorização administrativa no Supabase e validar políticas RLS.

**Importante:** o link `github.com/.../blob/...` mostra o código-fonte, não executa a interface. Não divulgar um endereço de teste não implantado como se estivesse funcional.
