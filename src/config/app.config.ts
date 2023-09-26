interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Account Owner'],
  customerRoles: [],
  tenantRoles: ['Account Owner', 'Account Manager', 'End User', 'Financial Advisor'],
  tenantName: 'Bank',
  applicationName: 'Bank of Apis',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Manage user information',
    'Manage bank information',
    'Manage account information',
    'Manage transaction information',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/cb39f615-25c7-4f83-aedb-46d49712bcbf',
};
