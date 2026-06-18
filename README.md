# Payment Service - CI com GitHub Actions

## Sobre o projeto

Este repositório contém um pequeno serviço em Node.js responsável por registrar pagamentos e recuperar o último pagamento realizado. O projeto possui testes automatizados com Mocha e foi configurado com uma pipeline de Integração Contínua usando GitHub Actions.

## Objetivo da solução

A solução implementada atende aos seguintes pontos:

- Execução automática da pipeline a cada `push`.
- Execução manual da pipeline com `workflow_dispatch`.
- Execução agendada com `schedule`.
- Geração de relatório de testes com **Mochawesome**.
- Publicação do relatório como artefato da execução no GitHub Actions.
- Documentação da arquitetura e dos conceitos utilizados.

## Estrutura do projeto

```text
.
├── .github/
│   └── workflows/
│       └── ci.yml
├── src/
│   └── PaymentService.js
├── test/
│   └── PaymentService.test.js
├── package.json
└── README.md
```

## Regras de negócio testadas

A classe `PaymentService` possui duas responsabilidades principais:

- `performPayment(barcode, company, amount)`: registra um pagamento.
- `getLastPayment()`: retorna o último pagamento realizado.

A categorização do pagamento segue a regra:

- Valor **maior que 100** → categoria `cara`
- Valor **menor ou igual a 100** → categoria `padrão`

## Testes automatizados

Os testes cobrem os seguintes cenários:

1. Pagamento com valor maior que 100.
2. Pagamento com valor igual a 100.
3. Pagamento com valor menor que 100.
4. Recuperação do último pagamento realizado.

## Relatório de testes com Mochawesome

Foi adicionada uma execução específica para geração de relatório:

```json
"scripts": {
  "test": "npx mocha",
  "test:report": "npx mocha --reporter mochawesome --reporter-options reportDir=mochawesome-report,reportFilename=index,html=true,json=true"
}
```

Ao executar:

```bash
npm run test:report
```

são gerados arquivos na pasta `mochawesome-report/`, incluindo:

- `index.html`
- `index.json`

Esses arquivos são enviados como artefato da pipeline.

## Pipeline de CI

O workflow foi criado em:

```text
.github/workflows/ci.yml
```

### Gatilhos utilizados

A pipeline possui **um único workflow** com três formas de execução:

- `push`: executa automaticamente ao enviar alterações para o repositório.
- `workflow_dispatch`: permite execução manual pela interface do GitHub.
- `schedule`: executa de forma agendada.

### Etapas da pipeline

1. **Checkout do código** com `actions/checkout`.
2. **Configuração do Node.js** com `actions/setup-node`.
3. **Instalação das dependências** com `npm ci`.
4. **Execução dos testes** com geração de relatório via Mochawesome.
5. **Upload do artefato** com `actions/upload-artifact`.

## Como executar localmente

### Instalar dependências

```bash
npm install
```

### Rodar os testes

```bash
npm test
```

### Rodar os testes com relatório

```bash
npm run test:report
```

## Como acessar o relatório na pipeline

Após a execução do workflow no GitHub Actions:

1. Abra a execução desejada.
2. Vá até a seção de **Artifacts**.
3. Baixe o artefato `mochawesome-report`.
4. Extraia os arquivos e abra o `index.html` no navegador.

## Conceitos utilizados

### Integração Contínua (CI)

Integração Contínua é a prática de executar validações automáticas sempre que mudanças são enviadas ao repositório. Isso ajuda a detectar falhas rapidamente e aumenta a confiabilidade do código.

### GitHub Actions

GitHub Actions é a ferramenta de automação do GitHub para criação de pipelines. Neste projeto, ela foi usada para orquestrar a instalação, execução dos testes e publicação do relatório.

### Workflow único

O requisito de usar apenas um workflow foi atendido centralizando todos os gatilhos (`push`, `workflow_dispatch` e `schedule`) no mesmo arquivo `ci.yml`.

### Artefatos de pipeline

Artefatos são arquivos gerados durante a execução da pipeline e armazenados para consulta posterior. Neste projeto, o relatório do Mochawesome é preservado como evidência da execução dos testes.

### Mochawesome

Mochawesome é um reporter para Mocha que gera relatórios em HTML e JSON, facilitando a visualização dos resultados dos testes.
