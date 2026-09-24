import type { CalculatorInputs } from "./types";
import { calculateProjection } from "./projection";

export function calculateRequiredSip(
  inputs: CalculatorInputs,
  targetCorpus: number
): number {
  if (targetCorpus <= 0) {
    return 0;
  }

  /*
   * First check whether the existing corpus and lump sums
   * can already reach the target without any SIP.
   */
  const zeroSipProjection = calculateProjection({
    ...inputs,
    monthlySip: 0,
  });

  if (zeroSipProjection.finalCorpus >= targetCorpus) {
    return 0;
  }

  let low = 0;
  let high = 1000000;

  /*
   * Increase the upper limit if ₹10 lakh/month
   * is still not enough to reach the target.
   */
  while (
    calculateProjection({
      ...inputs,
      monthlySip: high,
    }).finalCorpus < targetCorpus
  ) {
    high *= 2;

    if (high > 100000000) {
      return high;
    }
  }

  /*
   * Binary search for the required starting SIP.
   */
  for (let i = 0; i < 60; i++) {
    const middle = (low + high) / 2;

    const projection = calculateProjection({
      ...inputs,
      monthlySip: middle,
    });

    if (projection.finalCorpus < targetCorpus) {
      low = middle;
    } else {
      high = middle;
    }
  }

  return Math.ceil(high);
}