export function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatIndianCompact(value: number) {
  const crore = 10000000;
  const lakh = 100000;

  if (value >= crore) {
    return `₹${(value / crore).toFixed(2)} Cr`;
  }

  if (value >= lakh) {
    return `₹${(value / lakh).toFixed(2)} L`;
  }

  return formatINR(value);
}