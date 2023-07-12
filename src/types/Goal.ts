import { IBloodPressureValue } from '../services/GoalService';
import { BloodSugarType } from '../services/RecordService';

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
