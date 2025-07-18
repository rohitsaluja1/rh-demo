import { create } from 'zustand';

export interface InboxItem {
  id: string;
  type: 'Email' | 'Manual upload';
  from: string;
  source: string;
  subject: string;
  client: string;
  recordRef: string;
  datetime: string;
  event: string;
  attachments: number;
  status: 'Matched' | 'Unmatched' | 'Partial';
}

interface InboxStore {
  // State
  items: InboxItem[];
  searchQuery: string;
  statusFilter: string;
  selectedItems: string[];
  viewMode: 'list' | 'card';
  
  // Actions
  setItems: (items: InboxItem[]) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: string) => void;
  toggleItemSelection: (id: string) => void;
  selectAllItems: () => void;
  clearSelection: () => void;
  setViewMode: (mode: 'list' | 'card') => void;
  
  // Computed
  filteredItems: () => InboxItem[];
  summaryStats: () => {
    total: number;
    matched: number;
    unmatched: number;
    partial: number;
  };
}

export const useInboxStore = create<InboxStore>((set, get) => ({
  // Initial state
  items: [],
  searchQuery: '',
  statusFilter: '',
  selectedItems: [],
  viewMode: 'list',
  
  // Actions
  setItems: (items) => set({ items }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setStatusFilter: (status) => set({ statusFilter: status }),
  
  toggleItemSelection: (id) => set((state) => ({
    selectedItems: state.selectedItems.includes(id)
      ? state.selectedItems.filter(itemId => itemId !== id)
      : [...state.selectedItems, id]
  })),
  
  selectAllItems: () => set((state) => {
    const { items, searchQuery, statusFilter } = state;
    
    const filteredItems = items.filter(item => {
      const matchesSearch = !searchQuery || 
        item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.client.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = !statusFilter || item.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
    
    return {
      selectedItems: filteredItems.map(item => item.id)
    };
  }),
  
  clearSelection: () => set({ selectedItems: [] }),
  
  setViewMode: (mode) => set({ viewMode: mode }),
  
  // Computed
  filteredItems: () => {
    const { items, searchQuery, statusFilter } = get();
    
    return items.filter(item => {
      const matchesSearch = !searchQuery || 
        item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.client.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = !statusFilter || item.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  },
  
  summaryStats: () => {
    const { items } = get();
    return {
      total: items.length,
      matched: items.filter(item => item.status === 'Matched').length,
      unmatched: items.filter(item => item.status === 'Unmatched').length,
      partial: items.filter(item => item.status === 'Partial').length,
    };
  },
}));