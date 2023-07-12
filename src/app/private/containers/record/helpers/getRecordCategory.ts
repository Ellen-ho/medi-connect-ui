import { IRecordCategory, recordCategories } from '../types/Record.type';

export const getRecordCategory = (
  urlPath: string,
): IRecordCategory | undefined =>
  recordCategories.find((category) => category.urlPath === urlPath);
