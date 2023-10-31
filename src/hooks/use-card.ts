import { useContext } from 'react';
import { CardContext, cardContextType } from '../context/card-context';

export function useCard() {
  const activeCard = useContext<cardContextType>(CardContext);

  if(!activeCard) {
    throw new Error('You should use CardProvider');
  }

  return activeCard;
}
