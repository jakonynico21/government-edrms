import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { RegistryDocument, MovementEntry, TimelineNode, Alert } from './types';
import { dummyDocuments, dummyMovements, dummyAlerts, monthlyStats } from './data';

interface StoreState {
  documents: RegistryDocument[];
  movements: MovementEntry[];
  alerts: Alert[];
  monthlyStats: typeof monthlyStats;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  addDocument: (doc: Omit<RegistryDocument, 'id'>) => void;
  archiveDocument: (id: string) => void;
  addMovement: (entry: Omit<MovementEntry, 'id' | 'timeline'>) => void;
  archiveBulk: (ids: string[]) => void;
}

const StoreContext = createContext<StoreState | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<RegistryDocument[]>(dummyDocuments);
  const [movements, setMovements] = useState<MovementEntry[]>(dummyMovements);
  const [alerts] = useState<Alert[]>(dummyAlerts);
  const [activeTab, setActiveTab] = useState('dashboard');

  const addDocument = useCallback((doc: Omit<RegistryDocument, 'id'>) => {
    const newDoc: RegistryDocument = {
      ...doc,
      id: Math.random().toString(36).slice(2, 9),
    };
    setDocuments(prev => [newDoc, ...prev]);
  }, []);

  const archiveDocument = useCallback((id: string) => {
    setDocuments(prev =>
      prev.map(d => (d.id === id ? { ...d, status: 'Archived' as const } : d))
    );
  }, []);

  const archiveBulk = useCallback((ids: string[]) => {
    setDocuments(prev =>
      prev.map(d => (ids.includes(d.id) ? { ...d, status: 'Archived' as const } : d))
    );
  }, []);

  const addMovement = useCallback((entry: Omit<MovementEntry, 'id' | 'timeline'>) => {
    const timeline: TimelineNode[] = [
      {
        id: `t-${Math.random().toString(36).slice(2, 6)}`,
        timestamp: new Date().toISOString(),
        location: 'Central Registry',
        action: 'Document checked out and logged',
        officer: 'Registry Clerk A. Okello',
      },
      {
        id: `t-${Math.random().toString(36).slice(2, 6)}`,
        timestamp: new Date(Date.now() + 1000).toISOString(),
        location: entry.department,
        action: `Issued to ${entry.issuedTo} for ${entry.purpose}`,
        officer: entry.issuedTo,
      },
    ];

    const newEntry: MovementEntry = {
      ...entry,
      id: `m-${Math.random().toString(36).slice(2, 6)}`,
      timeline,
    };

    setMovements(prev => [newEntry, ...prev]);

    setDocuments(prev =>
      prev.map(d =>
        d.id === entry.documentId ? { ...d, status: 'In Transit' as const } : d
      )
    );
  }, []);

  return (
    <StoreContext.Provider
      value={{
        documents,
        movements,
        alerts,
        monthlyStats,
        activeTab,
        setActiveTab,
        addDocument,
        archiveDocument,
        addMovement,
        archiveBulk,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
