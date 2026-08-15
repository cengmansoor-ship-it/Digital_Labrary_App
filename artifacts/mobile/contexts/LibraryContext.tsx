import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type LibraryContextValue = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  hasSeenWelcome: boolean;
  markWelcomeSeen: () => void;
  isHydrated: boolean;
};

const LibraryContext = createContext<LibraryContextValue | null>(null);
const FAVORITES_KEY = '@study-library/favorites';
const WELCOME_KEY = '@study-library/welcome-seen';

export function LibraryProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    Promise.all([AsyncStorage.getItem(FAVORITES_KEY), AsyncStorage.getItem(WELCOME_KEY)])
      .then(([savedFavorites, seen]) => {
        if (savedFavorites) setFavorites(JSON.parse(savedFavorites) as string[]);
        setHasSeenWelcome(seen === 'true');
      })
      .finally(() => setIsHydrated(true));
  }, []);

  const value = useMemo<LibraryContextValue>(
    () => ({
      favorites,
      hasSeenWelcome,
      isHydrated,
      toggleFavorite: (id) => {
        setFavorites((current) => {
          const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
          AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(next)).catch(() => undefined);
          Haptics.selectionAsync().catch(() => undefined);
          return next;
        });
      },
      markWelcomeSeen: () => {
        setHasSeenWelcome(true);
        AsyncStorage.setItem(WELCOME_KEY, 'true').catch(() => undefined);
      },
    }),
    [favorites, hasSeenWelcome, isHydrated],
  );

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) throw new Error('useLibrary must be used within LibraryProvider');
  return context;
}