import { TransactionInterface } from 'interfaces/transaction';
import { BankInterface } from 'interfaces/bank';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AccountInterface {
  id?: string;
  account_number: string;
  account_type: string;
  balance: number;
  bank_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  transaction?: TransactionInterface[];
  bank?: BankInterface;
  user?: UserInterface;
  _count?: {
    transaction?: number;
  };
}

export interface AccountGetQueryInterface extends GetQueryInterface {
  id?: string;
  account_number?: string;
  account_type?: string;
  bank_id?: string;
  user_id?: string;
}
