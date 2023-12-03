import { useParams } from 'react-router-dom';
import { ReviewForm } from '../../components/review-form/review-form.tsx';
import { MAX_REVIEW_COUNT } from '../../const';
import { useAppSelector } from '../../hooks/store.ts';
import { getComments } from '../../store/slices/user/selectors.ts';
import { Comment } from '../../types/user.ts';
import { getCurrentTime } from '../../utils.ts';
import { Review } from '../review/review';

function Reviews() {
  const {id: offerId} = useParams();
  const reviews = useAppSelector(getComments);
  const listReviews = reviews.slice().sort((a, b) => (getCurrentTime(b.date) - getCurrentTime(a.date))).slice(0, MAX_REVIEW_COUNT);
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">{reviews.length > 1 ? 'Reviews' : 'Review'} &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {listReviews.map((review: Comment) => <Review key={review.id} review={review} />)}
      </ul>
      <ReviewForm id={offerId} />
    </section>
  );
}

export { Reviews };
