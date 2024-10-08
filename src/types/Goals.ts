import { IBloodPressureValue } from '../services/GoalService';
import { BloodSugarType } from '../services/RecordService';
import { GenderType } from './Share';

export enum HealthGoalStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  ALL_GOALS_ACHIEVED = 'ALL_GOALS_ACHIEVED',
  PARTIAL_GOALS_ACHIEVED = 'PARTIAL_GOALS_ACHIEVED',
  GOAL_FAILED = 'GOAL_FAILED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}

export interface IHealthGoalResult {
  bloodPressure: IHealthGoalBloodPressureResultItem;
  bloodSugar: IHealthGoalResultItem;
  glycatedHemoglobin: IHealthGoalResultItem;
  weight: IHealthGoalResultItem;
}

export interface IHealthGoalBloodPressureResultItem {
  currentValue: IBloodPressureValue;
  goalAchieved: boolean;
  currentValueDate: Date;
}

export interface IHealthGoalResultItem {
  currentValue: number | null;
  goalAchieved: boolean;
  currentValueDate: Date;
}

export interface ITargetHealthGoal {
  id: string;
  bloodPressureTargetValue: IBloodPressureValue;
  bloodSugarTargetValue: number;
  bloodSugarTargetType: BloodSugarType;
  glycatedHemoglobinTargetValue: number;
  weightTargetValue: number;
  bodyMassIndexTargetValue: number;
  startAt: Date;
  endAt: Date;
  status: HealthGoalStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface IHealthGoalDetail {
  id: string;
  bloodPressureCurrentValue: IBloodPressureValue | null;
  bloodPressureTargetValue: IBloodPressureValue;
  bloodSugarCurrentValue: number | null;
  bloodSugarCurrentType: BloodSugarType | null;
  bloodSugarTargetValue: number;
  bloodSugarTargetType: BloodSugarType;
  glycatedHemoglobinCurrentValue: number | null;
  glycatedHemoglobinTargetValue: number;
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

export interface IHealthGoal {
  id: string;
  startAt: Date;
  endAt: Date;
  status: HealthGoalStatus;
  result: IHealthGoalResult | null;
  createdAt: Date;
}

export interface IGoalList {
  patientData: {
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: GenderType;
  };
  goalsData: Array<IHealthGoal>;
  pagination: {
    pages: number[];
    totalPage: number;
    currentPage: number;
    prev: number;
    next: number;
  };
}
