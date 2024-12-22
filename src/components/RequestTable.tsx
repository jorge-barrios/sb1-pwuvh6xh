import React from 'react';
import { PrintRequest } from '../server/db/schema';
import { Check, X } from 'lucide-react';

interface RequestTableProps {
  requests: PrintRequest[];
  onDecide: (requestId: string, decision: 'accept' | 'reject') => Promise<void>;
  isLoading: boolean;
}

export function RequestTable({ requests, onDecide, isLoading }: RequestTableProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <p className="text-gray-500">Loading requests...</p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="flex justify-center items-center h-32">
        <p className="text-gray-500">No pending requests</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sender
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subject
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Files
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {requests.map((request) => (
            <tr key={request.request_id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {request.email_id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {request.from}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {request.subject}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {request.attachments.join(', ')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  onClick={() => onDecide(request.request_id, 'accept')}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Accept
                </button>
                <button
                  onClick={() => onDecide(request.request_id, 'reject')}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <X className="h-4 w-4 mr-1" />
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}