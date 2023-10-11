import { MainPage } from '../pages/main/main';

function App(): JSX.Element {
  const CARDS_AMOUNT: number = 5;
  return (
    <MainPage cards={CARDS_AMOUNT} />
  );
}

export { App };
