import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useAppSelector, useAppDispatch } from '../../hooks/store';
import { AppRoute, AuthorizationStatus } from '../../const'; // LoadingStatus
import { OfferApi, TFavoriteOfferState } from '../../types/offer';
import { fetchFavoriteOffers, postFavoriteOffer } from '../../store/api-actions';
import { offersSlice } from '../../store/slices/offers';
import { useState } from 'react';
import { store } from '../../store';

type favoriteButtonProps = {
  offer: OfferApi;
  widthBtn: string;
  heightBtn: string;
  block: string;
};

store.dispatch(fetchFavoriteOffers());

function FavoriteButton({offer, widthBtn = '18', heightBtn = '19', block}: favoriteButtonProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favoriteOffers = useAppSelector((state) => state.favorites.favoriteOffers);
  const [isOn] = favoriteOffers.filter((favoriteOffer) => favoriteOffer.id === offer.id);
  const [isFavoriteButton, setIsFavoriteButton] = useState(isOn?.isFavorite);
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const favoriteOfferState: TFavoriteOfferState = {
    favoriteId: offer.id,
    status: isFavoriteButton ? 0 : 1,
  };

  const handleOnFavoriteButton = (): void => {
    if(authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login);
      return;
    }

    dispatch(postFavoriteOffer(favoriteOfferState)).unwrap().then(() => {
      dispatch(fetchFavoriteOffers());
    });
    setIsFavoriteButton(!isFavoriteButton);
    if (offer) {
      dispatch(fetchFavoriteOffers());
      dispatch(offersSlice.actions.setFavoriteOffer(favoriteOfferState));
    }
  };

  return (
    <button onClick={handleOnFavoriteButton} className={classNames(`${block}__bookmark-button button`,
      {[`${block}__bookmark-button--active`] : isFavoriteButton})} type="button"
    >
      <svg className={`${block}__bookmark-icon`} width={widthBtn} height={heightBtn}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export { FavoriteButton };
