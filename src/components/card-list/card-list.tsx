import { Card } from '../card/card';
import { useAppSelector } from '../../hooks/store.ts';
import { OFFER_CLASSES } from '../../const.ts';

function CardList(): JSX.Element {
  const offers = useAppSelector((state) => state?.offers.sortedOffers);
  const city = useAppSelector((state) => state?.offers.city);
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.filter((item) => item.city.name === city)?.map((offer) => <Card key={offer.id} offer={offer} cardClassName={OFFER_CLASSES.MainPage} />)}
    </div>
  );
}

export { CardList };
