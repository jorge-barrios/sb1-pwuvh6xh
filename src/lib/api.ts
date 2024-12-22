import axios from 'axios';
import { PrintRequest } from '../server/db/schema';

const API_BASE = 'http://localhost:3000';

export const api = {
  getPendingRequests: async () => {
    const response = await axios.get<PrintRequest[]>(`${API_BASE}/requests`);
    return response.data;
  },

  decidePrintRequest: async (
    requestId: string,
    decision: 'accept' | 'reject'
  ) => {
    const response = await axios.post(`${API_BASE}/decide/${requestId}`, {
      decision
    });
    return response.data;
  }
};