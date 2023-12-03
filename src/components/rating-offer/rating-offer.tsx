import { useAppSelector } from '../../hooks/store';
import { getOffer } from '../../store/slices/offers/selectors';
import { getRating } from '../../utils';

function RatingOffer() {
  const offerById = useAppSelector(getOffer);
  return (
    <div className="offer__rating rating">
      <div className="offer__stars rating__stars">
        <span style={{width: `${getRating(offerById?.rating)}%`}}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      <span className="offer__rating-value rating__value">{offerById?.rating}</span>
    </div>
  );
}

export { RatingOffer };
