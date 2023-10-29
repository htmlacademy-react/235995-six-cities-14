import { useState } from "react";
import { CardContext } from "./card-context";

type CardProviderProps = {
  children: React.ReactNode;
}

export function CardProvider({children}: CardProviderProps) {
  const [isActiveCard, setIsActiveCard] = useState('null');
  return (
    <CardContext.Provider value={{isActiveCard, setIsActiveCard}}>
      {children}
    </CardContext.Provider>
  )
}
