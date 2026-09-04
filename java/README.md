# Java track

Track Java della repo di recruiting. Contiene gli stessi esercizi di **live coding** e **code analysis** della track TypeScript, tradotti in Java, con test in JUnit 5 (Mockito disponibile per il mocking).

---

## Prerequisiti

- JDK >= 21
- Maven >= 3.9

---

## Getting started

Compila il progetto:

```bash
mvn compile
```

Esegui tutti i test:

```bash
mvn test
```

---

## Struttura del progetto

```
.
├── live-coding/                          # Esercizio 1 da svolgere durante il colloquio
│   └── README.md
├── live-coding-2/                        # Esercizio 2 da svolgere durante il colloquio
│   └── README.md
├── code-analysis/                        # Codice da analizzare e rivedere durante il colloquio
│   └── User.java
├── src/
│   ├── main/java/com/recruiting/         # Il candidato implementa qui le soluzioni
│   │   ├── livecoding/
│   │   └── livecoding2/
│   └── test/java/com/recruiting/         # Il candidato scrive qui i test (JUnit 5 + Mockito)
│       ├── livecoding/
│       └── livecoding2/
└── pom.xml
```

### `live-coding/` e `live-coding-2/`

Contengono la traccia dell'esercizio. Il candidato implementa la soluzione durante il colloquio nel package indicato nel rispettivo README (`com.recruiting.livecoding` / `com.recruiting.livecoding2`, sotto `src/main/java` e `src/test/java`).

### `code-analysis/`

Contiene codice già scritto (non collegato alla build Maven) che il candidato deve leggere, analizzare e commentare criticamente (design, correttezza, edge case, sicurezza, ecc.). È la traduzione 1:1 di [`typescript/code-analysis/user.ts`](../typescript/code-analysis/user.ts), con gli stessi code smell.

---

## Stack tecnico

| Tool | Versione |
|------|----------|
| Java | >= 21 |
| Maven | >= 3.9 |
| JUnit | 5.11 (Jupiter) |
| Mockito | 5.15 |
