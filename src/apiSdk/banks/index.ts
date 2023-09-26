import axios from 'axios';
import queryString from 'query-string';
import { BankInterface, BankGetQueryInterface } from 'interfaces/bank';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getBanks = async (query?: BankGetQueryInterface): Promise<PaginatedInterface<BankInterface>> => {
  const response = await axios.get('/api/banks', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createBank = async (bank: BankInterface) => {
  const response = await axios.post('/api/banks', bank);
  return response.data;
};

export const updateBankById = async (id: string, bank: BankInterface) => {
  const response = await axios.put(`/api/banks/${id}`, bank);
  return response.data;
};

export const getBankById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/banks/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBankById = async (id: string) => {
  const response = await axios.delete(`/api/banks/${id}`);
  return response.data;
};
