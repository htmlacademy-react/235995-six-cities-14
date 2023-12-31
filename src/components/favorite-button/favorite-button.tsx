import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useAppSelector, useAppDispatch } from '../../hooks/store';
import { AppRoute, AuthorizationStatus, FAVORITE_BUTTON } from '../../const';
import { OfferApi, TFavoriteOfferState } from '../../types/offer';
import { postFavoriteOffer } from '../../store/api-actions';
import { offersSlice } from '../../store/slices/offers/offers';
import { useState } from 'react';
import { getUserAuthStatus } from '../../store/slices/user/selectors';
import { getFavoriteOffers} from '../../store/slices/favorites/selectors';

type favoriteButtonProps = {
  offer: OfferApi;
  widthBtn: string;
  heightBtn: string;
  block: string;
};

function FavoriteButton({offer, widthBtn = FAVORITE_BUTTON.main.width, heightBtn = FAVORITE_BUTTON.main.height, block = FAVORITE_BUTTON.main.bemBlock}: favoriteButtonProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const [isOn] = favoriteOffers.filter((favoriteOffer: OfferApi) => favoriteOffer.id === offer.id);
  const [isFavoriteButton, setIsFavoriteButton] = useState(isOn?.isFavorite);
  const authorizationStatus = useAppSelector(getUserAuthStatus);
  const favoriteOfferState: TFavoriteOfferState = {
    favoriteId: offer.id,
    status: isFavoriteButton ? 0 : 1,
  };
  const isNoAuth = authorizationStatus === AuthorizationStatus.NoAuth;
  const handleOnFavoriteButton = (): void => {
    if(isNoAuth) {
      navigate(AppRoute.Login);
      return;
    }
    dispatch(postFavoriteOffer(favoriteOfferState));
    setIsFavoriteButton(!isFavoriteButton);

    if (offer) {
      dispatch(offersSlice.actions.setFavoriteOffer(favoriteOfferState));
    }
  };

  return (
    <button onClick={handleOnFavoriteButton} className={classNames(`${block}__bookmark-button button`,
      {[`${block}__bookmark-button--active`] : isFavoriteButton && !isNoAuth})} type="button"
    >
      <svg className={`${block}__bookmark-icon`} width={widthBtn} height={heightBtn}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export { FavoriteButton };
