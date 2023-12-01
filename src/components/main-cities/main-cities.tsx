import { CardList } from '../card-list/card-list';
import { OffersSorting } from '../offers-sorting/offers-sorting';
import { Map } from '../../components/map/map.tsx';
import { useAppSelector } from '../../hooks/store.ts';
import { OfferApi } from '../../types/offer.ts';
import { getCity, getOffers, getSortingType } from '../../store/slices/offers/selectors.ts';

function MainCities() {
  const city = useAppSelector(getCity);
  const offers = useAppSelector(getOffers);
  const currentSortType = useAppSelector(getSortingType);
  const offersByCity = offers.filter((item) => item.city.name === city);
  const amountOffers = offersByCity.length;
  const utilsSort: {[key:string]: OfferApi[]} = {
    'Popular': offersByCity,
    'Price: low to high': offersByCity.slice().sort((a, b) => a.price - b.price),
    'Price: high to low': offersByCity.slice().sort((a, b) => b.price - a.price),
    'Top rated first': offersByCity.slice().sort((a, b) => b.rating - a.rating),
  };
  const sortedOffers = utilsSort[currentSortType];
  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{amountOffers} {amountOffers > 1 ? 'places' : 'place'} to stay in {city}</b>
          <OffersSorting />
          <CardList sortedOffers={sortedOffers} />
        </section>
        <div className="cities__right-section">
          {<Map city={offersByCity[0].city.location} points={offersByCity} />}
        </div>
      </div>
    </div>
  );
}

export { MainCities };
