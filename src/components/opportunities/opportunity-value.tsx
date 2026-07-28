"use client"

type OpportunityValueProps = {
  value: number
  className?: string
}

export function OpportunityValue({ value, className }: OpportunityValueProps) {
  const formatted = value >= 10000000
    ? `₹${(value / 10000000).toFixed(1)}Cr`
    : value >= 100000
      ? `₹${(value / 100000).toFixed(0)}L`
      : `₹${value.toLocaleString("en-IN")}`

  return <span className={className}>{formatted}</span>
}
