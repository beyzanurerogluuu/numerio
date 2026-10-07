import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ClientData {
  id: string;
  name: string;
  date: string; // Analysis Date
  dob: string; // Date of Birth
  // Personal Info
  ruhGudusu: string;
  sessizGudu: string;
  ifade: string;
  kisiselYil: string;
  // Pin Code
  pinCode: string[]; // Array of 9 numbers
  // Elements
  elements: {
    ates: string;
    su: string;
    toprak: string;
    hava: string;
    notr: string;
  };
  // Years
  zirveYillari: string;
  kararYillari: string;
  // Chakras
  chakras: Record<string, string>; // e.g. "1": "yorum", "2": "yorum"
  haneler: Record<string, string>; // e.g. "1": "yorum", "2": "yorum"
  // Notes
  hastalikUyarisi: string;
  ebcedHesabi: {
    zekaAkil: string;
    esma: string;
    sure: string;
  };
  ozelNotlar: string;
}

interface ClientStore {
  clients: ClientData[];
  addClient: (client: ClientData) => void;
  updateClient: (id: string, updatedClient: Partial<ClientData>) => void;
  deleteClient: (id: string) => void;
  getClient: (id: string) => ClientData | undefined;
}

export const useClientStore = create<ClientStore>()(
  persist(
    (set, get) => ({
      clients: [],
      addClient: (client) =>
        set((state) => ({ clients: [client, ...state.clients] })),
      updateClient: (id, updatedClient) =>
        set((state) => ({
          clients: state.clients.map((client) =>
            client.id === id ? { ...client, ...updatedClient } : client
          ),
        })),
      deleteClient: (id) =>
        set((state) => ({
          clients: state.clients.filter((client) => client.id !== id),
        })),
      getClient: (id) => get().clients.find((client) => client.id === id),
    }),
    {
      name: 'nuzul-client-storage', // unique name
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
