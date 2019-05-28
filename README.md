# Teste Fullstack

Escolha um dos dois pontos para desenvolvimento dependendo da sua preferência. Fazer os dois integrados entre si é um Bônus🏅.

O teste deve ser feito aqui github através de um fork desse repositório e ser compartilhado o link quando finalizado.



1. API JSON RESTful

Desenvolver uma API em Node.js utiliazando o framework Express com o CRUD de um modelo de Usuário. Para a persistência dos dados pode ser utilizado qualquer banco de dados, arquivo ou memória. Utilizar MongoDB é um Bônus🏅.

Deve ser utilizado os métodos HTTP GET, POST, PUT, PATCH e DELETE.

## Api desenvolvida com express e mongoose

rodar api na porta 3000 com mongodb

```
docker-compose up app
```

POST - signup do usuário
```
curl -X POST \
  http://localhost:3000/api/users/signup \
  -H 'content-type: application/json' \
  -d '{
	"name": "Nome Sobrenome",
	"birthday": "1992-05-13",
	"email": "email@email.com",
	"password": "password"
}'
```

POST - signin do usuário (retorna um json web token)
```
curl -X POST \
  http://localhost:3000/api/users/signin \
  -H 'content-type: application/json' \
  -d '{
	"email": "email@email.com",
	"password": "password"
}'
```


GET - info do usuário autenticado
```
curl -X GET \
  http://localhost:3000/api/users/me \
  -H 'x-access-token: {{TOKEN_DE_AUTENTICAÇÃO}}'
```


PUT/PATCH - update do usuário autenticado
```
curl -X PATCH \
  http://localhost:3000/api/users/ \
  -H 'content-type: application/json' \
  -H 'x-access-token: {{TOKEN_DE_AUTENTICAÇÃO}}' \
  -d '{
	"name": "Outro Nome"
}'
```


DELETE - delete do usuário autenticado
```
curl -X DELETE \
  http://localhost:3000/api/users/ \
  -H 'postman-token: c666427a-8d79-dce5-5f7d-0aa2391e2952' \
  -H 'x-access-token: {{TOKEN_DE_AUTENTICAÇÃO}}'
```

2. Interface para acesso de dados

Desenvolver a interface para suportar o CRUD do modelo de Usuário. As telas podem ser feitas com um template simples Bootstrap ou de qualquer outro framework. O sistema deve ser desenvolvido como um SPA utilizando algum dos frameworks Javascript. Desenvolver com Vue.js é um Bônus🏅.

Para a persistência dos dados pode ser utilizado qualquer coisa até mesmo o localstorage.

## Interface simples apenas 1 arquivo html/js/css com cdn do bootstrap e vuejs acessando a api criada


Modelo de Usuário

O modelo de usuário deve possuir os seguintes dados: Nome, e-mail, senha, data de nascimento, criado em (data), atualizado em (data). O nome dos campos e tipo de dado fica a seu critério.
