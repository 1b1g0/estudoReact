# Somativa 1 - Login com Validacao

Implementacao em React com componente de classe:

- titulo `Login`;
- input de e-mail;
- input de senha;
- botao `Acessar`;
- label de mensagem;
- validacao de credenciais no clique.

Credenciais usadas:

- e-mail: `eduardo.lino@pucpr.br`
- senha: `123456`

## Rodar

```bash
npm install
npm run dev
```

## Rodar no Docker

```bash
docker build -t somativa1-login .
docker run --rm -p 8080:80 somativa1-login
```

## GitHub Actions

Os workflows ficam na raiz do repositorio, em `.github/workflows/`, e usam esta pasta do projeto como diretorio de trabalho.

- **CI** (`ci.yml`): em cada push ou pull request para `main`, instala dependencias com `npm ci` e roda `npm run build` para validar o build de producao.
- **CD** (`cd.yml`): no mesmo gatilho, repete o build e publica a pasta `dist` como artefato da execucao (entrega do pacote gerado).

Abra a aba **Actions** no GitHub para ver o historico das execucoes.
