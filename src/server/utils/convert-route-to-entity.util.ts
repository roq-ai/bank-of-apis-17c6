const mapping: Record<string, string> = {
  accounts: 'account',
  banks: 'bank',
  'credit-cards': 'credit_card',
  'financial-advisors': 'financial_advisor',
  transactions: 'transaction',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
