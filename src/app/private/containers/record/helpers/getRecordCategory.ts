import {
  IRecordCategory,
  ISubCategory,
  recordCategories,
} from '../types/Record.type';

export const getRecordCategory = (
  urlPath: string,
): ISubCategory | undefined => {
  const allSubCategories = recordCategories.flatMap(
    (category) => category.subCategories,
  );
  return allSubCategories.find((category) => category.urlPath === urlPath);
};

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
