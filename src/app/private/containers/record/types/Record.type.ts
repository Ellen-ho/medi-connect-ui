type FieldType = 'text' | 'number' | 'date';

interface IField {
  id: string;
  name: string;
  required: boolean;
  type: FieldType;
  placeholder: string;
}

export interface IRecordCategory {
  urlPath: string;
  name: string;
  subtitle: string;
  fields: IField[];
}
export const recordCategories: IRecordCategory[] = [
  {
    urlPath: 'blood-pressure',
    name: 'Blood Pressure',
    subtitle: 'Promote heart health by tracking BP.',
    fields: [
      {
        id: 'bloodPressureDate',
        name: 'Blood Pressure Date',
        required: true,
        type: 'date',
        placeholder: 'Please Enter Blood Pressure Date',
      },
      {
        id: 'systolicBloodPressure',
        name: 'Systolic Blood Pressure',
        required: true,
        type: 'number',
        placeholder: 'Please Enter Systolic Blood Pressure',
      },
      {
        id: 'diastolicBloodPressure',
        name: 'Diastolic Blood Pressure',
        required: true,
        type: 'number',
        placeholder: 'Please Enter Diastolic Blood Pressure',
      },
      {
        id: 'heartBeat',
        name: 'Heart Beat',
        required: true,
        type: 'number',
        placeholder: 'Please Enter Heart Beat',
      },
      {
        id: 'bloodPressureNote',
        name: 'Blood Pressure Note',
        required: false,
        type: 'text',
        placeholder: 'Please Enter Blood Pressure Note',
      },
    ],
  },
  {
    urlPath: 'blood-sugar',
    name: 'Blood Sugar',
    subtitle: 'Manage diabetes with regular glucose checks.',
    fields: [
      {
        id: 'bloodSugarLevel',
        name: 'Blood Sugar Level',
        required: true,
        type: 'number',
        placeholder: 'Please Enter Blood Sugar Level',
      },
    ],
  },
  {
    urlPath: 'exercise',
    name: 'Exercise',
    subtitle: 'Stay fit and motivated with exercise logs.',
    fields: [
      {
        id: 'exerciseDuration',
        name: 'Exercise Duration',
        required: true,
        type: 'number',
        placeholder: 'Please Enter Exercise Duration',
      },
    ],
  },
  {
    urlPath: 'food',
    name: 'Food',
    subtitle: 'Maintain a balanced diet by recording meals.',
    fields: [
      {
        id: 'foodType',
        name: 'Type of Food',
        required: true,
        type: 'text',
        placeholder: 'Please Enter Type of Food',
      },
    ],
  },
  {
    urlPath: 'glycated-hemoglobin',
    name: 'Glycated Hemoglobin',
    subtitle: 'Monitor long-term blood sugar with HbA1c levels.',
    fields: [
      {
        id: 'hemoglobinLevel',
        name: 'Hemoglobin Level',
        required: true,
        type: 'number',
        placeholder: 'Please Enter Hemoglobin Level',
      },
    ],
  },
  {
    urlPath: 'sleep',
    name: 'Sleep',
    subtitle: 'Improve rest and productivity with sleep logs.',
    fields: [
      {
        id: 'sleepDuration',
        name: 'Sleep Duration',
        required: true,
        type: 'number',
        placeholder: 'Please Enter Sleep Duration',
      },
    ],
  },
  {
    urlPath: 'weight',
    name: 'Weight',
    subtitle: 'Support fitness goals by tracking weight.',
    fields: [
      {
        id: 'bodyWeight',
        name: 'Body Weight',
        required: true,
        type: 'number',
        placeholder: 'Please Enter Body Weight',
      },
    ],
  },
];
