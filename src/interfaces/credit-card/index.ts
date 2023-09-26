import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CreditCardInterface {
  id?: string;
  card_number: string;
  expiry_date: any;
  cvv: number;
  due_date: any;
  maximum_limit: number;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface CreditCardGetQueryInterface extends GetQueryInterface {
  id?: string;
  card_number?: string;
  user_id?: string;
}
