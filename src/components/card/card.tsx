import { Offer } from '../app';

interface CardProps {
  offer?: Offer;
}

const getOfferType = (offerType: string = ''): string | undefined => offerType[0]?.toUpperCase() + offerType?.slice(1);

function Card({offer}: CardProps): JSX.Element {
  return (
    <article className="cities__card place-card">
      <div className={offer?.isPremium ? 'place-card__mark' : '' }>
        <span>{offer?.isPremium ? 'Premium' : ''}</span>
      </div>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src="img/apartment-01.jpg" width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer?.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: '80px'}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{offer?.title}</a>
        </h2>
        <p className="place-card__type">{ getOfferType(offer?.type) }</p>
      </div>
    </article>
  );
}

export { Card };
