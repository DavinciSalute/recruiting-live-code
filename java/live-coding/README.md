# Live coding challenge — Report spese per categoria

---

## Contesto

Il team finance ha bisogno di una funzione di libreria che elabori le transazioni esportate dal gestionale. La funzione verrà usata da più team, quindi l'interfaccia deve essere chiara e il comportamento ben definito anche nei casi limite.

---

## Requisiti di business

| ID | Requisito | Dettaglio |
|----|-----------|-----------|
| BR-01 | Raggruppamento per categoria | Il sistema riceve un elenco di transazioni. Ogni transazione appartiene a una categoria (es. "cibo", "trasporti"). L'output deve contenere esattamente una voce per categoria presente nell'input. |
| BR-02 | Totale speso per categoria | Per ogni categoria, il sistema deve calcolare la somma degli importi di tutte le transazioni associate. Gli importi possono essere negativi (es. rimborsi o storni) e devono essere inclusi nel calcolo. |
| BR-03 | Numero di transazioni | Per ogni categoria deve essere indicato quante transazioni la compongono. |
| BR-04 | Importo medio | Per ogni categoria deve essere riportato l'importo medio per transazione, calcolato sul totale effettivo (inclusi i negativi). |
| BR-05 | Data dell'ultima transazione | Per ogni categoria deve essere riportata la data della transazione più recente. Le date sono fornite in formato ISO 8601 (es. `"2024-03-15"`). |
| BR-06 | Input vuoto | Se non ci sono transazioni da elaborare, il sistema deve restituire un risultato vuoto senza errori. |

### Note aggiuntive

- **Ordine dell'output:** non è garantito. Chi chiama la funzione è responsabile di applicare eventuali ordinamenti.
- **Unicità degli id:** ogni transazione ha un identificativo univoco, ma la funzione non deve fare assunzioni su di esso ai fini dell'aggregazione.

---

## Indicazioni implementative (Java)

- Implementa la soluzione nel package `com.recruiting.livecoding` (`src/main/java/com/recruiting/livecoding`).
- Scrivi i test in `src/test/java/com/recruiting/livecoding`, con JUnit 5 (Mockito è disponibile se necessario, ma per questo esercizio probabilmente non serve mockare nulla).
- Le date possono essere modellate come `String` (ISO 8601) o come `java.time.LocalDate`: scegli tu, ma motiva la scelta.
