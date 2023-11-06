import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { offersSlice } from '../../store/slices/offers';

type cityName = {
  city: string;
}

function LocationItem({city}: cityName): JSX.Element {
  const dispatch = useDispatch();
  return (
    <li className="locations__item">
      <NavLink to={`/${city}`} className={({isActive}) => isActive ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'}
        onClick={() => dispatch(offersSlice.actions.setCity(city))}
      >
        <span>{city}</span>
      </NavLink>
    </li>
  );
}

export {LocationItem};
