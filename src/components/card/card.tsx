import { getOfferType, getRating } from '../../utils';
import { Link, useLocation } from 'react-router-dom';
import { OfferApi } from '../../types/offer.ts';
import { useAppDispatch } from '../../hooks/store.ts';
import { offersSlice } from '../../store/slices/offers';
import { FavoriteButton } from '../favorite-button/favorite-button.tsx';
import { OFFER_IMAGE_PROPERTY } from '../../const.ts';

interface CardProps {
  offer: OfferApi;
  cardClassName: string;
}

function Card({offer, cardClassName}: CardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const pathName = location.pathname.slice(1);
  const offerPathName = location.pathname.slice(1, 6);
  const offerId: string = `/offer/${offer.id}`;
  const handleOnMouseOver = (): void => {
    if(offerPathName !== 'offer') {
      dispatch(offersSlice.actions.getActiveOffer(offer));
    }

  };
  const handleOnMouseLeave = (): void => {
    if(offerPathName !== 'offer') {
      dispatch(offersSlice.actions.getActiveOffer(null));
    }
  };
  // Меняет активный город на странице офера
  const handleClickCard = (): void => {
    dispatch(offersSlice.actions.getActiveOffer(offer));
  };

  const getImageProperty = (path: string) => Object.hasOwn(OFFER_IMAGE_PROPERTY, path) // OFFER_IMAGE_PROPERTY.hasOwnProperty(path)
    ? OFFER_IMAGE_PROPERTY.favorites
    : OFFER_IMAGE_PROPERTY.main;

  const imageProperty = getImageProperty(pathName);

  return (
    <article onMouseOver={handleOnMouseOver} onMouseOut={handleOnMouseLeave} className={`${cardClassName}__card place-card`} >
      {offer.isPremium &&
      <div className='place-card__mark'>
        <span>Premium</span>
      </div>}
      <div className={`${cardClassName}__image-wrapper place-card__image-wrapper`}>
        <Link to={offerId} onClick={handleClickCard}>
          <img className="place-card__image" src={offer.previewImage} width={imageProperty.width} height={imageProperty.height} alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton offer={offer} widthBtn={'18'} heightBtn={'19'} block={'place-card'} />
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
