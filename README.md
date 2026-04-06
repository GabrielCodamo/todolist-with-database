# Aplicação de Lista de Tarefas com Filtros

Esta é uma aplicação de lista de tarefas (To-Do List) desenvolvida com Next.js, React Hook Form, Zod para validação, Prisma como ORM e Shadcn/ui para componentes.

## Funcionalidades

- **Adicionar Tarefa**: Crie novas tarefas com nome, categoria e data de vencimento.
- **Visualizar Tarefas**: Exibe todas as tarefas cadastradas.
- **Filtrar Tarefas**: Filtra as tarefas por status (Concluídas, Pendentes, Atrasadas) e por termo de busca.
- **Atualizar Tarefa**: Edite tarefas existentes, alterando seu nome, categoria, data de vencimento e status.
- **Status da Tarefa**: As tarefas podem ter os status: `PENDING` (Pendente), `COMPLETED` (Concluída) e `LATE` (Atrasada).
- **Estatísticas**: Exibe o total de tarefas, tarefas concluídas, pendentes e atrasadas.

## Estrutura do Projeto

O projeto segue a estrutura de pastas comum de aplicações Next.js, com algumas adições:

- `src/app/page.tsx`: A página principal da aplicação, onde os componentes de input, filtros e lista de tarefas são renderizados.
- `src/components/inputtask/input.tsx`: Componente responsável pela criação e atualização de tarefas. Utiliza `react-hook-form` e `zod` para validação de formulário e um `Controller` para o componente de calendário.
- `src/components/taskfilters/taskfilters.tsx`: Componente para filtrar tarefas por status e por termo de busca. Atualiza os parâmetros de busca na URL para refletir os filtros selecionados.
- `src/components/taskcard/task.tsx`: Componente que exibe as estatísticas gerais das tarefas (total, concluídas, pendentes, atrasadas).
- `src/components/taslitem/taskitem.tsx`: Componente que lista as tarefas. (Este componente não foi lido, mas inferido a partir de `src/app/page.tsx`)
- `src/components/inputtask/_actions/createTask.ts` e `src/components/inputtask/_actions/updateTask.ts`: Server Actions para criar e atualizar tarefas, respectivamente, interagindo diretamente com o banco de dados via Prisma.
- `prisma/schema.prisma`: Define o esquema do banco de dados, incluindo o modelo `Task` e o `TaskStatus` enum.
- `src/app/layout.tsx`: O layout raiz da aplicação, definindo a estrutura HTML e importando as fontes e estilos globais.

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/): Framework React para desenvolvimento web.
- [React](https://react.dev/): Biblioteca JavaScript para construção de interfaces de usuário.
- [TypeScript](https://www.typescriptlang.org/): Superset de JavaScript que adiciona tipagem estática.
- [React Hook Form](https://react-hook-form.com/): Biblioteca para gerenciamento de formulários no React.
- [Zod](https://zod.dev/): Biblioteca de declaração e validação de esquemas.
- [Prisma](https://www.prisma.io/): ORM para Node.js e TypeScript.
- [Shadcn/ui](https://ui.shadcn.com/): Coleção de componentes UI reutilizáveis.
- [Tailwind CSS](https://tailwindcss.com/): Framework CSS utilitário para estilização.

## Configuração e Instalação

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd todolist-with-database
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o banco de dados:
   Certifique-se de ter um banco de dados PostgreSQL configurado e atualize a variável de ambiente `DATABASE_URL` no arquivo `.env` com suas credenciais de conexão.

   ```
   DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
   NEXT_PUBLIC_HOST_URL="http://localhost:3000"
   ```

4. Execute as migrações do Prisma:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

A aplicação estará disponível em `http://localhost:3000`.