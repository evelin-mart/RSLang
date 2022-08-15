import React from 'react';
import './styles.scss';
import { NavLink } from 'react-router-dom';


export const HeaderMenu = () => {
  const linkClassName = 'header-menu__item-link';
  const linkActiveModificator = 'header-menu__item-link_active';

  const checkActive = ({ isActive }: { isActive: boolean }) => isActive
    ? `${linkClassName} ${linkActiveModificator}`
    : linkClassName;
  
  return (
    <nav className="header__menu">
      <ul className="header-menu">
        <li className="header-menu__item">
          <NavLink className={checkActive} to="/textbook">Учебник</NavLink>
        </li>
        <li className="header-menu__item">
          <NavLink className={checkActive} to="/statistics">Статистика</NavLink>
        </li>
        <li className="header-menu__item">
          <NavLink className={checkActive} to="/game/audio">Аудиовызов</NavLink>
        </li>
        <li className="header-menu__item">
          <NavLink className={checkActive} to="/game/sprint">Спринт</NavLink>
        </li>
      </ul>
    </nav>
  )
}