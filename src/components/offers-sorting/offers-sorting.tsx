import { MouseEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { SORT_TYPES } from '../../const';
import { offersSlice } from '../../store/slices/offers/offers';
import { getSortingType } from '../../store/slices/offers/selectors';

function OffersSorting() {
  const [isOpened, setIsOpened] = useState(false);
  const dispatch = useDispatch();
  const activeSortType = useSelector(getSortingType);
  const handleSortTypeClick = (event: MouseEvent<HTMLElement>): void => {
    const currentTypeSort = event.currentTarget.dataset.sortType ?? SORT_TYPES[0];
    dispatch(offersSlice.actions.sortType(currentTypeSort));
    setIsOpened(!isOpened);
  };
  const toggleSortingTypesHandle = () => {
    setIsOpened(!isOpened);
  };
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={toggleSortingTypesHandle}>
        {activeSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={classNames('places__options places__options--custom', {
        'places__options--opened': isOpened
      })}
      >
        {SORT_TYPES.map((sortType) => <li className={classNames('places__option', {'places__option--active': activeSortType === sortType})} onClick={handleSortTypeClick} tabIndex={0} key={sortType} data-sort-type={sortType} >{sortType}</li>)}
      </ul>
    </form>
  );
}

export { OffersSorting };
