import { createContext } from 'react';

export type cardContextType = {
  isActiveCard: string;
  setIsActiveCard: (isActiveCard: string) => void;
}

export const CardContext = createContext<cardContextType>({
  isActiveCard: 'null',
  setIsActiveCard: () => {},
});
