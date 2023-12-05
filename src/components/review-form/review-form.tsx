import { Fragment, FormEvent, useState } from 'react';
import { COMMENT_LENGTH, LoadingStatus, Rating } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchComments, postComment } from '../../store/api-actions';
import { isPostingStatus } from '../../store/slices/user/selectors';
import { toast } from 'react-toastify';

type OfferFormProps = {
  id: string | undefined;
}

function ReviewForm({id}: OfferFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [textareaFormData, setTextareaFormData] = useState('');
  const [radioButtonValue, setRadioButtonValue] = useState(0);

  const handleFieldChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const value = event.target.value;
    setTextareaFormData(value);
  };

  const handleRadioButtonValueChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRadioButtonValue(+event.target.value);
  };
  const postingStatus = useAppSelector(isPostingStatus);
  const isDisabled = textareaFormData.length <= COMMENT_LENGTH.min || radioButtonValue === 0 || textareaFormData.length >= COMMENT_LENGTH.max;
  const handleSubmitButton = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const comment = textareaFormData;
    const rating = +radioButtonValue;
    const readyComment = {
      id,
      comment,
      rating,
    };
    dispatch(postComment(readyComment)).unwrap().then(() => {
      dispatch(fetchComments(id));
      setTextareaFormData('');
      setRadioButtonValue(0);
    }).catch(() => {
      toast.error('Failed to send last review. You can try again');
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmitButton}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(Rating).reverse().map(([key, value] : string[]) =>
          (
            <Fragment key={key}>
              <input
                onChange={handleRadioButtonValueChange}
                className="form__rating-input visually-hidden"
                name="rating"
                value={key}
                id={`${key}-stars`}
                type="radio"
                checked={radioButtonValue === +key}
                disabled={postingStatus === LoadingStatus.Loading}
              />
              <label
                htmlFor={`${key}-stars`}
                className="reviews__rating-label form__rating-label"
                title={value}
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>))}
      </div>
      <textarea
        onChange={handleFieldChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        minLength={COMMENT_LENGTH.min}
        maxLength={COMMENT_LENGTH.max}

        value={textareaFormData}
        disabled={postingStatus === LoadingStatus.Loading}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isDisabled || postingStatus === LoadingStatus.Loading} >Submit</button>
      </div>
    </form>
  );
}

export { ReviewForm };
