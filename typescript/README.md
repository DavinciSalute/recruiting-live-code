# TypeScript track

Track TypeScript della repo di recruiting. Contiene esercizi di **live coding** e **code analysis** scritti in TypeScript, con test in Vitest.

---

## Prerequisiti

- Node.js >= 22
- npm >= 9

---

## Getting started

Installa le dipendenze:

```bash
npm install
```

Esegui tutti i test:

```bash
npm test
```

Esegui i test in modalità watch:

```bash
npm run test:watch
```

---

## Struttura del progetto

```
.
├── live-coding/          # Esercizio 1 da svolgere durante il colloquio
│   ├── README.md
├── live-coding-2/          # Esercizio 2 da svolgere durante il colloquio
│   ├── README.md
├── code-analysis/        # Codice da analizzare e rivedere durante il colloquio
│   ├── user-service.ts
├── package.json
└── tsconfig.json
```

### `live-coding/`

Contiene la traccia e il punto di partenza per l'esercizio di live coding. Il candidato implementa la soluzione qui durante il colloquio.

Vedi [live-coding/README.md](live-coding/README.md) per i dettagli del task corrente.

### `code-analysis/`

Contiene codice già scritto che il candidato deve leggere, analizzare e commentare criticamente (design, correttezza, edge case, ecc.).

---

## Stack tecnico

| Tool | Versione |
|------|----------|
| TypeScript | ^5.0 |
| Vitest | ^2.1 |
| Node.js | >= 22 |
