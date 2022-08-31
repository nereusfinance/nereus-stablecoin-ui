import { Decimal } from "decimal.js";

export const roundToFixed = (value, decimals) => {
  try {
    const val = new Decimal(value).toDecimalPlaces(
      decimals,
      Decimal.ROUND_FLOOR
    );
    return val.toFixed();
  } catch (err) {
    console.error("roundToFixed err", err);
  }

  return value;
};
