import { OfferApi } from '../../types/offer';
import { FavoritesLocation } from '../favorites-location/favorites-location';

type favoriteOffersProps = {
  favoriteOffers: OfferApi[] | [];
}

function FavoritesNotEmpty({favoriteOffers}: favoriteOffersProps) {
  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            <FavoritesLocation favoriteOffers={favoriteOffers} />
          </ul>
        </section>
      </div>
    </main>
  );
}

export { FavoritesNotEmpty };
