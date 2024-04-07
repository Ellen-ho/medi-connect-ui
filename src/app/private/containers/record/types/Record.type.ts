import * as yup from 'yup';
import {
  ExerciseType,
  FoodCategoryType,
  IntensityType,
  Language,
  SleepQualityType,
  createBloodPressureRecord,
  createBloodSugarRecord,
  createExerciseRecord,
  createFoodRecord,
  createGlycatedHemoglobinRecord,
  createSleepRecord,
  createWeightRecord,
} from '../../../../../services/RecordService';

type FieldType = 'text' | 'number' | 'date' | 'datetime-local' | 'select';

interface IField {
  id: string;
  name: string;
  type: FieldType;
  placeholder: string;
  options?: Array<{ label: string; value: string }>;
}
export interface ISubCategory {
  urlPath: string;
  name: string;
  subtitle: string;
  createRecordService: Function;
  formSchema: any;
  fields: IField[];
  fieldWithUnit: Record<string, string>;
}

export interface IRecordCategory {
  title: string;
  subCategories: Array<ISubCategory>;
}

export const recordCategories: IRecordCategory[] = [
  {
    title: 'Health Metrics',
    subCategories: [
      {
        fieldWithUnit: {
          systolicBloodPressure: 'mmHg',
          diastolicBloodPressure: 'mmHg',
          heartBeat: 'bpm',
        },
        urlPath: 'blood-pressure',
        name: 'Blood Pressure',
        subtitle: 'Promote heart health by tracking BP.',
        createRecordService: () => createBloodPressureRecord,
        formSchema: yup
          .object({
            bloodPressureDate: yup.date().required(),
            systolicBloodPressure: yup.number().min(0).required(),
            diastolicBloodPressure: yup.number().min(0).required(),
            heartBeat: yup.number().min(0).required(),
            bloodPressureNote: yup.string().max(250).optional(),
          })
          .required(),
        fields: [
          {
            id: 'bloodPressureDate',
            name: 'Blood Pressure Date',
            type: 'date',
            placeholder: 'Please Enter Blood Pressure Date',
          },
          {
            id: 'systolicBloodPressure',
            name: 'Systolic Blood Pressure (mmHg)',
            type: 'number',
            placeholder: 'Please Enter Systolic Blood Pressure',
          },
          {
            id: 'diastolicBloodPressure',
            name: 'Diastolic Blood Pressure (mmHg)',
            type: 'number',
            placeholder: 'Please Enter Diastolic Blood Pressure',
          },
          {
            id: 'heartBeat',
            name: 'Heart Beat (bpm)',
            type: 'number',
            placeholder: 'Please Enter Heart Beat',
          },
          {
            id: 'bloodPressureNote',
            name: 'Blood Pressure Note',
            type: 'text',
            placeholder: 'Please Enter Blood Pressure Note',
          },
        ],
      },
      {
        fieldWithUnit: {
          bloodSugarValue: 'mg/dl',
        },
        urlPath: 'blood-sugar',
        name: 'Blood Sugar',
        subtitle: 'Manage diabetes with regular glucose checks.',
        createRecordService: () => createBloodSugarRecord,
        formSchema: yup
          .object({
            bloodSugarDate: yup.date().required(),
            bloodSugarValue: yup.number().min(0).required(),
            bloodSugarNote: yup.string().max(250).optional(),
          })
          .required(),
        fields: [
          {
            id: 'bloodSugarDate',
            name: 'Blood Sugar Date',
            type: 'date',
            placeholder: 'Please Enter Blood Sugar Date',
          },
          {
            id: 'bloodSugarValue',
            name: 'Blood Sugar Value (mg/dl)',
            type: 'number',
            placeholder: 'Please Enter Blood Sugar Value',
          },
          {
            id: 'bloodSugarNote',
            name: 'Blood Sugar Note',
            type: 'text',
            placeholder: 'Please Enter Blood Sugar Note',
          },
        ],
      },
      {
        fieldWithUnit: {
          glycatedHemoglobinValuePercent: '%',
        },
        urlPath: 'glycated-hemoglobin',
        name: 'Glycated Hemoglobin',
        subtitle: 'Monitor long-term blood sugar with HbA1c levels.',
        createRecordService: () => createGlycatedHemoglobinRecord,
        formSchema: yup
          .object({
            glycatedHemoglobinDate: yup.date().required(),
            glycatedHemoglobinValuePercent: yup.number().min(0).required(),
          })
          .required(),
        fields: [
          {
            id: 'glycatedHemoglobinDate',
            name: 'Glycated Hemoglobin Date',
            type: 'date',
            placeholder: 'Please Enter Glycated Hemoglobin Date',
          },
          {
            id: 'glycatedHemoglobinValuePercent',
            name: 'Glycated Hemoglobin Value (%)',
            type: 'number',
            placeholder: 'Please Enter Glycated Hemoglobin Value Percent',
          },
        ],
      },
      {
        fieldWithUnit: {
          weightValueKg: 'kg',
        },
        urlPath: 'weight',
        name: 'Weight',
        subtitle: 'Support fitness goals by tracking weight.',
        createRecordService: () => createWeightRecord,
        formSchema: yup
          .object({
            weightDate: yup.date().required(),
            weightValueKg: yup.number().min(0).required(),
            weightNote: yup.string().optional(),
          })
          .required(),
        fields: [
          {
            id: 'weightDate',
            name: 'Weight Date',
            type: 'date',
            placeholder: 'Please Enter Weight Date',
          },
          {
            id: 'weightValueKg',
            name: 'weight Value (kg)',
            type: 'number',
            placeholder: 'Please Enter Weight Value Kg',
          },
          {
            id: 'weightNote',
            name: 'Weight Note',
            type: 'text',
            placeholder: 'Please Enter Weight Note',
          },
        ],
      },
    ],
  },
  {
    title: 'Life Style',
    subCategories: [
      {
        fieldWithUnit: {
          exerciseDurationMinute: 'min',
        },
        urlPath: 'exercise',
        name: 'Exercise',
        subtitle: 'Stay fit and motivated with exercise logs.',
        createRecordService: () => createExerciseRecord, // need change
        formSchema: yup
          .object({
            exerciseDate: yup.date().required(),
            exerciseType: yup
              .string()
              .oneOf(Object.values(ExerciseType))
              .required(),
            exerciseDurationMinute: yup.number().min(0).required(),
            exerciseIntensity: yup
              .string()
              .oneOf(Object.values(IntensityType))
              .required(),
            exerciseNote: yup.string().max(250).optional(),
          })
          .required(),
        fields: [
          {
            id: 'exerciseDate',
            name: 'Exercise Date',
            type: 'date',
            placeholder: 'Please Enter Exercise Date',
          },
          {
            id: 'exerciseType',
            name: 'Exercise Type',
            type: 'select',
            options: Object.values(ExerciseType).map((value) => ({
              label: value,
              value: value,
            })),
            placeholder: 'Please Choose Exercise Type',
          },
          {
            id: 'exerciseDurationMinute',
            name: 'Exercise Duration (min)',
            type: 'number',
            placeholder: 'Please Enter Exercise Duration Minute',
          },
          {
            id: 'exerciseIntensity',
            name: 'Exercise Intensity',
            type: 'select',
            options: Object.values(IntensityType).map((value) => ({
              label: value,
              value: value,
            })),
            placeholder: 'Please Enter Exercise Intensity',
          },
          {
            id: 'exerciseNote',
            name: 'Exercise Note',
            type: 'text',
            placeholder: 'Please Enter Exercise Note',
          },
        ],
      },
      {
        fieldWithUnit: {
          foodAmount: 'serve',
        },
        urlPath: 'food',
        name: 'Food',
        subtitle: 'Maintain a balanced diet by recording meals.',
        createRecordService: () => createFoodRecord,
        formSchema: yup
          .object({
            foodTime: yup.date().required(),
            foodCategory: yup
              .string()
              .oneOf(Object.values(FoodCategoryType))
              .required(),
            foodAmount: yup.number().min(0).required(),
            foodNote: yup.string().optional(),
          })
          .required(),
        fields: [
          {
            id: 'foodTime',
            name: 'The Time Eating Food',
            type: 'datetime-local',
            placeholder: 'Please Enter the Eating Time',
          },
          {
            id: 'foodCategory',
            name: 'The Food Category',
            type: 'select',
            options: Object.values(FoodCategoryType).map((value) => ({
              label: value,
              value: value,
            })),
            placeholder: 'Please Enter the Food Category',
          },
          {
            id: 'foodAmount',
            name: 'The Amount Of Food (one serving)',
            type: 'number',
            placeholder: 'Please Enter Amount Of Food',
          },
          {
            id: 'foodNote',
            name: 'Food Note',
            type: 'text',
            placeholder: 'Please Enter Food Note',
          },
        ],
      },
      {
        fieldWithUnit: {
          sleepDurationHour: 'hr',
        },
        urlPath: 'sleep',
        name: 'Sleep',
        subtitle: 'Improve rest and productivity with sleep logs.',
        createRecordService: () => createSleepRecord,
        formSchema: yup
          .object({
            sleepDate: yup.date().required(),
            sleepTime: yup.date().required(),
            wakeUpTime: yup.date().required(),
            sleepQuality: yup
              .string()
              .oneOf(Object.values(SleepQualityType))
              .required(),
            sleepNote: yup.string().optional(),
          })
          .required(),
        fields: [
          {
            id: 'sleepDate',
            name: 'Sleep Date',
            type: 'date',
            placeholder: 'Please Enter Sleep Date',
          },
          {
            id: 'sleepTime',
            name: 'Sleep Time',
            type: 'datetime-local',
            placeholder: 'Please Enter Sleep Time',
          },
          {
            id: 'wakeUpTime',
            name: 'Wake Up Time',
            type: 'datetime-local',
            placeholder: 'Please Enter Wake Up Time',
          },
          {
            id: 'sleepQuality',
            name: 'Sleep Quality',
            type: 'select',
            options: Object.values(SleepQualityType).map((value) => ({
              label: value,
              value: value,
            })),
            placeholder: 'Please Choose Sleep Quality',
          },
          {
            id: 'sleepNote',
            name: 'Sleep Note',
            type: 'text',
            placeholder: 'Please Enter Sleep Note',
          },
        ],
      },
    ],
  },
];
