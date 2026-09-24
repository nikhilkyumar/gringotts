import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { ProjectionResult } from "../../calculations/types";
import { formatIndianCompact } from "../../utils/currency";

interface PortfolioChartsProps {
  result: ProjectionResult;
}

/*
  Gringotts / magical-bank palette
*/
const chartColors = {
  burgundy: "#5A1F2B",
  darkRed: "#6E2333",
  red: "#8B3046",
  gold: "#C9A24D",
  brightGold: "#E0BD68",
  parchment: "#F2EAD8",
  paper: "#FBF7EC",
  ink: "#292720",
  muted: "#777267",
  border: "#D9D0BD",
  grid: "#DED5C5",
};

const pieColors = [
  chartColors.burgundy,
  chartColors.gold,
  chartColors.red,
];

function PortfolioCharts({
  result,
}: PortfolioChartsProps) {
  /*
    Portfolio composition
  */
  const pieData = [
    {
      name: "Current corpus",
      value: result.currentCorpusFinalValue,
    },
    {
      name: "SIP",
      value: result.sipFinalValue,
    },
    {
      name: "Lump sums",
      value: result.lumpSumFinalValue,
    },
  ].filter((item) => item.value > 0);

  /*
    Value contributed by each source
  */
  const barData = [
    {
      name: "Current",
      value: result.currentCorpusFinalValue,
      fill: chartColors.burgundy,
    },
    {
      name: "SIP",
      value: result.sipFinalValue,
      fill: chartColors.gold,
    },
    {
      name: "Lump sum",
      value: result.lumpSumFinalValue,
      fill: chartColors.red,
    },
  ].filter((item) => item.value > 0);

  /*
    Year-by-year corpus growth
  */
  const yearlyData = result.yearlyData.map((item) => ({
    year: `Y${item.year}`,
    corpus: item.endingCorpus,
  }));

  /*
    Recharts tooltip styling
  */
  const tooltipStyle = {
    backgroundColor: chartColors.paper,
    border: `1px solid ${chartColors.border}`,
    borderRadius: "12px",
    boxShadow:
      "0 12px 30px rgba(42,35,25,0.12)",
    color: chartColors.ink,
  };

  /*
    Important:
    Recharts can send undefined into formatter,
    so we safely convert it to a number.
  */
  const formatTooltipValue = (value: unknown) => {
    return formatIndianCompact(
      Number(value ?? 0)
    );
  };

  return (
    <section className="space-y-5">
      {/* -------------------------------------------------
          SECTION HEADER
      ------------------------------------------------- */}
      <div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#7A2638]" />

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8D6D3E]">
            Vault analytics
          </p>
        </div>

        <h2 className="gringotts-title mt-2 text-xl font-semibold text-[#292720]">
          Your money, visualised
        </h2>
      </div>

      {/* -------------------------------------------------
          TOP CHARTS
      ------------------------------------------------- */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* =================================================
            PIE CHART
        ================================================= */}
        <div className="rounded-[24px] border border-[#D9D0BD] bg-[#FBF7EC] p-5 shadow-[0_12px_35px_rgba(42,35,25,0.06)] sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-[#292720]">
                Portfolio composition
              </p>

              <p className="mt-1 text-xs text-[#777267]">
                Where your projected corpus comes from.
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5A1F2B]/10">
              <span className="text-sm text-[#7A2638]">
                ✦
              </span>
            </div>
          </div>

          <div className="mt-5 h-[270px]">
            {pieData.length > 0 ? (
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={98}
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="name"
                    stroke={chartColors.paper}
                    strokeWidth={3}
                  >
                    {pieData.map((_, index) => (
                      <Cell
                        key={`pie-${index}`}
                        fill={
                          pieColors[
                            index % pieColors.length
                          ]
                        }
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={formatTooltipValue}
                    contentStyle={tooltipStyle}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-[#777267]">
                Add investments to see the breakdown.
              </div>
            )}
          </div>

          {/* Pie legend */}
          <div className="mt-2 grid gap-2">
            {pieData.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-xl bg-[#F2EAD8] px-3 py-2.5"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor:
                        pieColors[
                          index % pieColors.length
                        ],
                    }}
                  />

                  <span className="text-xs font-medium text-[#454239]">
                    {item.name}
                  </span>
                </div>

                <span className="text-xs font-bold text-[#292720]">
                  {formatIndianCompact(item.value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* =================================================
            VALUE BY SOURCE BAR CHART
        ================================================= */}
        <div className="rounded-[24px] border border-[#D9D0BD] bg-[#FBF7EC] p-5 shadow-[0_12px_35px_rgba(42,35,25,0.06)] sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-[#292720]">
                Projected value
              </p>

              <p className="mt-1 text-xs text-[#777267]">
                Final value of each investment source.
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C9A24D]/15">
              <span className="text-sm font-bold text-[#9A7429]">
                ₹
              </span>
            </div>
          </div>

          <div className="mt-6 h-[300px]">
            {barData.length > 0 ? (
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart
                  data={barData}
                  margin={{
                    top: 10,
                    right: 8,
                    left: -15,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={chartColors.grid}
                    vertical={false}
                  />

                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: chartColors.muted,
                      fontSize: 11,
                    }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: chartColors.muted,
                      fontSize: 10,
                    }}
                    tickFormatter={(value) =>
                      formatIndianCompact(
                        Number(value ?? 0)
                      )
                    }
                  />

                  <Tooltip
                    cursor={{
                      fill: "rgba(90,31,43,0.05)",
                    }}
                    formatter={formatTooltipValue}
                    contentStyle={tooltipStyle}
                  />

                  <Bar
                    dataKey="value"
                    radius={[8, 8, 2, 2]}
                    maxBarSize={58}
                  >
                    {barData.map((entry, index) => (
                      <Cell
                        key={`bar-${index}`}
                        fill={entry.fill}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-[#777267]">
                Add investments to see the chart.
              </div>
            )}
          </div>

          {/* Bar legend */}
          <div className="mt-1 flex flex-wrap gap-4">
            {barData.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-1.5"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: item.fill,
                  }}
                />

                <span className="text-[11px] text-[#777267]">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =================================================
          CORPUS GROWTH
      ================================================= */}
      <div className="rounded-[24px] border border-[#D9D0BD] bg-[#FBF7EC] p-5 shadow-[0_12px_35px_rgba(42,35,25,0.06)] sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-[#292720]">
              Corpus growth
            </p>

            <p className="mt-1 text-xs text-[#777267]">
              How your projected corpus grows year by year.
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7A2638]/10">
            <span className="text-sm text-[#7A2638]">
              ↗
            </span>
          </div>
        </div>

        <div className="mt-6 h-[300px]">
          {yearlyData.length > 0 ? (
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={yearlyData}
                margin={{
                  top: 10,
                  right: 8,
                  left: -15,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={chartColors.grid}
                  vertical={false}
                />

                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: chartColors.muted,
                    fontSize: 10,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: chartColors.muted,
                    fontSize: 10,
                  }}
                  tickFormatter={(value) =>
                    formatIndianCompact(
                      Number(value ?? 0)
                    )
                  }
                />

                <Tooltip
                  cursor={{
                    fill: "rgba(90,31,43,0.05)",
                  }}
                  formatter={formatTooltipValue}
                  contentStyle={tooltipStyle}
                />

                <Bar
                  dataKey="corpus"
                  fill={chartColors.burgundy}
                  radius={[6, 6, 1, 1]}
                  maxBarSize={42}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-[#777267]">
              Your yearly projection will appear here.
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#5A1F2B]" />

          <span className="text-xs text-[#777267]">
            Projected corpus
          </span>
        </div>
      </div>
    </section>
  );
}

export default PortfolioCharts;