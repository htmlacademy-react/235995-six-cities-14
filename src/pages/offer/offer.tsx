import { Navigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Review } from '../../components/review/review';
import { Logo } from '../../components/logo/logo';
import { OfferForm } from '../../components/offer-form/offer-form';
import { UserNavigation } from '../../components/user-navigation/user-navigation';
import { Map } from '../../components/map/map.tsx';
import { getOfferType, getRating } from '../../utils';
import { OfferApi } from '../../types/offer.ts';
import { IReview } from '../../mocks/reviews';
import { AuthorizationStatus, MAX_IMAGES_COUNT, MAX_REVIEW_COUNT, MAX_NEAR_PLACES_OFFER_COUNT, AppRoute, OFFER_CLASSES } from '../../const.ts';
import { State } from '../../types/state.ts';
import { useAppSelector } from '../../hooks/store.ts';
import { Card } from '../../components/card/card.tsx';

interface OfferProps {
  reviews: IReview[];
}

function OfferPage({reviews}: OfferProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const offersFull = useAppSelector((state: State): OfferApi[] => state.loadOffers.offers);
  const params = useParams();
  const offerById = offersFull?.find(({id}): boolean => (id).toString() === params.id);

  const offersByCity = offersFull.filter((offer) => offer.city.name === offerById?.city.name);
  const offersNearLocation = offersByCity.slice(0, MAX_NEAR_PLACES_OFFER_COUNT);
  // Получаем массив отзывов отсортированных по дате
  const listReviews = reviews?.slice(0, MAX_REVIEW_COUNT).sort((a, b)=> (new Date(b.date)).getTime() - (new Date(a.date)).getTime());
  // Проверяем включен ли офер в список оферов и если включен то добавляем еще один офер
  const getOffersNearLocation = (offersNearPlaces: OfferApi[], currentOffer: OfferApi): OfferApi[] => {
    const cloneOffersNearPlaces = offersNearPlaces.slice();
    if(cloneOffersNearPlaces.includes(currentOffer)) {
      return offersByCity.slice(0, MAX_NEAR_PLACES_OFFER_COUNT + 1);
    }
    cloneOffersNearPlaces.push(currentOffer);
    return cloneOffersNearPlaces;
  };
  if(!offerById) {
    return <Navigate to={AppRoute.Error} />;
  }
  return (
    <div className="page">
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <UserNavigation authorizationStatus={authorizationStatus} />
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offerById?.images.slice(0, MAX_IMAGES_COUNT).map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              )
              )}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <div className={offerById?.isPremium ? 'offer__mark' : ''}>
                <span>{offerById?.isPremium ? 'Premium' : ''}</span>
              </div>
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offerById?.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${getRating(offerById?.rating)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offerById?.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {getOfferType(offerById?.type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offerById?.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offerById?.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offerById?.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offerById?.goods.map((item) => (
                    <li key={item} className="offer__inside-item">
                      {item}
                    </li>)
                  )}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={offerById?.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {offerById?.host.name}
                  </span>
                  <span className="offer__user-status">
                    {offerById?.host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offerById?.description}
                  </p>
                </div>
              </div>
              {AuthorizationStatus.Auth &&
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">{reviews.length > 1 ? 'Reviews' : 'Review'} &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ul className="reviews__list">
                  {listReviews.map((review: IReview) => <Review key={review.id} review={review} />)}
                </ul>
                <OfferForm />
              </section>}

            </div>
          </div>
          <section className="offer__map map">
            {<Map city={offerById.city.location} points={getOffersNearLocation(offersNearLocation, offerById)} />}
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {offersNearLocation.map((offerCard) => <Card key={offerCard.id} offer={offerCard} cardClassName={OFFER_CLASSES.offerPage} />)}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export { OfferPage };
