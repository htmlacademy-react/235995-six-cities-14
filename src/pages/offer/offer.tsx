import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import classNames from 'classnames';
// Components
import { Logo } from '../../components/logo/logo';
import { UserNavigation } from '../../components/user-navigation/user-navigation';
import { Map } from '../../components/map/map.tsx';
import { Card } from '../../components/card/card.tsx';
import { Spinner } from '../../components/spinner/spinner.tsx';
import { FavoriteButton } from '../../components/favorite-button/favorite-button.tsx';
import { RatingOffer } from '../../components/rating-offer/rating-offer.tsx';
// Types
import { isCommentsLoading } from '../../store/slices/user/selectors.ts';
import { getOfferType } from '../../utils';
import { MAX_IMAGES_COUNT, AppRoute, OFFER_CLASSES, LoadingStatus, FAVORITE_BUTTON } from '../../const.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import { fetchComments, fetchOfferAction, fetchOffersNearby } from '../../store/api-actions.ts';
import { dropOffer, setActiveOffer } from '../../store/slices/offers/offers.ts';
import { getOffer, isOfferLoading, isOffersNearbyLoading, selectNearby} from '../../store/slices/offers/selectors.ts';
import { Reviews } from '../../components/reviews/reviews.tsx';

function OfferPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const {id: offerId} = useParams();
  const offerById = useAppSelector(getOffer);

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
      dispatch(setActiveOffer(offerById));
    }
  }, [offerById, dispatch]);

  const nearbyCities = useAppSelector(selectNearby);

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
              {offerById?.images.slice(0, MAX_IMAGES_COUNT)?.map((image) => (
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
                <span>{offerById.isPremium ? 'Premium' : ''}</span>
              </div>
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offerById.title}
                </h1>
                <FavoriteButton offer={offerById} widthBtn={FAVORITE_BUTTON.offer.width} heightBtn={FAVORITE_BUTTON.offer.height} block={FAVORITE_BUTTON.offer.bemBlock} />
              </div>
              <RatingOffer />
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
              <Reviews />
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
