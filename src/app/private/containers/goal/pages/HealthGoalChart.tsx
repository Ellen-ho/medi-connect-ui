import React, { useContext } from 'react';
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
import {
  IGetGoalDurationRecordsResponse,
  getGoalDurationRecords,
} from '../../../../../services/RecordService';
import { useParams, useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import { AuthContext } from '../../../../../context/AuthContext';
import NoDataFound from '../../../../../components/signs/NoDataFound';

const HealthGoalChart: React.FC = () => {
  const { id } = useParams();
  const { state } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const targetPatientId = searchParams.get('targetPatientId');

  const { data } = useSWR('getGoalDurationRecords', () =>
    getGoalDurationRecords({
      goalId: id as string,
      query: {
        targetPatientId: (targetPatientId || state.patientId) as string,
      },
    }),
  );

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Blood Pressure Records
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            {data ? (
              <LineChart
                data={data.bloodPressureRecordsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bloodPressureDate" />
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
              </LineChart>
            ) : (
              <NoDataFound />
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Blood Sugar Records
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            {data ? (
              <LineChart
                data={data.bloodSugarRecordsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bloodSugarDate" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="bloodSugarValue"
                  name="Blood Sugar Value"
                  stroke="#8884d8"
                />
              </LineChart>
            ) : (
              <NoDataFound />
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Glycated HemoGlobin Records
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            {data ? (
              <LineChart
                data={data.glycatedHemoglobinRecordsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="glycatedHemoglobinDate" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="glycatedHemoglobinValue"
                  name="Glycated Hemoglobin Value"
                  stroke="#8884d8"
                />
              </LineChart>
            ) : (
              <NoDataFound />
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Weight Records
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            {data ? (
              <LineChart
                data={data.weightRecordsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="weightDate" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="weightValueKg"
                  name="Weight Value Kg"
                  stroke="#8884d8"
                />
                <Line
                  type="monotone"
                  dataKey="bodyMassIndex"
                  name="BMI"
                  stroke="#82ca9d"
                />
              </LineChart>
            ) : (
              <NoDataFound />
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default HealthGoalChart;
