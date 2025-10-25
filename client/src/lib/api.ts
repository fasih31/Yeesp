import { handleApiError } from './errorHandling';

const API_BASE_URL = '/api';

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    credentials: 'include',
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }));
      throw {
        response: {
          status: response.status,
          data: error,
        },
      };
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

export const api = {
  // Assignments
  assignments: {
    create: (data: any) => apiRequest('/assignments', { method: 'POST', body: JSON.stringify(data) }),
    getByCourse: (courseId: string) => apiRequest(`/assignments/course/${courseId}`),
    get: (id: string) => apiRequest(`/assignments/${id}`),
    update: (id: string, data: any) => apiRequest(`/assignments/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  },

  // Submissions
  submissions: {
    create: (data: any) => apiRequest('/submissions', { method: 'POST', body: JSON.stringify(data) }),
    getByAssignment: (assignmentId: string) => apiRequest(`/submissions/assignment/${assignmentId}`),
    getByStudent: (studentId: string) => apiRequest(`/submissions/student/${studentId}`),
    grade: (id: string, grade: number, feedback: string) =>
      apiRequest(`/submissions/${id}/grade`, { method: 'PATCH', body: JSON.stringify({ grade, feedback }) }),
  },

  // Messages
  messages: {
    send: (data: any) => apiRequest('/messages', { method: 'POST', body: JSON.stringify(data) }),
    getConversation: (userId1: string, userId2: string) => apiRequest(`/messages/conversation/${userId1}/${userId2}`),
    getUserConversations: (userId: string) => apiRequest(`/messages/user/${userId}`),
    markAsRead: (id: string) => apiRequest(`/messages/${id}/read`, { method: 'PATCH' }),
    getUnreadCount: (userId: string) => apiRequest(`/messages/unread/${userId}`),
  },

  // Support Tickets
  supportTickets: {
    create: (data: any) => apiRequest('/support-tickets', { method: 'POST', body: JSON.stringify(data) }),
    getAll: () => apiRequest('/support-tickets'),
    getByUser: (userId: string) => apiRequest(`/support-tickets/user/${userId}`),
    get: (id: string) => apiRequest(`/support-tickets/${id}`),
    update: (id: string, data: any) => apiRequest(`/support-tickets/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    addReply: (ticketId: string, data: any) =>
      apiRequest(`/support-tickets/${ticketId}/replies`, { method: 'POST', body: JSON.stringify(data) }),
    getReplies: (ticketId: string) => apiRequest(`/support-tickets/${ticketId}/replies`),
  },

  // Contracts
  contracts: {
    create: (data: any) => apiRequest('/contracts', { method: 'POST', body: JSON.stringify(data) }),
    getByFreelancer: (freelancerId: string) => apiRequest(`/contracts/freelancer/${freelancerId}`),
    getByRecruiter: (recruiterId: string) => apiRequest(`/contracts/recruiter/${recruiterId}`),
    get: (id: string) => apiRequest(`/contracts/${id}`),
    update: (id: string, data: any) => apiRequest(`/contracts/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  },

  // Milestones
  milestones: {
    create: (data: any) => apiRequest('/milestones', { method: 'POST', body: JSON.stringify(data) }),
    getByContract: (contractId: string) => apiRequest(`/milestones/contract/${contractId}`),
    update: (id: string, data: any) => apiRequest(`/milestones/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  },

  // KYC Documents
  kycDocuments: {
    create: (data: any) => apiRequest('/kyc-documents', { method: 'POST', body: JSON.stringify(data) }),
    getByUser: (userId: string) => apiRequest(`/kyc-documents/user/${userId}`),
    getPending: () => apiRequest('/kyc-documents/pending'),
    update: (id: string, data: any) => apiRequest(`/kyc-documents/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  },

  // Disputes
  disputes: {
    create: (data: any) => apiRequest('/disputes', { method: 'POST', body: JSON.stringify(data) }),
    getAll: () => apiRequest('/disputes'),
    getByUser: (userId: string) => apiRequest(`/disputes/user/${userId}`),
    get: (id: string) => apiRequest(`/disputes/${id}`),
    update: (id: string, data: any) => apiRequest(`/disputes/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  },

  // Wallets
  wallets: {
    getByUser: (userId: string) => apiRequest(`/wallets/user/${userId}`),
    getTransactions: (walletId: string) => apiRequest(`/wallets/${walletId}/transactions`),
    createTransaction: (walletId: string, data: any) =>
      apiRequest(`/wallets/${walletId}/transactions`, { method: 'POST', body: JSON.stringify(data) }),
  },
};

export { handleApiError };
