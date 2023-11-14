import { getOfferType, getRating } from '../../utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { OfferApi } from '../../types/offer.ts';
import classNames from 'classnames';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import { offersSlice } from '../../store/slices/offers';
import { AppRoute, AuthorizationStatus } from '../../const.ts';

interface CardProps {
  offer: OfferApi;
  cardClassName: string;
}

function Card({offer, cardClassName}: CardProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isFavoriteCard, setIsFavoriteCard] = useState(offer.isFavorite);
  const handleOnFavoriteButton = (): void => {
    if(authorizationStatus === AuthorizationStatus.Unknown || authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login);
      return;
    }
    setIsFavoriteCard(!isFavoriteCard);
    offer.isFavorite = isFavoriteCard;
  };
  const location = useLocation();
  const pathName = location.pathname.slice(1,6);
  const offerId: string = `/offer/${offer.id}`;

  const handleOnMouseOver = (): void => {
    if(pathName !== 'offer') {
      dispatch(offersSlice.actions.getActiveOffer(offer));
    }

  };
  const handleOnMouseLeave = (): void => {
    if(pathName !== 'offer') {
      dispatch(offersSlice.actions.getActiveOffer(undefined));
    }
  };
  // Меняет активный город на странице офера
  const handleClickCard = (): void => {
    dispatch(offersSlice.actions.getActiveOffer(offer));
  };

  return (
    <article onMouseOver={handleOnMouseOver} onMouseOut={handleOnMouseLeave} className={`${cardClassName}__card place-card`} >
      {offer.isPremium &&
      <div className='place-card__mark'>
        <span>Premium</span>
      </div>}
      <div className={`${cardClassName}__image-wrapper place-card__image-wrapper`}>
        <Link to={offerId} onClick={handleClickCard}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button onClick={handleOnFavoriteButton} className={classNames('place-card__bookmark-button button', {
            'place-card__bookmark-button--active': offer.isFavorite})} type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getRating(offer.rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerId} onClick={handleClickCard}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{ getOfferType(offer.type) }</p>
      </div>
    </article>
  );
}

export { Card };
