import { Card } from '../card/card';
import { useAppSelector } from '../../hooks/store.ts';
import { OFFER_CLASSES } from '../../const.ts';
import { OfferApi } from '../../types/offer.ts';
import { getCity } from '../../store/slices/offers/selectors.ts';

type cardListProps = {
  sortedOffers: OfferApi[];
}

function CardList({sortedOffers}: cardListProps): JSX.Element {
  const city = useAppSelector(getCity);
  return (
    <div className="cities__places-list places__list tabs__content">
      {sortedOffers?.filter((item) => item.city.name === city)?.map((offer) => <Card key={offer.id} offer={offer} cardClassName={OFFER_CLASSES.mainPage} />)}
    </div>
  );
}

export { CardList };
