import Decimal from "decimal.js";

export function mortgageLoanPrincipal(
  asking_price: number,
  offer_perc: number,
  financing_ltv_perc: number
): number {
  return new Decimal(asking_price)
    .mul(new Decimal(offer_perc).div(100))
    .mul(new Decimal(financing_ltv_perc).div(100))
    .toDecimalPlaces(2)
    .toNumber();
}

export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  years: number
): number {
  const P = new Decimal(principal);
  const r = new Decimal(annualRate).div(100).div(12).toDecimalPlaces(6);
  const n = new Decimal(years).mul(12);
  const onePlusR = new Decimal(1).plus(r);
  const onePlusRPowN = onePlusR.pow(n);

  return P.mul(r.mul(onePlusRPowN))
    .div(onePlusRPowN.minus(1))
    .toDecimalPlaces(2)
    .toNumber();
}

export function reservedAmount(
  asking_price: number,
  offer_perc: number,
  calc_monthlyPmt: number
): number {
  const monthly = new Decimal(calc_monthlyPmt).mul(6);
  const equityReserve = new Decimal(asking_price)
    .mul(offer_perc)
    .div(100)
    .mul(0.025);

  return monthly.add(equityReserve).toDecimalPlaces(2).toNumber();
}
