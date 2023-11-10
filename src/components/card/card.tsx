import { getOfferType, getRating } from '../../utils';
import { Link, useLocation } from 'react-router-dom';
import { OfferApi } from '../../mocks/offers-api';
import classNames from 'classnames';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/store.ts'; //, useAppSelector
import { offersSlice } from '../../store/slices/offers';

interface CardProps {
  offer: OfferApi;
  cardClassName: string;
}

function Card({offer, cardClassName}: CardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [isFavoriteCard, setIsFavoriteCard] = useState(offer.isFavorite);
  const favoriteButtonHandle = (): void => {
    setIsFavoriteCard(!isFavoriteCard);
    offer.isFavorite = isFavoriteCard;
  };
  const location = useLocation();
  const pathName = location.pathname.slice(1,6);
  const offerId: string = `/offer/${offer.id}`;

  const onMouseOverHandler = (): void => {
    if(pathName !== 'offer') {
      dispatch(offersSlice.actions.getActiveOffer(offer));
    }

  };
  const onMouseLeave = (): void => {
    if(pathName !== 'offer') {
      dispatch(offersSlice.actions.getActiveOffer(undefined));
    }
  };
  return (
    <article onMouseOver={onMouseOverHandler} onMouseOut={onMouseLeave} className={`${cardClassName}__card place-card`} >
      {offer.isPremium &&
      <div className='place-card__mark'>
        <span>Premium</span>
      </div>}
      <div className={`${cardClassName}__image-wrapper place-card__image-wrapper`}>
        <Link to={offerId}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button onClick={favoriteButtonHandle} className={classNames('place-card__bookmark-button button', {
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
          <Link to={offerId}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{ getOfferType(offer.type) }</p>
      </div>
    </article>
  );
}

export { Card };
