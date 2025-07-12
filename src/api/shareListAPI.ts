// ShareList API Client

export interface ShareItem {
  id: string;
  name: string;
  isAvailable: boolean;
  purchaseDate: string;
  expirationDate?: string;
  category: 'tool' | 'furniture' | 'game' | 'other';
  description?: string;
  borrowedBy?: string;
}

export interface CreateShareItemRequest {
  name: string;
  purchaseDate: string;
  expirationDate?: string | undefined;
  category: 'tool' | 'furniture' | 'game' | 'other';
  description?: string | undefined;
}

export interface UpdateShareItemRequest {
  name?: string;
  isAvailable?: boolean;
  purchaseDate?: string;
  expirationDate?: string;
  category?: 'tool' | 'furniture' | 'game' | 'other';
  description?: string;
  borrowedBy?: string;
}

// Get API base URL based on environment
const getApiBaseUrl = (): string => {
  if (process.env['NODE_ENV'] === 'production') {
    // This will be your Railway backend URL
    return process.env['REACT_APP_API_URL'] || 'https://your-railway-backend.railway.app';
  }
  return process.env['REACT_APP_API_URL'] || 'http://localhost:5001';
};

const API_BASE = getApiBaseUrl();

// Helper function for API calls
async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}/api${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    // Handle 204 No Content responses
    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error occurred');
  }
}

export const shareListAPI = {
  // Health check
  async healthCheck(): Promise<{ status: string; message: string }> {
    return apiCall('/health');
  },

  // Get all items
  async getItems(): Promise<ShareItem[]> {
    return apiCall('/items');
  },

  // Get single item
  async getItem(id: string): Promise<ShareItem> {
    return apiCall(`/items/${id}`);
  },

  // Create new item
  async createItem(item: CreateShareItemRequest): Promise<ShareItem> {
    return apiCall('/items', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  },

  // Update item
  async updateItem(id: string, updates: UpdateShareItemRequest): Promise<ShareItem> {
    return apiCall(`/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  // Delete item
  async deleteItem(id: string): Promise<void> {
    return apiCall(`/items/${id}`, {
      method: 'DELETE',
    });
  },

  // Toggle item availability (convenience method)
  async toggleAvailability(id: string, borrowedBy?: string): Promise<ShareItem> {
    return apiCall(`/items/${id}/toggle`, {
      method: 'PATCH',
      body: JSON.stringify({ borrowedBy }),
    });
  },
};

// Export for convenience
export default shareListAPI; 