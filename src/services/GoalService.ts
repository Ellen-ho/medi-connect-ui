import {
  HealthGoalStatus,
  IHealthGoalResult,
  ITargetHealthGoal,
} from '../types/Goals';
import { GenderType } from '../types/Share';
import api from './ApiService';
import { BloodSugarType } from './RecordService';
import queryString from 'query-string';

export interface IBloodPressureValue {
  systolicBloodPressure: number | null;
  diastolicBloodPressure: number | null;
}

interface IActivateHealthGoalRequest {
  healthGoalId: string;
}

interface IActivateHealthGoalResponse extends ITargetHealthGoal {}

interface IRejectHealthGoalRequest {
  healthGoalId: string;
}

interface IRejectHealthGoalResponse extends ITargetHealthGoal {}

interface IGetHealthGoalListRequest {
  query: {
    page: number;
    limit: number;
    targetPatientId: string;
  };
}

export interface IGetHealthGoalListResponse {
  patientData: {
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: GenderType;
  };
  goalsData: Array<{
    startAt: Date;
    endAt: Date;
    status: HealthGoalStatus;
    result: IHealthGoalResult | null;
  }>;
  pagination: {
    pages: number[];
    totalPage: number;
    currentPage: number;
    prev: number;
    next: number;
  };
}

interface IGetHealthGoalRequest {
  healthGoalId: string;
}

interface IGetHealthGoalResponse {
  id: string;
  bloodPressureCurrentValue: IBloodPressureValue | null;
  bloodPressureTargetValue: IBloodPressureValue;
  bloodSugarCurrentValue: number | null;
  bloodSugarCurrentType: BloodSugarType | null;
  bloodSugarTargetValue: number;
  bloodSugarTargetType: BloodSugarType;
  glycatedHemonglobinCurrentValue: number | null;
  glycatedHemonglobinTargetValue: number;
  weightCurrentValue: number | null;
  weightTargetValue: number;
  bodyMassIndexCurrentValue: number | null;
  bodyMassIndexTargetValue: number;
  startAt: Date;
  endAt: Date;
  status: HealthGoalStatus;
  result: IHealthGoalResult | null;
  createdAt: Date;
  updatedAt: Date;
}

export const createMultipleTimeSlots = async (
  data: IActivateHealthGoalRequest,
): Promise<IActivateHealthGoalResponse> => {
  const response = await api.patch<IActivateHealthGoalResponse>(
    `/goals/active/${data.healthGoalId}`,
  );
  return response.data;
};

export const rejectHealthGoal = async (
  data: IRejectHealthGoalRequest,
): Promise<IRejectHealthGoalResponse> => {
  const response = await api.patch<IRejectHealthGoalResponse>(
    `/goals/reject/${data.healthGoalId}`,
  );
  return response.data;
};

export const getHealthGoal = async (
  data: IGetHealthGoalRequest,
): Promise<IGetHealthGoalResponse> => {
  const response = await api.patch<IGetHealthGoalResponse>(
    `/goals/${data.healthGoalId}`,
  );
  return response.data;
};

export const getHealthGoalList = async (
  data: IGetHealthGoalListRequest,
): Promise<IGetHealthGoalListResponse> => {
  const queries = queryString.stringify(data.query);
  const response = await api.get<IGetHealthGoalListResponse>(
    `/goals?${queries}`,
  );
  return response.data;
};
