import queryString from 'query-string';
import api from './ApiService';

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

interface IGetRecordsRequest {
  urlPath: string;
  query: {
    targetPatientId: string;
    page: number;
    limit: number;
  };
}

interface IGetRecordsResponse<T> {
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
  foodAmount: number; //Ask
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

export const getRecord = async ({
  urlPath,
  recordId,
  query,
}: IGetRecordRequest): Promise<IGetRecordsResponse<unknown>> => {
  const queries = queryString.stringify(query);
  const response = await api.get<IGetRecordsResponse<unknown>>(
    `/records/${urlPath}/${recordId}?${queries}`,
  );
  return response.data;
};

export const getRecords = async ({
  urlPath,
  query,
}: IGetRecordsRequest): Promise<IGetRecordsResponse<unknown>> => {
  const queries = queryString.stringify(query);
  const response = await api.get<IGetRecordsResponse<unknown>>(
    `/records/${urlPath}?${queries}`,
  );
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
