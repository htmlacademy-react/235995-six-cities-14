import { getOfferType, getRating } from '../../utils';
import { Link } from 'react-router-dom';
// import { useCard } from '../../hooks/use-card';
import { OfferApi } from '../../mocks/offers-api';
import classNames from 'classnames';
import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { offersSlice } from '../../store/slices/offers';

function Card(offer: OfferApi): JSX.Element {
  console.log(offer.type);
  const dispatch = useDispatch();
  const [isFavoriteCard, setIsFavoriteCard] = useState(offer.isFavorite);
  const favoriteButtonHandle = (): void => {
    setIsFavoriteCard(!isFavoriteCard);
    offer.isFavorite = isFavoriteCard;
  };
  const offerId: string = `/offer/${offer.id}`;
  const onMouseOverHandler = (): void => {
    dispatch(offersSlice.actions.getActiveOffer(offer.id.toString()));
    // setIsActiveCard((offer.id).toString());
  };
  const onMouseLeave = (): void => {
    dispatch(offersSlice.actions.getActiveOffer('null'))
    // setIsActiveCard('null');
  };
  return (
    <article onMouseOver={onMouseOverHandler} onMouseOut={onMouseLeave} className="cities__card place-card" >
      {offer.isPremium &&
      <div className='place-card__mark'>
        <span>Premium</span>
      </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
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
