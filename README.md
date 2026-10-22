# Shenzhen Scrolls API 🐉

## O Conto da Livraria do Pescador
Há quarenta anos, Shenzhen era apenas uma pacata vila costeira onde pescadores remendavam suas redes ao pôr do sol. Hoje, é o epicentro do hardware e da inovação global, uma selva de vidro, aço e neon. No coração dessa metrópole cibernética, imprensada entre arranha-céus espelhados e letreiros holográficos, resiste um único edifício de madeira e telhas de barro: a **Livraria do Pescador**.

Durante décadas, ela guardou pergaminhos, contos folclóricos e literatura fantástica. Porém, a tradição física não está resistindo ao peso do avanço tecnológico. Com o tráfego de clientes caindo para quase zero, os herdeiros do clã fundador perceberam que a única forma de proteger seu legado é transcendendo para o plano digital. 

Para sobreviver, a antiga livraria renasce como **Shenzhen Scrolls**, uma plataforma digital de web novels. A missão agora é atrair mestres autores e leitores do mundo inteiro, oferecendo um refúgio seguro e de alta performance para a nova era da literatura.

## Como o Sistema Funciona?
A Shenzhen Scrolls é uma API RESTful construída para suportar o ecossistema de uma plataforma de literatura digital (focada em publicação seriada de capítulos). O sistema orquestra três pilares principais:
1. **Obras (Novels):** O acervo digital, contendo sinopses, capas e metadados.
2. **Capítulos:** O conteúdo em si, dividido entre consumo gratuito para atrair público e conteúdo bloqueado (Premium) para monetização.
3. **Identidade e Hierarquia:** O controle de quem consome e quem produz o conteúdo.

### Níveis de Cultivo (Acesso)
O sistema divide os usuários em classes estritas:
* **Visitante (Guest):** Pode navegar pelo catálogo e ler sinopses sem compromisso.
* **Leitor Free:** Usuário cadastrado que consome os capítulos abertos.
* **Mestre Autor:** O criador de conteúdo. Possui privilégios para criar novas obras e publicar capítulos.
* **Ancião (Admin):** Os guardiões da plataforma, com poder de moderação e veto sobre qualquer registro no banco de dados.

## A Arquitetura de Defesa (Segurança Avançada)
Como a Shenzhen Scrolls lida com propriedade intelectual valiosa e transações de usuários, a segurança tradicional baseada apenas em rotas foi descartada por ser vulnerável a falhas humanas no código.

A API utiliza uma arquitetura de segurança descentralizada focada em **ABAC (Attribute-Based Access Control)** através de um **Sidecar Policy Engine (Open Policy Agent - OPA)**. 

Em termos práticos:
* **Zero Lógica de Permissão nos Controllers:** A API em Express.js não decide quem pode acessar o quê. 
* **Validação na Borda:** Toda requisição passa por um *API Gateway*. O gateway extrai o token JWT e envia o contexto da ação para o motor do OPA.
* **Isolamento Total:** O OPA avalia matematicamente regras complexas em milissegundos (garantindo o isolamento estrito de inquilino) e devolve apenas um veredito de aprovação ou bloqueio (HTTP 403) antes mesmo da aplicação tocar no banco de dados.

## Tecnologias Utilizadas
* **Linguagem & Framework:** Node.js com Express.
* **Persistência:** MySQL.
* **Autenticação (AuthN):** JSON Web Tokens (JWT).
* **Autorização (AuthZ):** Open Policy Agent (OPA) utilizando políticas declarativas escritas em Rego.

## Requisitos para Execução
* **Node.js** (v18+) e **npm** instalados.
* **MySQL** executando localmente na porta 3306.
* **OPA Server** executando localmente na porta 8181 (pode ser executado via binário standalone ou container Docker).