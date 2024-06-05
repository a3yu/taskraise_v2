import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatToDollar(amount: number | undefined | null) {
  if (amount === undefined || amount === null) {
    return "";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function calculateFee(amount: number) {
  const feeRate = 0.05; // 5% fee rate
  const fixedFee = 0.3; // Additional fixed fee of $0.30
  const fee = amount * feeRate + fixedFee;
  const amountAfterFee = amount - fee;

  return {
    originalAmount: amount,
    feeAmount: fee,
    amountAfterFee: amountAfterFee,
  };
}
