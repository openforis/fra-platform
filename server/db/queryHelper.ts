export const toUTCSelectParam = (column: any) => `TO_CHAR(${column},'YYYY-MM-DD"T"HH24:MI:ssZ') AS ${column}`

