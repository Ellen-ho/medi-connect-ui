import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { IGetRecordsResponse } from '../../../../../services/RecordService';

interface ChartProps<T> {
  recordsData: {
    bloodPressure: IGetRecordsResponse<T>['recordsData'];
    bloodSugar: IGetRecordsResponse<T>['recordsData'];
    glycatedHemoglobin: IGetRecordsResponse<T>['recordsData'];
    weight: IGetRecordsResponse<T>['recordsData'];
  };
}

const Chart = <T extends {}>({ recordsData }: ChartProps<T>) => {
  const combinedData = [
    ...recordsData.bloodPressure,
    ...recordsData.bloodSugar,
    ...recordsData.glycatedHemoglobin,
    ...recordsData.weight,
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Health Records
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={combinedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="systolicBloodPressure"
              name="Systolic BP"
              stroke="#8884d8"
            />
            <Line
              type="monotone"
              dataKey="diastolicBloodPressure"
              name="Diastolic BP"
              stroke="#82ca9d"
            />
            <Line
              type="monotone"
              dataKey="bloodSugarValue"
              name="Blood Sugar"
              stroke="#ff7300"
            />
            <Line
              type="monotone"
              dataKey="glycatedHemoglobinValuePercent"
              name="Glycated Hemoglobin"
              stroke="#413ea0"
            />
            <Line
              type="monotone"
              dataKey="weightValueKg"
              name="Weight"
              stroke="#ff0000"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default Chart;
