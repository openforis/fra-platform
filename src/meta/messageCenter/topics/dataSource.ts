import { DataSource } from 'meta/assessment/descriptionValue/dataSource'

export const getDataSourceReviewTopicKey = (dataSource: DataSource): string => `dataSource_${dataSource.uuid}`
