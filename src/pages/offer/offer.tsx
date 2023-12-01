import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import classNames from 'classnames';
// Components
import { Review } from '../../components/review/review';
import { Logo } from '../../components/logo/logo';
import { OfferForm } from '../../components/offer-form/offer-form';
import { UserNavigation } from '../../components/user-navigation/user-navigation';
import { Map } from '../../components/map/map.tsx';
import { Card } from '../../components/card/card.tsx';
import { Spinner } from '../../components/spinner/spinner.tsx';
import { FavoriteButton } from '../../components/favorite-button/favorite-button.tsx';
// Types
import { Comment } from '../../types/user.ts';
import { getComments, getUserAuthStatus, isCommentsLoading } from '../../store/slices/user/selectors.ts';
import { getOfferType, getRating } from '../../utils';
import { AuthorizationStatus, MAX_IMAGES_COUNT, MAX_REVIEW_COUNT, MAX_NEAR_PLACES_OFFER_COUNT, AppRoute, OFFER_CLASSES, LoadingStatus, FAVORITE_BUTTON_DATA } from '../../const.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import { fetchComments, fetchFavoriteOffers, fetchOfferAction, fetchOffersNearby } from '../../store/api-actions.ts';
import { dropOffer, getActiveOffer, getOffersNearby } from '../../store/slices/offers/offers.ts';
import { getOffer, isOfferLoading, isOffersNearbyLoading } from '../../store/slices/offers/selectors.ts';

function OfferPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const {id: offerId} = useParams();
  const authorizationStatus = useAppSelector(getUserAuthStatus);
  const offerById = useAppSelector(getOffer);
  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteOffers());
    }
  },[dispatch, authorizationStatus]);

  useEffect(() => {
    dispatch(fetchOfferAction(offerId));
    dispatch(fetchOffersNearby(offerId));
    dispatch(fetchComments(offerId));
    return () => {
      dispatch(dropOffer());
    };
  }, [offerId, dispatch]);

  useEffect(() => {
    if (offerById !== null) {
      dispatch(getActiveOffer(offerById));
    }
  }, [offerById, dispatch]);

  const nearbyCities = useAppSelector(getOffersNearby).slice(0, MAX_NEAR_PLACES_OFFER_COUNT);
  const getCurrentTime = (time: string) => (new Date(time)).getTime();
  // Получаем массив отзывов отсортированных по дате
  const reviews = useAppSelector(getComments);
  const listReviews = reviews.slice().sort((a, b) => (getCurrentTime(b.date) - getCurrentTime(a.date))).slice(0, MAX_REVIEW_COUNT);

  const isOfferDataLoading = useAppSelector(isOfferLoading);
  const isCommentsDataLoading = useAppSelector(isCommentsLoading);
  const isOffersNearbyDataLoading = useAppSelector(isOffersNearbyLoading);

  // Если данные загружаются показываем spinner
  if(isOfferDataLoading === LoadingStatus.Idle || isOfferDataLoading === LoadingStatus.Loading || isOffersNearbyDataLoading === LoadingStatus.Idle || isOffersNearbyDataLoading === LoadingStatus.Loading || isCommentsDataLoading) {
    return <Spinner />;
  }
  // если ошибка перенаправляем на страницу 404
  if(isOfferDataLoading === LoadingStatus.Error || isOffersNearbyDataLoading === LoadingStatus.Error || !offerById) {
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
              {offerById.images.slice(0, MAX_IMAGES_COUNT).map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              )
              )}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <div className={offerById.isPremium ? 'offer__mark' : ''}>
                <span>{offerById.isPremium ? 'Premium' : ''}</span>
              </div>
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offerById.title}
                </h1>
                <FavoriteButton offer={offerById} widthBtn={FAVORITE_BUTTON_DATA.offer.widthBtn} heightBtn={FAVORITE_BUTTON_DATA.offer.heightBtn} block={FAVORITE_BUTTON_DATA.offer.bemBlock} />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${getRating(offerById.rating)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offerById?.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {getOfferType(offerById.type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offerById?.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offerById.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offerById?.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offerById.goods.map((item) => (
                    <li key={item} className="offer__inside-item">
                      {item}
                    </li>)
                  )}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={classNames('offer__avatar-wrapper', 'user__avatar-wrapper', {'offer__avatar-wrapper--pro': offerById.host.isPro})}>
                    <img className="offer__avatar user__avatar" src={offerById.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {offerById.host.name}
                  </span>
                  {offerById.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offerById.description}
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
            <Map city={offerById.city.location} points={[...nearbyCities ?? [], offerById]} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearbyCities?.map((offerCard) => <Card key={offerCard.id} offer={offerCard} cardClassName={OFFER_CLASSES.offerPage} />)}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export { OfferPage };
