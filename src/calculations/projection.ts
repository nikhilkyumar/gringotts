import type {
  CalculatorInputs,
  ProjectionResult,
  YearProjection,
} from "./types";

function getSipForYear(
  startingSip: number,
  year: number,
  stepUpType: CalculatorInputs["stepUpType"],
  stepUpValue: number
) {
  if (stepUpType === "none") {
    return startingSip;
  }

  if (stepUpType === "percentage") {
    return (
      startingSip *
      Math.pow(1 + stepUpValue / 100, year - 1)
    );
  }

  if (stepUpType === "fixed") {
    return startingSip + stepUpValue * (year - 1);
  }

  return startingSip;
}

export function calculateProjection(
  inputs: CalculatorInputs
): ProjectionResult {
  const {
    currentCorpus,
    monthlySip,
    annualReturn,
    years,
    stepUpType,
    stepUpValue,
    lumpSums,
  } = inputs;

  const totalMonths = years * 12;

  const monthlyRate = annualReturn / 100 / 12;

  // Separate investment buckets.
  let currentCorpusValue = currentCorpus;
  let sipValue = 0;
  let lumpSumValue = 0;

  let totalSipInvested = 0;
  let totalLumpSumInvested = 0;

  const yearlyData: YearProjection[] = [];

  for (let month = 1; month <= totalMonths; month++) {
    const year = Math.ceil(month / 12);

    const startingCorpus =
      currentCorpusValue +
      sipValue +
      lumpSumValue;

    // Existing corpus grows every month.
    currentCorpusValue *= 1 + monthlyRate;

    // Existing SIP/lump-sum investments also grow.
    sipValue *= 1 + monthlyRate;
    lumpSumValue *= 1 + monthlyRate;

    // Determine this year's SIP amount.
    const sipAmount = getSipForYear(
      monthlySip,
      year,
      stepUpType,
      stepUpValue
    );

    // SIP is invested at the end of the month.
    sipValue += sipAmount;

    totalSipInvested += sipAmount;

    // Find lump sums scheduled for this month.
    const monthlyLumpSums = lumpSums.filter(
      (lumpSum) => lumpSum.afterMonths === month
    );

    let monthLumpSumInvested = 0;

    for (const lumpSum of monthlyLumpSums) {
      lumpSumValue += lumpSum.amount;
      totalLumpSumInvested += lumpSum.amount;
      monthLumpSumInvested += lumpSum.amount;
    }

    // At the end of each year, create the yearly snapshot.
    if (month % 12 === 0) {
      const endingCorpus =
        currentCorpusValue +
        sipValue +
        lumpSumValue;

      const totalInvested =
        currentCorpus +
        totalSipInvested +
        totalLumpSumInvested;

      const growth =
        endingCorpus - totalInvested;

      yearlyData.push({
        year,
        startingCorpus,
        sipInvested:
          totalSipInvested -
          (yearlyData.reduce(
            (sum, item) => sum + item.sipInvested,
            0
          )),
        lumpSumInvested:
          totalLumpSumInvested -
          (yearlyData.reduce(
            (sum, item) =>
              sum + item.lumpSumInvested,
            0
          )),
        growth,
        endingCorpus,
        sipAmount,
      });
    }
  }

  const currentCorpusFinalValue = currentCorpusValue;

  const sipFinalValue = sipValue;

  const lumpSumFinalValue = lumpSumValue;

  const finalCorpus =
    currentCorpusFinalValue +
    sipFinalValue +
    lumpSumFinalValue;

  const currentCorpusGrowth =
    currentCorpusFinalValue - currentCorpus;

  const sipGrowth =
    sipFinalValue - totalSipInvested;

  const lumpSumGrowth =
    lumpSumFinalValue - totalLumpSumInvested;

  const totalInvested =
    currentCorpus +
    totalSipInvested +
    totalLumpSumInvested;

  const totalGrowth =
    finalCorpus - totalInvested;

  return {
    finalCorpus,

    currentCorpusInvested: currentCorpus,
    currentCorpusFinalValue,
    currentCorpusGrowth,

    sipInvested: totalSipInvested,
    sipFinalValue,
    sipGrowth,

    lumpSumInvested: totalLumpSumInvested,
    lumpSumFinalValue,
    lumpSumGrowth,

    totalInvested,
    totalGrowth,

    yearlyData,
  };
}