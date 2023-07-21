import { Interface } from 'readline';
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
  glycatedHemonglobin: IHealthGoalResultItem;
  weight: IHealthGoalResultItem;
}

export interface IHealthGoalBloodPressureResultItem {
  currentValue: IBloodPressureValue;
  goalAchieved: boolean;
  currentValueDate: Date;
}

export interface IHealthGoalResultItem {
  currentValue: number | null; // fetch the latest records
  goalAchieved: boolean;
  currentValueDate: Date;
}

export interface ITargetHealthGoal {
  id: string;
  bloodPressureTargetValue: IBloodPressureValue;
  bloodSugarTargetValue: number;
  bloodSugarTargetType: BloodSugarType;
  glycatedHemonglobinTargetValue: number;
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

export interface IGoalList {
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
