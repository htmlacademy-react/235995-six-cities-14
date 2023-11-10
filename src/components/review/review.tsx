import { IReview } from '../../mocks/reviews';

interface ReviewProps {
  review: IReview;
}

function Review({review}: ReviewProps): JSX.Element {
  const date = new Date(review.date);
  const month = date.toLocaleString('en', { month: 'long' });
  const year = date.getFullYear();
  const reviewDate = `${month} ${year}`;
  const dateTimeReview = `${year}-${(date.getMonth()).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}`;
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${review.rating * 100 / 5}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={dateTimeReview}>{reviewDate}</time>
      </div>
    </li>
  );
}

export { Review };
