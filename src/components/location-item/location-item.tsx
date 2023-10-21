import { NavLink } from 'react-router-dom';

type cityName = {
  city: string;
}

function LocationItem({city}: cityName): JSX.Element {
  return (
    <li className="locations__item">
      <NavLink to={'/#'} className={({isActive}) => isActive ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'}>
        <span>{city}</span>
      </NavLink>
    </li>
  );
}

export {LocationItem};
