-- RAI Shadow — diagnóstico somente leitura.
-- Executar no SQL Editor do projeto Supabase R.A.I. Connect.
-- Não altera contas, dados ou permissões.
select tablename, rowsecurity
from pg_tables
where schemaname = 'public' and tablename like 'shadow_%'
order by tablename;

select tablename, policyname, cmd
from pg_policies
where schemaname = 'public' and tablename like 'shadow_%'
order by tablename, policyname;

select table_name, privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and grantee = 'authenticated'
  and table_name like 'shadow_%'
order by table_name, privilege_type;

-- Não há necessidade de consultar e-mails ou UUIDs neste diagnóstico.
