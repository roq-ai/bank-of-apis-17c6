import axios from 'axios';
import queryString from 'query-string';
import { CreditCardInterface, CreditCardGetQueryInterface } from 'interfaces/credit-card';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCreditCards = async (
  query?: CreditCardGetQueryInterface,
): Promise<PaginatedInterface<CreditCardInterface>> => {
  const response = await axios.get('/api/credit-cards', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createCreditCard = async (creditCard: CreditCardInterface) => {
  const response = await axios.post('/api/credit-cards', creditCard);
  return response.data;
};

export const updateCreditCardById = async (id: string, creditCard: CreditCardInterface) => {
  const response = await axios.put(`/api/credit-cards/${id}`, creditCard);
  return response.data;
};

export const getCreditCardById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/credit-cards/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCreditCardById = async (id: string) => {
  const response = await axios.delete(`/api/credit-cards/${id}`);
  return response.data;
};
