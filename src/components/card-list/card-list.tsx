import { Card } from '../card/card';
import { OfferApi } from '../../mocks/offers-api';

interface CardListProps {
  offers: OfferApi[];
  city: string;
}

function CardList({offers, city}: CardListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.filter((item) => item.city.name === city)?.map((offer): JSX.Element => <Card key={offer.id} offer={offer} />)}
    </div>
  );
}

export { CardList };
