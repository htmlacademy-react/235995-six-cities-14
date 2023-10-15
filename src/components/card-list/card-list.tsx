import { Card } from '../card/card';
import { Offer } from '../../types/offer';

interface CardListProps {
  offers: Offer[];
}

function CardList({offers}: CardListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers?.map((offer): JSX.Element => <Card key={offer.id} offer={offer} />)}
    </div>
  );
}

export { CardList };
