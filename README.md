# recruiting-live-code

Repo di supporto per i colloqui tecnici. Contiene esercizi di **live coding** e **code analysis**, disponibili in due track linguistiche equivalenti: **TypeScript** e **Java**.

Le due track propongono esattamente gli stessi esercizi (stessi requisiti di business, stessi code smell da individuare), ciascuna con lo stack di test idiomatico per il linguaggio.

---

## Struttura del progetto

```
.
├── typescript/          # Track TypeScript (Vitest)
│   ├── live-coding/
│   ├── live-coding-2/
│   ├── code-analysis/
│   ├── package.json
│   └── tsconfig.json
└── java/                 # Track Java (Maven, JUnit 5 + Mockito)
    ├── live-coding/
    ├── live-coding-2/
    ├── code-analysis/
    └── pom.xml
```

- **`live-coding/`** — Esercizio 1 ("Report spese per categoria") da svolgere durante il colloquio.
- **`live-coding-2/`** — Esercizio 2 ("Transaction Limiter") da svolgere durante il colloquio.
- **`code-analysis/`** — Codice già scritto (con code smell intenzionali) che il candidato deve leggere, analizzare e commentare criticamente.

Vedi il README della track scelta per i dettagli di setup ed esecuzione dei test:

- [typescript/README.md](typescript/README.md)
- [java/README.md](java/README.md)

---

## Quale track usare

Scegli la track in base allo stack del ruolo per cui si sta colloquiando. I due esercizi di live coding e il file di code analysis sono equivalenti tra le due track, quindi il livello di difficoltà e i segnali da osservare nel candidato sono gli stessi.
