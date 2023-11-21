import classNames from 'classnames';
import { useAppSelector } from '../../hooks/store';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { OfferApi } from '../../types/offer';

type favoriteButtonProps = {
  offer: OfferApi;
};

function FavoriteButton({offer}: favoriteButtonProps) {
  const navigate = useNavigate();
  const [isFavoriteCard, setIsFavoriteCard] = useState(offer.isFavorite);
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const handleOnFavoriteButton = (): void => {
    if(authorizationStatus === AuthorizationStatus.Unknown || authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login);
      return;
    }
    setIsFavoriteCard(!isFavoriteCard);
    offer.isFavorite = isFavoriteCard;
  };

  return (
    <button onClick={handleOnFavoriteButton} className={classNames('place-card__bookmark-button button', {
      'place-card__bookmark-button--active': offer.isFavorite})} type="button"
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

{/* <button className="offer__bookmark-button button" type="button">
  <svg className="offer__bookmark-icon" width="31" height="33">
    <use xlinkHref="#icon-bookmark"></use>
  </svg>
  <span className="visually-hidden">To bookmarks</span>
</button> */}

export { FavoriteButton };
