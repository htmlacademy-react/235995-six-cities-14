import { Fragment, FormEvent, useState } from 'react';
import { RATING_NUMBERS } from '../../const';
import { useAppDispatch } from '../../hooks/store';
import { fetchComments, postComment } from '../../store/api-actions';

type OfferFormProps = {
  id: string | undefined;
}

function OfferForm({id}: OfferFormProps): JSX.Element {
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

  const isSubmit = (): boolean => textareaFormData.length < 50 || radioButtonValue === 0 || textareaFormData.length > 300;

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
      setTextareaFormData('');
      setRadioButtonValue(0);
    });
    dispatch(fetchComments(id));
    setTextareaFormData(comment);
    setRadioButtonValue(rating);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmitButton}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          RATING_NUMBERS.map((number) => (
            <Fragment key={number}>
              <input
                onChange={handleRadioButtonValueChange}
                className="form__rating-input visually-hidden"
                name="rating"
                value={number}
                id={`${number}-stars`}
                type="radio"
                checked={radioButtonValue === number}
              />
              <label
                htmlFor={`${number}-stars`}
                className="reviews__rating-label form__rating-label"
                title="perfect"
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          ))
        }
      </div>
      <textarea
        onChange={handleFieldChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        minLength={50}
        maxLength={300}
        value={textareaFormData}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmit()} >Submit</button>
      </div>
    </form>
  );
}

export { OfferForm };
