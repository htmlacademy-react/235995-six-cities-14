import { Card } from '../card/card';
import { OfferApi } from '../../mocks/offers-api';
import { useSelector } from 'react-redux';
import { State } from '../../store';

function CardList(): JSX.Element {
  const offers = useSelector((state: State): OfferApi[] => state.offers.offers);
  const city = useSelector((state: State): string => state.offers.city);
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.filter((item) => item.city.name === city)?.map((offer): JSX.Element => <Card key={offer.id} offer={offer} />)}
    </div>
  );
}

export { CardList };
