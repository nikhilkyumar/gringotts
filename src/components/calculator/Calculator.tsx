import { useState } from "react";
import {
  ArrowRight,
  Calculator as CalculatorIcon,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

import CurrentInvestment from "./CurrentInvestment";
import SipSection from "./SipSection";
import AssumptionsSection from "./AssumptionsSection";
import StepUpSection from "./StepUpSection";
import LumpSumSection, {
  type LumpSum,
} from "./LumpSumSection";

import { calculateProjection } from "../../calculations/projection";
import { calculateRequiredSip } from "../../calculations/targetSip";

import ResultsSummary from "../results/ResultsSummary";
import ResultBreakdown from "../results/ResultBreakdown";
import PortfolioCharts from "../results/PortfolioCharts";
import YearlyProjectionTable from "../results/YearlyProjectionTable";
import ScenarioComparison from "../results/ScenarioComparison";

type CalculatorMode = "existing" | "target";
type StepUpType = "none" | "percentage" | "fixed";

function Calculator() {
  const [mode, setMode] =
    useState<CalculatorMode>("existing");

  const [currentCorpus, setCurrentCorpus] =
    useState(500000);

  const [targetCorpus, setTargetCorpus] =
    useState(5000000);

  const [monthlySip, setMonthlySip] =
    useState(30000);

  const [annualReturn, setAnnualReturn] =
    useState(12);

  const [years, setYears] =
    useState(10);

  const [stepUpType, setStepUpType] =
    useState<StepUpType>("none");

  const [stepUpValue, setStepUpValue] =
    useState(0);

  const [lumpSums, setLumpSums] =
    useState<LumpSum[]>([]);

  function addLumpSum() {
    setLumpSums((previous) => [
      ...previous,
      {
        id: crypto.randomUUID(),
        amount: 100000,
        afterMonths: 12,
      },
    ]);
  }

  function removeLumpSum(id: string) {
    setLumpSums((previous) =>
      previous.filter((item) => item.id !== id)
    );
  }

  function updateLumpSum(
    id: string,
    field: "amount" | "afterMonths",
    value: number
  ) {
    setLumpSums((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  }

  const baseInputs = {
    currentCorpus,
    monthlySip,
    annualReturn,
    years,
    stepUpType,
    stepUpValue,
    lumpSums,
  };

  /*
   * In target mode, calculate the SIP required
   * to reach the selected target corpus.
   */
  const requiredSip = calculateRequiredSip(
    baseInputs,
    targetCorpus
  );

  /*
   * The projection still needs a monthly SIP.
   *
   * Existing mode:
   *     use the user's SIP.
   *
   * Target mode:
   *     use the automatically calculated SIP.
   */
  const inputs = {
    ...baseInputs,
    monthlySip:
      mode === "target"
        ? requiredSip
        : monthlySip,
  };

  const projection =
    calculateProjection(inputs);

  return (
    <div className="relative overflow-hidden bg-[#F2EAD8]">

      {/* Background decoration */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#C9A24D]/[0.06] blur-3xl" />

        <div className="absolute -left-32 top-[700px] h-80 w-80 rounded-full bg-[#5A1F2B]/[0.04] blur-3xl" />

        <div className="absolute -right-32 top-[1100px] h-80 w-80 rounded-full bg-[#C9A24D]/[0.04] blur-3xl" />

      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

        {/* =====================================================
            CALCULATOR
        ====================================================== */}

        <section className="mx-auto mt-10 max-w-6xl">

          <div className="overflow-hidden rounded-[30px] border border-[#d8c4b8] bg-[#FFF9EF]/95 shadow-[0_25px_80px_rgba(90,31,43,0.08)] backdrop-blur-sm">

            {/* Header */}

            <div className="border-b border-[#eadbd2] px-5 py-5 sm:px-7">

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#5A1F2B] text-[#F4EAD2] shadow-[0_8px_20px_rgba(90,31,43,0.2)]">

                    <CalculatorIcon
                      size={20}
                      strokeWidth={1.8}
                    />

                  </div>

                  <div>

                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C9A24D]">
                      Your investment plan
                    </p>

                    <h3 className="mt-0.5 text-lg font-semibold text-[#5A1F2B]">
                      Choose your calculation
                    </h3>

                  </div>

                </div>

                {/* Mode selector */}

                <div className="grid grid-cols-2 rounded-2xl border border-[#d8c4b8] bg-[#F2EAD8] p-1">

                  <button
                    type="button"
                    onClick={() =>
                      setMode("existing")
                    }
                    className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-200 sm:px-5 ${
                      mode === "existing"
                        ? "bg-[#5A1F2B] text-[#FFF9EF] shadow-[0_5px_15px_rgba(90,31,43,0.2)]"
                        : "text-[#7d6d69] hover:text-[#5A1F2B]"
                    }`}
                  >
                    <TrendingUp size={14} />
                    Grow corpus
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setMode("target")
                    }
                    className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-200 sm:px-5 ${
                      mode === "target"
                        ? "bg-[#5A1F2B] text-[#FFF9EF] shadow-[0_5px_15px_rgba(90,31,43,0.2)]"
                        : "text-[#7d6d69] hover:text-[#5A1F2B]"
                    }`}
                  >
                    <Target size={14} />
                    Reach target
                  </button>

                </div>

              </div>

            </div>

            {/* =================================================
                INPUTS
            ================================================== */}

            <div className="p-5 sm:p-7">

              <div className="space-y-5">

                {/* Current investment */}

                <CurrentInvestment
                  currentCorpus={currentCorpus}
                  onChange={setCurrentCorpus}
                />

                {/* =================================================
                    TARGET MODE
                ================================================== */}

                {mode === "target" && (
                  <section className="rounded-2xl border border-[#d8c4b8] bg-[#F7EBDD] p-5 sm:p-6">

                    <div className="flex items-start gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#5A1F2B]/10 text-[#5A1F2B]">

                        <Target size={18} />

                      </div>

                      <div>

                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#C9A24D]">
                          Your destination
                        </p>

                        <h3 className="mt-1 text-lg font-semibold text-[#5A1F2B]">
                          Target Corpus
                        </h3>

                        <p className="mt-1 text-sm text-[#7d6d69]">
                          How much would you like to build?
                        </p>

                      </div>

                    </div>

                    {/* Target amount */}

                    <div className="mt-5">

                      <label
                        htmlFor="target-corpus"
                        className="text-sm font-semibold text-[#5A1F2B]"
                      >
                        Target amount
                      </label>

                      <div className="mt-2 flex items-center rounded-xl border border-[#d8c4b8] bg-[#FFF9EF] px-4 transition focus-within:border-[#5A1F2B] focus-within:ring-4 focus-within:ring-[#5A1F2B]/10">

                        <span className="mr-2 text-base font-semibold text-[#C9A24D]">
                          ₹
                        </span>

                        <input
                          id="target-corpus"
                          type="number"
                          min="0"
                          step="100000"
                          value={
                            targetCorpus === 0
                              ? ""
                              : targetCorpus
                          }
                          onChange={(event) =>
                            setTargetCorpus(
                              Number(
                                event.target.value
                              )
                            )
                          }
                          className="w-full bg-transparent py-3.5 text-base font-semibold text-[#30201F] outline-none"
                          placeholder="50,00,000"
                        />

                      </div>

                    </div>

                    {/* =================================================
                        REQUIRED SIP
                        
                        This is NOT an input.
                        It is calculated automatically.
                    ================================================== */}

                    <div className="mt-4 rounded-xl border border-[#d8c4b8] bg-[#FFF9EF] px-4 py-3">

                      <div className="flex items-center justify-between gap-4">

                        <div>

                          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#C9A24D]">
                            Calculated for you
                          </p>

                          <span className="mt-1 block text-xs text-[#7d6d69]">
                            Required starting SIP
                          </span>

                        </div>

                        <span className="whitespace-nowrap text-base font-bold text-[#5A1F2B]">

                          ₹
                          {requiredSip.toLocaleString(
                            "en-IN"
                          )}

                          <span className="ml-1 text-xs font-medium text-[#7d6d69]">
                            / month
                          </span>

                        </span>

                      </div>

                    </div>

                  </section>
                )}

                {/* =================================================
                    MONTHLY SIP
                    ONLY FOR GROW CORPUS
                ================================================== */}

                {mode === "existing" && (
                  <SipSection
                    monthlySip={monthlySip}
                    onChange={setMonthlySip}
                  />
                )}

                {/* Assumptions */}

                <AssumptionsSection
                  annualReturn={annualReturn}
                  years={years}
                  onReturnChange={setAnnualReturn}
                  onYearsChange={setYears}
                />

                {/* Step-up */}

                <StepUpSection
                  type={stepUpType}
                  value={stepUpValue}
                  onTypeChange={setStepUpType}
                  onValueChange={setStepUpValue}
                />

                {/* Lump sums */}

                <LumpSumSection
                  lumpSums={lumpSums}
                  years={years}
                  onAdd={addLumpSum}
                  onRemove={removeLumpSum}
                  onUpdate={updateLumpSum}
                />

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            RESULTS
        ====================================================== */}

        <section className="mx-auto mt-12 max-w-6xl">

          <div className="mb-6 flex items-end justify-between gap-4">

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C9A24D]">
                Your projection
              </p>

              <h2 className="gringotts-title mt-1 text-2xl text-[#5A1F2B] sm:text-3xl">
                What your money could become
              </h2>

            </div>

            <div className="hidden items-center gap-1.5 text-xs text-[#7d6d69] sm:flex">

              <span>
                Scroll for detailed analysis
              </span>

              <ArrowRight size={13} />

            </div>

          </div>

          <div className="space-y-5">

            <ResultsSummary
              result={projection}
              years={years}
            />

            <ResultBreakdown
              result={projection}
            />

            <PortfolioCharts
              result={projection}
            />

            <YearlyProjectionTable
              result={projection}
            />

            <ScenarioComparison
              inputs={inputs}
            />

          </div>

        </section>

        {/* Disclaimer */}

        <div className="mx-auto mt-10 flex max-w-2xl items-start justify-center gap-2 text-center">

          <Sparkles
            size={12}
            className="mt-1 shrink-0 text-[#C9A24D]"
          />

          <p className="text-[11px] leading-5 text-[#8a746f]">
            Gringotts provides illustrative projections
            based on your assumptions. Investment returns
            are not guaranteed and actual results may vary.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Calculator;