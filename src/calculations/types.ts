export type StepUpType = "none" | "percentage" | "fixed";

export interface LumpSum {
  id: string;
  amount: number;
  afterMonths: number;
}

export interface CalculatorInputs {
  currentCorpus: number;
  monthlySip: number;
  annualReturn: number;
  years: number;

  stepUpType: StepUpType;
  stepUpValue: number;

  lumpSums: LumpSum[];
}

export interface YearProjection {
  year: number;
  startingCorpus: number;
  sipInvested: number;
  lumpSumInvested: number;
  growth: number;
  endingCorpus: number;
  sipAmount: number;
}

export interface ProjectionResult {
  finalCorpus: number;

  currentCorpusInvested: number;
  currentCorpusFinalValue: number;
  currentCorpusGrowth: number;

  sipInvested: number;
  sipFinalValue: number;
  sipGrowth: number;

  lumpSumInvested: number;
  lumpSumFinalValue: number;
  lumpSumGrowth: number;

  totalInvested: number;
  totalGrowth: number;

  yearlyData: YearProjection[];
}