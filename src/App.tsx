import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { PrintRequest } from './server/db/schema';
import { RequestTable } from './components/RequestTable';
import { api } from './lib/api';
import { Printer } from 'lucide-react';

function App() {
  const [requests, setRequests] = useState<PrintRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const data = await api.getPendingRequests();
      setRequests(data);
    } catch (error) {
      toast.error('Failed to fetch requests');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDecide = async (requestId: string, decision: 'accept' | 'reject') => {
    try {
      await api.decidePrintRequest(requestId, decision);
      toast.success(`Request ${decision}ed successfully`);
      fetchRequests();
    } catch (error) {
      toast.error(`Failed to ${decision} request`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Printer className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                Print Request Manager
              </h1>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg">
            <RequestTable
              requests={requests}
              onDecide={handleDecide}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}