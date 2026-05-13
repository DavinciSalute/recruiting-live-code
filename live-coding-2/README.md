🏦 Esercizio — Transaction Limiter (20 min)

Contesto

Una banca digitale deve validare le transazioni in uscita di un utente prima di eseguirle. Ogni transazione ha un importo, una valuta e un tipo. Le regole di validazione dipendono dal profilo dell'utente.

Requisiti

Implementa una funzione validateTransaction che riceve una transazione e il profilo utente e restituisce un oggetto ValidationResult.

Regole di validazione, in ordine:

1. Saldo insufficiente — se transaction.amount > user.balance blocca con codice INSUFFICIENT_FUNDS
2. Limite giornaliero — la somma di tutte le transazioni già eseguite oggi più quella corrente non deve superare user.dailyLimit. Se supera, blocca con DAILY_LIMIT_EXCEEDED
3. Transazioni sospette — una transazione è sospetta se:
   - l'importo supera il 90% del saldo disponibile, e
   - è di tipo WIRE_TRANSFER
   In questo caso non blocca ma restituisce warnings: ['SUSPICIOUS_TRANSACTION']
4. Valuta non supportata — se transaction.currency non è tra quelle supportate dall'utente (user.allowedCurrencies), blocca con UNSUPPORTED_CURRENCY
5. Account bloccato — se user.status === 'blocked' blocca sempre con ACCOUNT_BLOCKED, indipendentemente da tutto il resto

⚠️ L'ordine conta: ACCOUNT_BLOCKED va controllato per primo, le altre regole nell'ordine indicato.
