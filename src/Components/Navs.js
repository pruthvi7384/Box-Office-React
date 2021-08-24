import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavList,LinkStyled } from './Navs.styled';

const LINKS = [
  { to: '/', text: 'Home' },
  { to: '/starred', text: 'Starred' },
];

const Navs = () => {
  const location =useLocation();
  console.log('location',location);
  return (
    <div>
      <NavList>
        {LINKS.map(item => (
          <li key={item.to}>
            <LinkStyled
            className={item.to===location.pathname ? 'active' : ''}
            to={item.to}>{item.text}</LinkStyled>
          </li>
        ))}
      </NavList>
    </div>
  );
};

export default Navs;
