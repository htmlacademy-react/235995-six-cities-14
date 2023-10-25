import { Offer } from '../../types/offer';
import { FavoritesCard } from '../favorites-card/favorites-card';

interface FavoritesLocationProps {
  offers: Offer[];
}

function FavoritesLocation({offers}: FavoritesLocationProps) {
  const favoriteOffers: Offer[] = offers.filter((offer: Offer): boolean => offer.isFavorite);
  const uniqueCitiesNames: string[] = [...new Set(favoriteOffers?.map((favoriteOffer: Offer): string => favoriteOffer.city))];
  return (
    uniqueCitiesNames.map((cityName: string) => (
      <li key={ cityName } className="favorites__locations-items">
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>{cityName ? cityName : ''}</span>
            </a>
          </div>
        </div>
        <div className="favorites__places">
          {favoriteOffers?.filter((it) => it.city === cityName)?.map((offer)=> <FavoritesCard key={offer.id} offer={offer}/>)}
        </div>
      </li>)
    )
  );
}

export {FavoritesLocation};
