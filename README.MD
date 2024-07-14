# Tecnologias usadas

## Frontend:
- [React](https://legacy.reactjs.org/) - Para construção da interface
- [@apollo/client](https://www.apollographql.com/docs/react/api/core/ApolloClient/) - Para fazer conexão com o backend (GraphQL).
- [socket.io-client](https://www.npmjs.com/package/socket.io-client) - Para comunicação em tempo real com o backend via WebSocket.
- [Material UI (MUI)](https://mui.com/components/) - Para construção rápida e estilizada de componentes.
- [Zod](https://zod.dev/) - Para validação de formulários
- [React-router-dom](https://v5.reactrouter.com/web/guides/quick-start) - Para navegação entre páginas.
- [TypeScript](https://www.typescriptlang.org/) - Para desenvolvimento com tipagem estática, melhorando a robustez do código.

## Backend (Mock):
- [GraphQL](https://graphql.org/) - Para modelo de comunicação eficiente.
- [Apollo Server](https://www.apollographql.com/docs/apollo-server) - Para implementação simples de um servidor graphql.
- [GraphQL Scalars](https://www.npmjs.com/package/graphql-scalars) - Para utilizar tipos personalizados no GraphQL.
- [Socket.io](https://socket.io/) - Para implementação simples de um websocket.
- [MongoDB](https://www.mongodb.com) - Para armazenamento de informações


# DECISÕES

### Antes de tudo, gostaria de deixar claro tomei a liberdade de padrozinar os espaçamentos, pois os apresentados no protótipo do Figma tinham algumas "imperfeições".

---

## Considerações gerais

#### O protótipo apresenta que o cliente poderia pagar a segunda parcela no cartão e que a entrada é no pix. Com base nisso, tomei a decisão de padrozinar o primeiro pagamento como pix SEMPRE e os demais no cartão. 

#### O tratamento de valores foi feito com números inteiros multiplicando os valores por 100. Ao exibir os valores em tela, eles são divididos por 100 e formatados em BRL pela função responsável
---

## Layout principal

#### Ficou notável no design que todas as telas possuiam um cabeçalho, contendo a logo da Woovi, e um rodapé que contém uma frase informando a seguridade da woovi ao cliente. Dito isso, eu implementei um Layout principal que, por padrão, contém o cabeçalho e o rodapé. Evitando repetição de código nas páginas.
---

## Home page

#### No figma não nos foi apresentado alguma espécie de página home, mas como percebi que na primeira tela haviam informações do cliente (nome que, por padrão, estava "João"), tomei a liberdade de implementar uma.

#### A homepage é simples, possui apenas um texto de boas vindas, dois campos para o cliente informar seu nome e cpf e um botão para proseguir.
#### Antes de prosseguir, o CPF e o nome são validados: CPF verificado por meio de cálculo (de validação do CPF) e o nome é verificado se não há caracteres não permitidos em nomes de pessoas

---


## Installments Page

#### Ao carregar, uma validação de dados é feita: se o usuário não tiver informado suas informações, ele é redirecionado para que o faça.

#### A página de parcelamentos faz uma requisição na API para coletar as opções de parcelamentos disponíveis. As opções foram feitas seguindo o que foi apresentado no design.

#### Como no Figma as opções se mostram selecionáveis, eu estranhei a falta de um botão de confirmação. Decidi implementar e adicionei 2 botões idênticos, um no topo e outro no fim para que, caso o usuário tenha descido muito na página, o botão inferior esteja acessível, e caso ele não tenha descido, o superior esteja acessível.

#### Os botões somente são habilitados após o usuário escolher uma opção.

---


## Payment Page

#### Ao carregar é feita uma validção se á o parâmetro "paymentId", que é o id que referencia o pagamento, caso não haja, o usuário é redirecionado para a home page.

#### A página verifica em qual parcela o usuário está, caso seja a primeira, o componente de pagamento por Pix é renderizado. Caso esteja nas demais, o formulário de pagamento por cartão é renderizado e, caso usuário tenha concluído o pagamento de todas as parcelas, aparece a confirmação de que todas parcelas foram pagas.

#### É verificado, também, se o prazo de validade do pagamento está expirado e, caso esteja, o usuário recebe um aviso informando o ocorrido.

## Simulation Page

#### Para simular a chamada da gateway de pagamentos no webhook do backend avisando que o pix foi pago, resolvi criar uma página.

#### A simulation page simula o pagamento pix (apenas a primeira parcela), enviando pro backend a informação de que o pix foi pago e, para avisar o frontend em tempo real, o backend se comunica através de um websocket.

---


[Repositório](https://github.com/Guilherme-Matosoli/woovi-challenge)
[Vídeo de demonstraçao](https://x.com/guimatosoli/status/1812564307101495541)