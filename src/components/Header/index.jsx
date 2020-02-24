import React, { memo } from 'react';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import GitHubIcon from '@material-ui/icons/GitHub';
import Image from '@Components/Base/Image';
import { loadImage } from '@Tools/image-loader';
import Styles from './index.module.css';

function Header() {
  /* Functions */
  const onGotoPage = (url, type) => {
    if (!type) {
      window.open(url, '_blank');
    } else {
      window.open(url, type);
    }
  };
  /* Main */
  return (
    <div className={classNames(Styles.headerContainer)}>
      <AppBar className={classNames(Styles.headerAppStyle)} position="static">
        <div className={classNames(Styles.headerLogoContainer)}>
          <div
            className={classNames(Styles.headerLogoIconContainer)}
            role="button"
            tabIndex={-1}
            onClick={() => onGotoPage('/todo', '_self')}
            onKeyDown={() => {}}
          >
            <Image src={loadImage('general/logo.png')} />
          </div>
          <div className={classNames(Styles.headerLogoTextContainer)}>
            Order Board
          </div>
        </div>
        <div className={classNames(Styles.headerLogoProfileContainer)}>
          <div
            className={classNames(Styles.headerLogoProfileIconContainer)}
            role="button"
            tabIndex={-1}
            onClick={() => onGotoPage('https://github.com/k0912214659')}
            onKeyDown={() => {}}
          >
            <GitHubIcon />
          </div>
          <div className={classNames(Styles.headerLogoProfileTextContainer)}>
            Jason Wu
          </div>
        </div>
      </AppBar>
    </div>
  );
}

export default memo(Header);
