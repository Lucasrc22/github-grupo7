Modelagem da Tabela "users"

A tabela "users" armazena os dados básicos dos usuários do sistema. Ela foi projetada para ser robusta, segura e fácil de expandir no futuro.

Estrutura da Tabela:
- id: Identificador único do usuário (chave primária, gerado automaticamente).
- name: Nome completo do usuário (obrigatório, até 100 caracteres).
- email: Endereço de e-mail (único e obrigatório, até 100 caracteres).
- password: Senha do usuário (armazenada como texto criptografado, obrigatório).
- birthdate: Data de nascimento (formato DATE, obrigatório).
- is_active: Indica se o usuário está ativo no sistema (booleano, padrão: TRUE).
- role: Define o papel do usuário (pode ser 'user' ou 'admin', padrão: 'user').
- created_at: Data e hora de criação do cadastro (definida automaticamente).
- updated_at: Data e hora da última atualização (atualizada automaticamente via trigger).

Trigger de Atualização:
Foi criada uma função e trigger chamada `update_user_updated_at`, que atualiza o campo `updated_at` automaticamente sempre que uma linha da tabela for alterada.

Esse esquema permite:
- Identificar e organizar usuários facilmente.
- Controlar permissões (via campo `role`).
- Realizar auditorias e rastrear alterações (com os campos `created_at` e `updated_at`).
- Adicionar novos campos no futuro sem reestruturar a base.

Arquivo relacionado:
- `create_tables.sql` → contém o código SQL da criação da tabela.
- `triggers.sql` → contém a função e trigger para atualização do campo `updated_at`.

Entrar no Banco de Dados no docker:
- 'docker exec -it myfetus-db psql -U myuser -d mydatabase'