import React from 'react';
import { RssLogo } from 'widgets/rss-logo';
import './styles.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__year">
          2022
        </div>
        <RssLogo />
        <ul className="footer__github-links github-links">
          <li className="github-links__item">
            <a href="#">GithubLink1</a>
          </li>
          <li className="github-links__item">
            <a href="#">GithubLink2</a>
          </li>
          <li className="github-links__item">
            <a href="#">GithubLink3</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}