export const whereClause = `target -> 'value' -> 'calculated' is distinct from to_jsonb(true)`

// Repository folders are not shown in recent activity. Only repository items have a folderName
export const excludeFoldersClause = `target ->> 'folderName' is null`
