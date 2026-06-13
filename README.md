# Домашнє завдання — Тема 11. Поведінкові патерни: Ланцюжок відповідальностей та Посередник

Система пакетної обробки структурованих JSON-записів трьох типів: `access_log`, `transaction`, `system_error`.

## Патерни

### Chain of Responsibility (Ланцюжок відповідальностей)
Для кожного типу запису будується власний ланцюг обробників через `AbstractHandler`. Кожен обробник або трансформує запис і передає далі, або кидає `Error` при невалідних даних:

| Тип запису | Ланцюг обробників |
|---|---|
| `access_log` | `TimestampParser` → `UserIdValidator` → `IpValidator` |
| `transaction` | `TimestampParser` → `AmountParser` → `CurrencyNormalizer` |
| `system_error` | `TimestampParser` → `LevelValidator` → `MessageTrimmer` |

### Mediator (Посередник)
`ProcessingMediator` — єдина точка збереження результатів. Отримує оброблені записи через `onSuccess()` і відхилені через `onRejected()`, делегуючи запис відповідному writer-у. Запис у файли відбувається лише після виклику `finalize()`.

## Структура проєкту

```
src/
├── chain/
│   ├── AbstractHandler.ts
│   ├── handlers/          # AmountParser, CurrencyNormalizer, IpValidator, ...
│   └── chains/            # AccessLogChain, TransactionChain, SystemErrorChain
├── mediator/
│   ├── ProcessingMediator.ts
│   └── writers/           # AccessLogWriter, TransactionWriter, ErrorLogWriter, RejectedWriter
├── models/
│   └── DataRecord.ts
└── main.ts
```

## Запуск

```bash
npm install
npx ts-node src/main.ts
```

Вхідні дані читаються з папки `data/`. Результати записуються у `output/`:
- `access_log.json`
- `transactions.json`
- `system_errors.json`
- `rejected.json`

## Приклад виводу

```
[INFO] Завантажено записів: 9
[INFO] Успішно оброблено: 4
[WARN] Відхилено з помилками: 5
[INFO] Звіт збережено у директорії output/
```
