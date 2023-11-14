import { Helmet } from 'react-helmet-async';
import { Logo } from '../../components/logo/logo';
import { Link } from 'react-router-dom';
import { LOCATIONS } from '../../const';
import { FormEvent, useRef } from 'react';
import { useAppDispatch } from '../../hooks/store';
import { loginAction } from '../../store/api-actions';
import { userSlice } from '../../store/slices/user';

function LoginPage(): JSX.Element {
  const getRandomCity = (cities: string[]) => cities[Math.floor(Math.random() * 6)];
  const randomCity = getRandomCity(LOCATIONS);

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value
      }));
      dispatch(userSlice.actions.setUserEmail(loginRef.current.value));
    }
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities: authorization</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form onSubmit={handleSubmit} className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input ref={loginRef} className="login__input form__input" type="email" name="email" placeholder="Email" required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input ref={passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password" required
                  pattern="\d+[a-zA-Z]+|[a-zA-Z]+\d+"
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
            {/* onClick={() => navigate(AppRoute.Root)} */}
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={`/${randomCity}`}>
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export { LoginPage };
