import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useAppSelector, useAppDispatch } from '../../hooks/store';
import { AppRoute, AuthorizationStatus, LoadingStatus } from '../../const';
import { OfferApi, TFavoriteOfferState } from '../../types/offer';
import { Spinner } from '../spinner/spinner';
import { fetchFavoriteOffers, postFavoriteOffer } from '../../store/api-actions';
import { offersSlice } from '../../store/slices/offers';

type favoriteButtonProps = {
  offer: OfferApi;
  widthBtn: string;
  heightBtn: string;
  block: string;
};

function FavoriteButton({offer, widthBtn = '18', heightBtn = '19', block}: favoriteButtonProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const isFavoriteOffersLoading = useAppSelector((state) => state.favorites.isFavoriteOffersLoading);
  // const isFavoriteOfferPosting = useAppSelector((state) => state.favorites.isFavoriteOfferPosting);
  const favoriteOfferState: TFavoriteOfferState = {
    favoriteId: offer.id,
    status: offer.isFavorite ? 0 : 1,
  };
  const handleOnFavoriteButton = (): void => {
    if(authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login);
      return;
    }

    dispatch(postFavoriteOffer(favoriteOfferState)).unwrap().then(() => {
      dispatch(fetchFavoriteOffers());
    });

    if (offer) {
      dispatch(offersSlice.actions.setFavoriteOffer(offer));
    }
  };

  // const isFavoriteCurrentOffer = useAppSelector((state) => state.favorites.currentFavoriteOffer);
  if (authorizationStatus === AuthorizationStatus.Unknown || isFavoriteOffersLoading === LoadingStatus.Loading) {
    return (<Spinner />);
  }

  return (
    <button onClick={handleOnFavoriteButton} className={classNames(`${block}__bookmark-button button`,
      {[`${block}__bookmark-button--active`] : offer.isFavorite})} type="button"
    >
      <svg className={`${block}__bookmark-icon`} width={widthBtn} height={heightBtn}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export { FavoriteButton };
