# Consulta de Postos

App estático para consulta de postos por **estado**, **município** e **bairro**, gerado a partir da planilha `ConsultaEstabelecimento-25_05_2026(1).xlsx`.

## O que vem no projeto

- `index.html`: página principal
- `styles.css`: visual responsivo
- `app.js`: filtros, busca e renderização
- `data.js`: base com 597 registros

## Como rodar localmente

Basta abrir o arquivo `index.html` no navegador.

Opcionalmente, use um servidor local:

```bash
python -m http.server 3000
```

Depois acesse `http://localhost:3000`.

## Como hospedar na Vercel pelo GitHub

1. Crie um repositório no GitHub, por exemplo `consulta-postos`.
2. Envie todos os arquivos deste projeto para o repositório.
3. Acesse a Vercel e clique em **Add New > Project**.
4. Importe o repositório do GitHub.
5. Em framework, selecione **Other** ou deixe como projeto estático.
6. Deploy. Não precisa configurar comando de build.

## Observação

Por privacidade, o app exibe dados de localização e identificação do posto, mas não publica contato, telefone ou e-mail.
