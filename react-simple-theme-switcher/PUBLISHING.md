# React Theme Switcher — Desenvolvimento, Testes e Publicação

Este documento explica como testar a biblioteca localmente usando `npm link` e `npm pack`, além de publicar o pacote no npm.

## 1. Estrutura dos projetos

Vamos considerar dois projetos:

```text
meus-projetos/
├── react-simple-theme-switcher/
│   ├── src/
│   ├── dist/
│   ├── package.json
│   └── vite.config.ts
│
└── meu-app/
    ├── src/
    ├── node_modules/
    └── package.json
```

- `react-simple-theme-switcher`: biblioteca que estamos desenvolvendo.
- `meu-app`: projeto React utilizado para testar a biblioteca.

---

# 2. Opção 1 — Testando com npm link

O `npm link` cria uma ligação simbólica entre os projetos.

Assim, podemos desenvolver a biblioteca e testar as alterações em outro projeto sem precisar reinstalar o pacote.

## Passo 1 — Entrar na pasta da biblioteca

```bash
cd meus-projetos/react-simple-theme-switcher
```

Confira se o `package.json` possui o nome correto:

```json
{
  "name": "react-simple-theme-switcher"
}
```

## Passo 2 — Criar a ligação global

```bash
npm link
```

## Passo 3 — Conectar ao projeto React

Abra outro terminal:

```bash
cd meus-projetos/meu-app
```

Execute:

```bash
npm link react-simple-theme-switcher
```

Agora o projeto React está conectado à biblioteca local.

## Passo 4 — Importar o componente

No projeto `meu-app`:

```tsx
import { ThemeSwitcher } from "react-simple-theme-switcher";
import "react-simple-theme-switcher/style.css";

function App() {
  return (
    <div>
      <h1>Testando minha biblioteca</h1>
      <ThemeSwitcher />
    </div>
  );
}

export default App;
```

## Passo 5 — Habilitar o build automático

Volte para a pasta da biblioteca:

```bash
cd meus-projetos/react-simple-theme-switcher
```

Execute:

```bash
npm run build -- --watch
```

O Vite ficará monitorando os arquivos e atualizará o conteúdo da pasta `dist` quando houver alterações.

## Passo 6 — Executar o projeto de teste

Em outro terminal:

```bash
cd meus-projetos/meu-app
npm run dev
```

Agora teremos dois terminais:

**Terminal 1 — Biblioteca:**

```bash
npm run build -- --watch
```

**Terminal 2 — Projeto React:**

```bash
npm run dev
```

O fluxo será:

1. Modificar o componente na biblioteca.
2. O Vite atualiza o build.
3. O projeto React consome os arquivos atualizados.
4. Você verifica o resultado no navegador.

Não é necessário executar `npm install` novamente após cada alteração.

### Atenção: React duplicado

Como estamos utilizando links simbólicos, pode acontecer de o Vite resolver duas instalações diferentes do React.

Para evitar problemas, configure o `vite.config.ts` do projeto consumidor:

```tsx
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  resolve: {
    dedupe: ["react", "react-dom"],
  },
});
```

## Passo 7 — Desconectar a biblioteca

Dentro da pasta `meu-app`:

```bash
npm unlink react-simple-theme-switcher
```

Para remover também a ligação global:

```bash
cd ../react-simple-theme-switcher
npm unlink
```

---

# 3. Opção 2 — Testando com npm pack

O `npm pack` gera um arquivo compactado da biblioteca.

Essa opção permite testar o pacote como se ele tivesse sido instalado pelo npm.

## Passo 1 — Gerar o build

Entre na pasta da biblioteca:

```bash
cd meus-projetos/react-simple-theme-switcher
```

Execute:

```bash
npm run build
```

Confira se a pasta `dist` foi criada e contém os arquivos necessários.

## Passo 2 — Gerar o pacote

Execute:

```bash
npm pack
```

Será criado um arquivo semelhante a:

```text
react-simple-theme-switcher-1.0.0.tgz
```

## Passo 3 — Instalar no projeto React

Considere esta estrutura:

```text
meus-projetos/
├── react-simple-theme-switcher/
│   └── react-simple-theme-switcher-1.0.0.tgz
│
└── meu-app/
```

Entre na pasta do projeto consumidor:

```bash
cd ../meu-app
```

Execute:

```bash
npm install ../react-simple-theme-switcher/react-simple-theme-switcher-1.0.0.tgz
```

Entendendo o caminho:

- `..` significa voltar uma pasta.
- `react-simple-theme-switcher` é a pasta da biblioteca.
- `react-simple-theme-switcher-1.0.0.tgz` é o pacote gerado.

Não precisamos informar o caminho absoluto do computador.

## Passo 4 — Importar e testar

No projeto consumidor:

```tsx
import { ThemeSwitcher } from "react-simple-theme-switcher";
import "react-simple-theme-switcher/style.css";

function App() {
  return (
    <main>
      <h1>Testando o pacote compactado</h1>
      <ThemeSwitcher />
    </main>
  );
}

export default App;
```

Execute:

```bash
npm run dev
```

Verifique:

- Se o componente renderiza corretamente.
- Se o CSS é carregado.
- Se as funcionalidades funcionam.
- Se os tipos TypeScript estão disponíveis.
- Se não existem problemas com dependências.

## Passo 5 — Testar uma nova alteração

Quando modificar o código da biblioteca:

**Na biblioteca:**

```bash
npm run build
npm pack
```

**No projeto consumidor:**

```bash
npm install ../react-simple-theme-switcher/react-simple-theme-switcher-1.0.0.tgz
```

Se estiver reutilizando o mesmo arquivo e quiser forçar a reinstalação:

```bash
npm install --force ../react-simple-theme-switcher/react-simple-theme-switcher-1.0.0.tgz
```

Uma alternativa é remover a instalação anterior e instalar novamente.

Importante: se alterar a versão no `package.json`, o nome do arquivo `.tgz` também mudará.

---

# 4. Comparação entre as opções

| Característica                   | npm link     | npm pack |
| -------------------------------- | ------------ | -------- |
| Instalação local                 | Sim          | Sim      |
| Precisa publicar                 | Não          | Não      |
| Precisa gerar build              | Sim          | Sim      |
| Build automático                 | Com watch    | Não      |
| Reinstalar após alterações       | Não          | Sim      |
| Simula pacote publicado          | Parcialmente | Sim      |
| Melhor para desenvolvimento      | Sim          | Não      |
| Melhor para validar distribuição | Não          | Sim      |

**Recomendação:**

- Utilize `npm link` durante o desenvolvimento.
- Utilize `npm pack` antes de cada publicação.

---

# 5. Publicação no npm

Depois de desenvolver e testar sua biblioteca, podemos disponibilizá-la publicamente.

## Passo 1 — Criar uma conta

Acesse:

https://www.npmjs.com/signup

Crie sua conta no npm.

## Passo 2 — Fazer login pelo terminal

Entre na pasta da biblioteca:

```bash
cd meus-projetos/react-simple-theme-switcher
```

Execute:

```bash
npm login
```

Para conferir se está autenticado:

```bash
npm whoami
```

O terminal deverá retornar seu usuário do npm.

## Passo 3 — Verificar o nome do pacote

Confira o `package.json`:

```json
{
  "name": "react-simple-theme-switcher",
  "version": "1.0.0"
}
```

Consulte se o pacote existe:

```bash
npm view react-simple-theme-switcher
```

Se retornar `E404`, significa que o registro não encontrou esse pacote. Ainda é necessário confirmar a disponibilidade do nome no momento da publicação.

## Passo 4 — Conferir o package.json

Exemplo de configuração:

```json
{
  "name": "react-simple-theme-switcher",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./style.css": "./dist/style.css"
  },
  "peerDependencies": {
    "react": "^18.2.0 || ^19.0.0"
  }
}
```

Atenção:

- Configure a geração das declarações TypeScript.
- Verifique se os arquivos indicados realmente existem.
- Mantenha React como peer dependency.
- Verifique se o CSS está incluído no pacote.

## Passo 5 — Gerar o build final

```bash
npm run build
```

Verifique se todos os arquivos necessários estão dentro de `dist`.

## Passo 6 — Conferir os arquivos que serão publicados

Execute:

```bash
npm pack --dry-run
```

Esse comando mostra quais arquivos entrarão no pacote, sem gerar o arquivo `.tgz`.

Confira especialmente:

- JavaScript compilado.
- CSS.
- Declarações TypeScript.
- Arquivos necessários para importação.

## Passo 7 — Publicar

Para um pacote sem escopo:

```bash
npm publish
```

Para um pacote com escopo, por exemplo `@seuusuario/react-simple-theme-switcher`:

```bash
npm publish --access public
```

Pronto! Sua biblioteca estará publicada no npm.

## Passo 8 — Verificar a publicação

Execute:

```bash
npm view react-simple-theme-switcher
```

Você também pode acessar:

https://www.npmjs.com/package/react-simple-theme-switcher

## Passo 9 — Instalar em qualquer projeto

Em qualquer projeto React:

```bash
npm install react-simple-theme-switcher
```

Depois, utilize:

```tsx
import { ThemeSwitcher } from "react-simple-theme-switcher";
import "react-simple-theme-switcher/style.css";
```

---

# 6. Como atualizar uma versão publicada

Quando adicionar funcionalidades ou corrigir problemas, será necessário publicar uma nova versão.

O npm utiliza o versionamento semântico (SemVer).

| Tipo  | Exemplo       | Quando utilizar                   |
| ----- | ------------- | --------------------------------- |
| patch | 1.0.0 → 1.0.1 | Correções                         |
| minor | 1.0.0 → 1.1.0 | Novas funcionalidades compatíveis |
| major | 1.0.0 → 2.0.0 | Mudanças incompatíveis            |

### Atualização de correção

```bash
npm version patch
```

### Atualização de funcionalidade

```bash
npm version minor
```

### Atualização de versão principal

```bash
npm version major
```

Depois de atualizar a versão:

```bash
npm run build
npm pack --dry-run
npm publish
```

Importante: `npm version` cria um commit e uma tag Git por padrão. Certifique-se de que suas alterações estejam prontas antes de executá-lo.

Para atualizar a biblioteca no projeto consumidor:

```bash
npm update react-simple-theme-switcher
```

---

# 7. Fluxo de trabalho recomendado

## Durante o desenvolvimento

**Terminal 1 — Biblioteca:**

```bash
cd react-simple-theme-switcher

npm link

npm run build -- --watch
```

**Terminal 2 — Projeto de teste:**

```bash
cd meu-app

npm link react-simple-theme-switcher

npm run dev
```

## Antes de publicar

Dentro da biblioteca:

```bash
npm run build

npm pack --dry-run

npm pack
```

Instale e valide o arquivo `.tgz` em outro projeto React.

## Publicação

```bash
npm login

npm whoami

npm publish
```

## Atualizações futuras

```bash
npm version patch

npm run build

npm pack --dry-run

npm publish
```

---

# 8. Checklist antes da publicação

- [ ] Componente convertido para React.
- [ ] Props documentadas e tipadas.
- [ ] CSS compilado e disponível.
- [ ] React configurado como peer dependency.
- [ ] Build funcionando.
- [ ] Declarações TypeScript geradas.
- [ ] Testado com npm link.
- [ ] Testado com npm pack.
- [ ] README.md atualizado.
- [ ] LICENSE adicionada.
- [ ] package.json revisado.
- [ ] Nome do pacote verificado.
- [ ] Versão conferida.
- [ ] Pacote publicado no npm.

---

# 9. Referências oficiais

- npm link: https://docs.npmjs.com/cli/v11/commands/npm-link
- npm pack: https://docs.npmjs.com/cli/v11/commands/npm-pack
- npm publish: https://docs.npmjs.com/cli/v11/commands/npm-publish
- npm version: https://docs.npmjs.com/cli/v11/commands/npm-version
- Vite Library Mode: https://vite.dev/guide/build.html#library-mode

---

**Objetivo final:** desenvolver o React Theme Switcher localmente, testar em outro projeto React, validar o pacote compactado e publicar uma biblioteca reutilizável no npm.
