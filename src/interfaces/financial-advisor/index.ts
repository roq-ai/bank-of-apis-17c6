import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FinancialAdvisorInterface {
  id?: string;
  advisor_name: string;
  contact_number: string;
  email: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface FinancialAdvisorGetQueryInterface extends GetQueryInterface {
  id?: string;
  advisor_name?: string;
  contact_number?: string;
  email?: string;
  user_id?: string;
}
