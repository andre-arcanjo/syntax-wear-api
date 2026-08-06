const shippingCostByState: Record<string, number> = {
  AC: 39.9, AL: 29.9, AP: 39.9, AM: 39.9, BA: 29.9, CE: 29.9,
  DF: 24.9, ES: 14.9, GO: 24.9, MA: 29.9, MT: 24.9, MS: 24.9,
  MG: 14.9, PA: 39.9, PB: 29.9, PR: 19.9, PE: 29.9, PI: 29.9,
  RJ: 14.9, RN: 29.9, RS: 19.9, RO: 39.9, RR: 39.9, SC: 19.9,
  SP: 14.9, SE: 29.9, TO: 39.9,
};

export function calculateShippingCost(state: string) {
  const shippingCost = shippingCostByState[state.trim().toUpperCase()];

  if (shippingCost === undefined) {
    throw new Error('UF inválida para cálculo do frete');
  }

  return shippingCost;
}
