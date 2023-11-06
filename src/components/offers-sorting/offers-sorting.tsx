import { BaseSyntheticEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../store/';
import classNames from 'classnames';
import { SORT_TYPES } from '../../const';
import { offersSlice } from '../../store/slices/offers';

function OffersSorting() {
  const [isOpened, setIsOpened] = useState(false);
  const dispatch = useDispatch();
  const activeSortType = useSelector((state: State): string => state.offers.sortingType);
  const sortTypeClickHandle = (event: BaseSyntheticEvent): void => {
    const currentTypeSort = event.target.getAttribute('data-sort-type') as string;
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
        {SORT_TYPES.map((sortType) => <li className={classNames('places__option', {'places__option--active': activeSortType === sortType})} onClick={sortTypeClickHandle} tabIndex={0} key={sortType} data-sort-type={sortType} >{sortType}</li>)}
      </ul>
    </form>
  );
}

export { OffersSorting };
