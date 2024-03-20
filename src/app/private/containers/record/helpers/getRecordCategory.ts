import { IRecordCategory, recordCategories } from '../types/Record.type';

export const getRecordCategory = (
  urlPath: string,
): IRecordCategory | undefined =>
  recordCategories.find((category) => category.urlPath === urlPath);

export const getUnitForField = (
  urlPath: string,
  fieldName: string,
): string | undefined => {
  const category = getRecordCategory(urlPath);
  if (
    category &&
    category.fieldWithUnit &&
    fieldName in category.fieldWithUnit
  ) {
    return category.fieldWithUnit[fieldName];
  }
  return undefined;
};
