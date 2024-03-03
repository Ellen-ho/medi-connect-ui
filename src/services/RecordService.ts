import queryString from 'query-string';
import api from './ApiService';
import { GenderType } from '../types/Share';

interface IPatientData {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
}

interface IGetRecordRequest {
  urlPath: string;
  recordId: string;
  query: {
    targetPatientId: string;
  };
}

interface IGetRecordResponse {
  data: Record<string, any>;
}

interface IGetRecordsRequest {
  urlPath: string;
  query: {
    targetPatientId: string;
    startDate: string;
    endDate: string;
    page?: number;
    limit?: number;
  };
}

export interface IGetRecordsResponse<T> {
  patientData: IPatientData;
  recordsData: Array<T>;
  pagination: {
    pages: number[];
    totalPage: number;
    currentPage: number;
    prev: number;
    next: number;
  };
}

interface ICreateBloodPressureRecordRequest {
  bloodPressureDate: Date;
  systolicBloodPressure: number;
  diastolicBloodPressure: number;
  heartBeat: number;
  bloodPressureNote: string | null;
}

interface ICreateBloodPressureRecordResponse {
  id: string;
  bloodPressureDate: Date;
  systolicBloodPressure: number;
  diastolicBloodPressure: number;
  heartBeat: number;
  bloodPressureNote: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ICreateBloodSugarRecordRequest {
  bloodSugarDate: Date;
  bloodSugarValue: number;
  bloodSugarNote: string | null;
}

export enum BloodSugarType {
  FAST_PLASMA_GLUCOSE = 'FAST_PLASMA_GLUCOSE',
  POSTPRANDIAL_PLASMA_GLUCOSE = 'POSTPRANDIAL_PLASMA_GLUCOSE',
}

interface ICreateBloodSugarRecordResponse {
  id: string;
  bloodSugarDate: Date;
  bloodSugarValue: number;
  bloodSugarType: BloodSugarType;
  bloodSugarNote: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export enum ExerciseType {
  WALKING = 'WALKING',
  STRETCHING = 'STRETCHING',
  YOGA = 'YOGA',
  SLOW_DANCE = 'SLOW_DANCE',
  BICYCLE = 'BICYCLE',
  GOLF = 'GOLF',
  SWIMMING = 'SWIMMING',
  PING_PONG = 'PING_PONG',
  BASEBALL = 'BASEBALL',
  BADMINTON = 'BADMINTON',
  FAST_DANCE = 'FAST_DANCE',
  WEIGHT_TRAINING = 'WEIGHT_TRAINING',
  RUNNING = 'RUNNING',
  SPINNING_BIKE = 'SPINNING_BIKE',
  BASKETBALL = 'BASKETBALL',
  SOCCER = 'SOCCER',
  TENNIS = 'TENNIS',
  AEROBIC_EXERCISE = 'AEROBIC_EXERCISE',
}

export enum IntensityType {
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
}
interface ICreateExerciseRecordRequest {
  exerciseDate: Date;
  exerciseType: ExerciseType;
  exerciseDurationMinute: number;
  exerciseIntensity: IntensityType;
  exerciseNote: string | null;
}

interface ICreateExerciseRecordResponse {
  id: string;
  exerciseDate: Date;
  exerciseType: ExerciseType;
  exerciseDurationMinute: number;
  exerciseIntensity: IntensityType;
  kcaloriesBurned: number;
  exerciseNote: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export enum FoodCategoryType {
  FRUIT = 'FRUIT',
  VEGETABLE = 'VEGETABLE',
  RICE = 'RICE',
  NOODLE = 'NOODLE',
  BREAD = 'BREAD',
  OTHER_GRAINS = 'OTHER_GRAINS',
  DAIRY_PRODUCT = 'DAIRY_PRODUCT',
  MEAT = 'MEAT',
  FISH = 'FISH',
  SEAFOOD = 'SEAFOOD',
  EGG = 'EGG',
  SOY_MILK = 'SOY_MILK',
  SOY_PRODUCT = 'SOY_PRODUCT',
  NUT = 'NUT',
  JUICE = 'JUICE',
  SUGARY_DRINK = 'SUGARY_DRINK',
  SUGAR_FREE_DRINK = 'SUGAR_FREE_DRINK',
  ALCOHOLIC_BEVERAGE = 'ALCOHOLIC_BEVERAGE',
  SNACK = 'SNACK',
}

export enum Language {
  ZH_TW = 'zh-TW',
  EN_US = 'en-US',
}

export interface IFoodkcaloriesPerUnitItem {
  kcaloriesPerUnit: number;
  examples: Record<Language, string>;
}

export const foodKcaloriesPerUnitList: Record<
  FoodCategoryType,
  IFoodkcaloriesPerUnitItem
> = {
  [FoodCategoryType.FRUIT]: {
    kcaloriesPerUnit: 60,
    examples: {
      [Language.ZH_TW]: '1碗切塊8分滿, 1個女生拳頭大',
      [Language.EN_US]:
        "(one serving): Divided into 8 equal parts in a bowl, equivalent to the size of one girl's fist.",
    },
  },
  [FoodCategoryType.VEGETABLE]: {
    kcaloriesPerUnit: 25,
    examples: {
      [Language.ZH_TW]: '100g, 1/2碗葉菜類, 1碗筍類、瓜類、菇類, 1顆大蕃茄',
      [Language.EN_US]:
        '(one serving): 100g,1/2 bowl of leafy vegetables, 1 bowl of bamboo shoots, melons, and mushrooms, 1 large tomato.',
    },
  },
  [FoodCategoryType.NOODLE]: {
    kcaloriesPerUnit: 70,
    examples: {
      [Language.ZH_TW]: '1/2碗熟麵(60g), 水餃皮3張, 1/4個燒餅',
      [Language.EN_US]:
        '(one serving): 1/2 bowl of cooked noodles (60g), 3 pieces of dumpling wrappers, 1/4 of a baked sesame pancake.',
    },
  },
  [FoodCategoryType.RICE]: {
    kcaloriesPerUnit: 70,
    examples: {
      [Language.ZH_TW]:
        '1/4碗白飯(40g), 1/4碗糙米飯(40g), 1/4碗五穀飯(40g), 1/2碗稀飯(125g)',
      [Language.EN_US]:
        '(one serving): 1/4 bowl of white rice (40g), 1/4 bowl of brown rice (40g), 1/4 bowl of mixed grain rice (40g), 1/2 bowl of porridge (125g).',
    },
  },
  [FoodCategoryType.BREAD]: {
    kcaloriesPerUnit: 70,
    examples: {
      [Language.ZH_TW]: '1/3個中型麵包(30g), 1片薄吐司(30g), 1/3個饅頭(30g)',
      [Language.EN_US]:
        '(one serving): 1/3 medium-sized bread (30g), 1 slice of thin toast (30g), 1/3 steamed bun (30g).',
    },
  },
  [FoodCategoryType.OTHER_GRAINS]: {
    kcaloriesPerUnit: 70,
    examples: {
      [Language.ZH_TW]: '20g, 麥片3湯匙, 五穀粉2湯匙, 薏仁粉2湯匙',
      [Language.EN_US]:
        "(one serving): 20g, 3 tablespoons of oatmeal, 2 tablespoons of multigrain powder, 2 tablespoons of Job's tears powder.",
    },
  },
  [FoodCategoryType.MEAT]: {
    kcaloriesPerUnit: 75,
    examples: {
      [Language.ZH_TW]: '1/2~1/3手掌心大小',
      [Language.EN_US]: '(one serving): an apple',
    },
  },
  [FoodCategoryType.FISH]: {
    kcaloriesPerUnit: 75,
    examples: {
      [Language.ZH_TW]: '1/2~1/3手掌心大小',
      [Language.EN_US]:
        '(one serving): About half to one-third the size of your palm.',
    },
  },
  [FoodCategoryType.SEAFOOD]: {
    kcaloriesPerUnit: 75,
    examples: {
      [Language.ZH_TW]: '蝦仁6隻, 草蝦4隻, 文蛤6個',
      [Language.EN_US]: '(one serving): 6 shrimp, 4 mantis shrimp, 6 clams.',
    },
  },
  [FoodCategoryType.EGG]: {
    kcaloriesPerUnit: 75,
    examples: {
      [Language.ZH_TW]: '1顆',
      [Language.EN_US]: '(one serving): 1 piece.',
    },
  },
  [FoodCategoryType.DAIRY_PRODUCT]: {
    kcaloriesPerUnit: 120,
    examples: {
      [Language.ZH_TW]: '牛奶240c.c., 起司2片, 優酪乳240c.c., 奶粉3湯匙(25g)',
      [Language.EN_US]:
        '(one serving): 240ml of milk, 2 slices of cheese, 240ml of yogurt, 3 tablespoons of powdered milk (25g).',
    },
  },
  [FoodCategoryType.SOY_MILK]: {
    kcaloriesPerUnit: 75,
    examples: {
      [Language.ZH_TW]: '無糖豆漿190c.c.',
      [Language.EN_US]: '(one serving): 190ml of unsweetened soy milk.',
    },
  },
  [FoodCategoryType.SOY_PRODUCT]: {
    kcaloriesPerUnit: 75,
    examples: {
      [Language.ZH_TW]: '嫩豆腐半盒, 傳統豆腐兩小方格, 豆干1.5塊',
      [Language.EN_US]:
        '(one serving): Half a box of soft tofu, two small squares of traditional tofu, 1.5 pieces of dried tofu.',
    },
  },
  [FoodCategoryType.NUT]: {
    kcaloriesPerUnit: 45,
    examples: {
      [Language.ZH_TW]: '杏仁果5顆, 開心果15顆, 核桃仁2顆',
      [Language.EN_US]:
        '(one serving): Five almonds, fifteen pistachios, two walnut kernels.',
    },
  },
  [FoodCategoryType.JUICE]: {
    kcaloriesPerUnit: 60,
    examples: {
      [Language.ZH_TW]: '120c.c.',
      [Language.EN_US]: '(one serving): 120c.c.',
    },
  },
  [FoodCategoryType.SUGARY_DRINK]: {
    kcaloriesPerUnit: 60,
    examples: {
      [Language.ZH_TW]: '全糖150c.c., 半糖300c.c.',
      [Language.EN_US]: '(one serving): 150cc full sugar, 300cc half sugar.',
    },
  },
  [FoodCategoryType.SUGAR_FREE_DRINK]: {
    kcaloriesPerUnit: 0,
    examples: {
      [Language.ZH_TW]: '250c.c.(1杯)',
      [Language.EN_US]: '(one serving): 250cc (1 cup).',
    },
  },
  [FoodCategoryType.ALCOHOLIC_BEVERAGE]: {
    kcaloriesPerUnit: 125,
    examples: {
      [Language.ZH_TW]: '啤酒360c.c., 紅酒150c.c., 威士忌45c.c.',
      [Language.EN_US]:
        '(one serving): 360cc of beer, 150cc of red wine, 45cc of whisky.',
    },
  },
  [FoodCategoryType.SNACK]: {
    kcaloriesPerUnit: 245,
    examples: {
      [Language.ZH_TW]: '一個泡芙(100g), 10片餅乾(60g) 一片低糖戚風蛋糕.',
      [Language.EN_US]:
        '(one serving): One cream puff (100g), 10 cookies (60g), one slice of low-sugar sponge cake.',
    },
  },
};

interface ICreateFoodRecordRequest {
  foodTime: Date;
  foodCategory: FoodCategoryType;
  foodAmount: number;
  foodNote: string | null;
}

interface ICreateFoodRecordResponse {
  id: string;
  foodTime: Date;
  foodCategory: FoodCategoryType;
  foodAmount: number;
  kcalories: number;
  foodNote: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ICreateGlycatedHemoglobinRecordRequest {
  glycatedHemoglobinDate: Date;
  glycatedHemoglobinValuePercent: number;
}

interface ICreateGlycatedHemoglobinRecordResponse {
  id: string;
  glycatedHemoglobinDate: Date;
  glycatedHemoglobinValuePercent: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum SleepQualityType {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  POOR = 'POOR',
}
interface ICreateSleepRecordRequest {
  sleepDate: Date;
  sleepTime: Date;
  wakeUpTime: Date;
  sleepQuality: SleepQualityType;
  sleepNote: string | null;
}

interface ICreateSleepRecordResponse {
  id: string;
  sleepDate: Date;
  sleepTime: Date;
  wakeUpTime: Date;
  sleepQuality: SleepQualityType;
  sleepDurationHour: number;
  sleepNote: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ICreateWeightRecordRequest {
  weightDate: Date;
  weightValueKg: number;
  weightNote: string | null;
}

interface ICreateWeightRecordResponse {
  id: string;
  weightDate: Date;
  weightValueKg: number;
  bodyMassIndex: number;
  weightNote: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface IGetGoalDurationRecordsRequest {
  goalId: string;
  query: {
    targetPatientId: string;
  };
}
export interface IGetGoalDurationRecordsResponse {
  patientData: {
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: GenderType;
  };
  bloodPressureRecordsData:
    | Array<{
        id: string;
        systolicBloodPressure: number;
        diastolicBloodPressure: number;
        bloodPressureDate: string;
      }>
    | [];
  bloodSugarRecordsData:
    | Array<{
        id: string;
        bloodSugarValue: number;
        bloodSugarDate: string;
      }>
    | [];
  glycatedHemoglobinRecordsData:
    | Array<{
        id: string;
        glycatedHemoglobinValuePercent: number;
        glycatedHemoglobinDate: string;
      }>
    | [];
  weightRecordsData:
    | Array<{
        id: string;
        weightValueKg: number;
        bodyMassIndex: number;
        weightDate: string;
      }>
    | [];
}

export const getRecord = async ({
  urlPath,
  recordId,
  query,
}: IGetRecordRequest): Promise<IGetRecordResponse> => {
  const queries = queryString.stringify(query);
  const response = await api.get<IGetRecordResponse>(
    `/records/${urlPath}/${recordId}?${queries}`,
  );
  return response.data;
};

export const getRecords = async ({
  urlPath,
  query,
}: IGetRecordsRequest): Promise<
  IGetRecordsResponse<{
    id: string;
    date: string;
    [key: string]: any;
  }>
> => {
  const queries = queryString.stringify(query);
  const response = await api.get<
    IGetRecordsResponse<{ id: string; date: string; [key: string]: any }>
  >(`/records/${urlPath}?${queries}`);

  return response.data;
};

export const createBloodPressureRecord = async (
  data: ICreateBloodPressureRecordRequest,
): Promise<ICreateBloodPressureRecordResponse> => {
  const response = await api.post<ICreateBloodPressureRecordResponse>(
    '/records/blood-pressure',
    data,
  );
  return response.data;
};

export const createBloodSugarRecord = async (
  data: ICreateBloodSugarRecordRequest,
): Promise<ICreateBloodSugarRecordResponse> => {
  const response = await api.post<ICreateBloodSugarRecordResponse>(
    '/records/blood-sugar',
    data,
  );
  return response.data;
};

export const createExerciseRecord = async (
  data: ICreateExerciseRecordRequest,
): Promise<ICreateExerciseRecordResponse> => {
  const response = await api.post<ICreateExerciseRecordResponse>(
    '/records/exercise',
    data,
  );
  return response.data;
};

export const createFoodRecord = async (
  data: ICreateFoodRecordRequest,
): Promise<ICreateFoodRecordResponse> => {
  const response = await api.post<ICreateFoodRecordResponse>(
    '/records/food',
    data,
  );
  return response.data;
};

export const createGlycatedHemoglobinRecord = async (
  data: ICreateGlycatedHemoglobinRecordRequest,
): Promise<ICreateGlycatedHemoglobinRecordResponse> => {
  const response = await api.post<ICreateGlycatedHemoglobinRecordResponse>(
    '/records/glycated-hemoglobin',
    data,
  );
  return response.data;
};

export const createSleepRecord = async (
  data: ICreateSleepRecordRequest,
): Promise<ICreateSleepRecordResponse> => {
  const response = await api.post<ICreateSleepRecordResponse>(
    '/records/sleep',
    data,
  );
  return response.data;
};

export const createWeightRecord = async (
  data: ICreateWeightRecordRequest,
): Promise<ICreateWeightRecordResponse> => {
  const response = await api.post<ICreateWeightRecordResponse>(
    '/records/weight',
    data,
  );
  return response.data;
};

export const getGoalDurationRecords = async ({
  goalId,
  query,
}: IGetGoalDurationRecordsRequest): Promise<IGetGoalDurationRecordsResponse> => {
  const queries = queryString.stringify(query);
  const response = await api.get<IGetGoalDurationRecordsResponse>(
    `/records/goal/${goalId}?${queries}`,
  );
  return response.data;
};
