import {
  createBloodPressureRecord,
  createBloodSugarRecord,
} from '../../../../../services/RecordService';
import * as yup from 'yup';

type FieldType = 'text' | 'number' | 'date';

interface IField {
  id: string;
  name: string;
  type: FieldType;
  placeholder: string;
}

export interface IRecordCategory {
  urlPath: string;
  name: string;
  subtitle: string;
  createRecordService: Function;
  formSchema: any;
  fields: IField[];
}

export const recordCategories: IRecordCategory[] = [
  {
    urlPath: 'blood-pressure',
    name: 'Blood Pressure',
    subtitle: 'Promote heart health by tracking BP.',
    createRecordService: () => createBloodPressureRecord,
    formSchema: yup
      .object({
        bloodPressureDate: yup.date().required(),
        systolicBloodPressure: yup.number().required(),
        diastolicBloodPressure: yup.number().required(),
        heartBeat: yup.string().required(),
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
        name: 'Systolic Blood Pressure',
        type: 'number',
        placeholder: 'Please Enter Systolic Blood Pressure',
      },
      {
        id: 'diastolicBloodPressure',
        name: 'Diastolic Blood Pressure',
        type: 'number',
        placeholder: 'Please Enter Diastolic Blood Pressure',
      },
      {
        id: 'heartBeat',
        name: 'Heart Beat',
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
    urlPath: 'blood-sugar',
    name: 'Blood Sugar',
    subtitle: 'Manage diabetes with regular glucose checks.',
    createRecordService: () => createBloodSugarRecord,
    formSchema: yup
      .object({
        // bloodPressureDate: yup.date().required(),
      })
      .required(),
    fields: [
      {
        id: 'bloodSugarLevel',
        name: 'Blood Sugar Level',
        type: 'number',
        placeholder: 'Please Enter Blood Sugar Level',
      },
    ],
  },
  {
    urlPath: 'exercise',
    name: 'Exercise',
    subtitle: 'Stay fit and motivated with exercise logs.',
    createRecordService: () => createBloodPressureRecord, // need change
    formSchema: yup
      .object({
        // bloodPressureDate: yup.date().required(),
      })
      .required(),
    fields: [
      {
        id: 'exerciseDuration',
        name: 'Exercise Duration',
        type: 'number',
        placeholder: 'Please Enter Exercise Duration',
      },
    ],
  },
  {
    urlPath: 'food',
    name: 'Food',
    subtitle: 'Maintain a balanced diet by recording meals.',
    createRecordService: () => createBloodPressureRecord, // need change
    formSchema: yup
      .object({
        // bloodPressureDate: yup.date().required(),
      })
      .required(),
    fields: [
      {
        id: 'foodType',
        name: 'Type of Food',
        type: 'text',
        placeholder: 'Please Enter Type of Food',
      },
    ],
  },
  {
    urlPath: 'glycated-hemoglobin',
    name: 'Glycated Hemoglobin',
    subtitle: 'Monitor long-term blood sugar with HbA1c levels.',
    createRecordService: () => createBloodPressureRecord, // need change
    formSchema: yup
      .object({
        // bloodPressureDate: yup.date().required(),
      })
      .required(),
    fields: [
      {
        id: 'hemoglobinLevel',
        name: 'Hemoglobin Level',
        type: 'number',
        placeholder: 'Please Enter Hemoglobin Level',
      },
    ],
  },
  {
    urlPath: 'sleep',
    name: 'Sleep',
    subtitle: 'Improve rest and productivity with sleep logs.',
    createRecordService: () => createBloodPressureRecord,
    formSchema: yup
      .object({
        // bloodPressureDate: yup.date().required(),
      })
      .required(),
    fields: [
      {
        id: 'sleepDuration',
        name: 'Sleep Duration',
        type: 'number',
        placeholder: 'Please Enter Sleep Duration',
      },
    ],
  },
  {
    urlPath: 'weight',
    name: 'Weight',
    subtitle: 'Support fitness goals by tracking weight.',
    createRecordService: () => createBloodPressureRecord,
    formSchema: yup
      .object({
        // bloodPressureDate: yup.date().required(),
      })
      .required(),
    fields: [
      {
        id: 'bodyWeight',
        name: 'Body Weight',
        type: 'number',
        placeholder: 'Please Enter Body Weight',
      },
    ],
  },
];
