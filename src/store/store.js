import { create } from 'zustand';
import api from '../api/client.js';

const useStore = create((set) => ({
  ads: [],
  ad: {},
  loading: false,
  error: null,
  filter: 'Все',
  searchQuery: '',
  page: 1,
  itemsPerPage: 5,
  totalPages: 1, //Cерверная пагинация

  setFilter: (filter) => set({ filter }),
  setSearchQuery: (query) => set({ searchQuery: query, page: 1 }),
  setPage: (page) => set({ page }),

  fetchAds: async () => {
    set({ loading: true, error: null });
    const controller = new AbortController();
    try {
      const response = await api.get('/items', { signal: controller.signal });
      set({ ads: response.data, loading: false });
      // Серверная пагинация
      /*
      const response = await api.get('/items', {
        params: { page: useStore.getState().page, limit: useStore.getState().itemsPerPage, search: useStore.getState().searchQuery },
        signal: controller.signal
      });
      set({ ads: response.data.items, totalPages: response.data.totalPages, loading: false });
      */
    } catch (error) {
      if (error.name !== 'AbortError') {
        set({ error: error.message, loading: false });
      }
    }
    return () => controller.abort();
  },

  fetchAd: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/items/${id}`);
      set({ ad: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, ad: null, loading: false });
    }
  },

  addAd: async (newAd) => {
    try {
      const response = await api.post('/items', newAd);
      set((state) => ({ ads: [...state.ads, response.data] }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  updateAd: async (id, updatedData) => {
    try {
      await api.put(`/items/${id}`, updatedData);
      set((state) => ({
        ads: state.ads.map((item) =>
          item.id === id ? { ...item, ...updatedData } : item
        ),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  deleteAd: async (id) => {
    try {
      await api.delete(`/items/${id}`);
      set((state) => ({
        ads: state.ads.filter((item) => item.id !== id),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },
}));

export default useStore;
