import { DataSource } from 'meta/assessment/descriptionValue'

export const getDataSourceReviewTopicKey = (dataSource: DataSource): string => `dataSource_${dataSource.uuid}`
