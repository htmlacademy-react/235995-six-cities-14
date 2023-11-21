import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// Components
import { Review } from '../../components/review/review';
import { Logo } from '../../components/logo/logo';
import { OfferForm } from '../../components/offer-form/offer-form';
import { UserNavigation } from '../../components/user-navigation/user-navigation';
import { Map } from '../../components/map/map.tsx';
import { Card } from '../../components/card/card.tsx';

import { getOfferType, getRating } from '../../utils';
import { OfferApi } from '../../types/offer.ts';
import { AuthorizationStatus, MAX_IMAGES_COUNT, MAX_REVIEW_COUNT, MAX_NEAR_PLACES_OFFER_COUNT, AppRoute, OFFER_CLASSES } from '../../const.ts';
import { State } from '../../types/state.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import { fetchComments, fetchOfferAction, fetchOffersNearby } from '../../store/api-actions.ts';
import { store } from '../../store/index.ts';
import { offersSlice } from '../../store/slices/offers.ts';
import { Comment } from '../../types/user.ts';

function OfferPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const {id: offerId} = useParams();
  const authorizationStatus = useAppSelector((state: { user: { authorizationStatus: AuthorizationStatus } }) => state.user.authorizationStatus);
  const offerById = useAppSelector((state: State): OfferApi | null => state.offers.offer);
  dispatch(offersSlice.actions.getLoadOffer(offerById));

  useEffect(() => {
    store.dispatch(fetchOfferAction(offerId));
    store.dispatch(fetchOffersNearby(offerId));
    dispatch(fetchComments(offerId));
    return () => {
      dispatch(offersSlice.actions.getLoadOffer(null));
    };

  }, [offerId, dispatch]);

  const offersNearLocation = useAppSelector((state: State): OfferApi[] | null => state.offers.offersNearby)?.slice(0, MAX_NEAR_PLACES_OFFER_COUNT);
  const NearbyCities = offersNearLocation?.slice();
  NearbyCities?.push(offerById as OfferApi);
  // Получаем массив отзывов отсортированных по дате
  const reviews = useAppSelector((state: State): Comment[] | [] => state.user.comments);
  const listReviews = reviews.slice().sort((a, b)=> (new Date(b.date)).getTime() - (new Date(a.date)).getTime()).slice(0, MAX_REVIEW_COUNT);
  // Проверяем получен ли офер по id
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
            <UserNavigation />
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
              {authorizationStatus === AuthorizationStatus.Auth &&
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">{reviews.length > 1 ? 'Reviews' : 'Review'} &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ul className="reviews__list">
                  {listReviews?.map((review: Comment) => <Review key={review.id} review={review} />)}
                </ul>
                <OfferForm id={offerId} />
              </section>}

            </div>
          </div>
          <section className="offer__map map">
            {<Map city={offerById.city.location} points={NearbyCities} />}
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {offersNearLocation?.map((offerCard) => <Card key={offerCard.id} offer={offerCard} cardClassName={OFFER_CLASSES.offerPage} />)}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export { OfferPage };
