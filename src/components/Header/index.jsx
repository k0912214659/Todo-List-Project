import React, { memo } from 'react';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Image from '@Components/Base/Image';
import { loadImage } from '@Tools/image-loader';
import Styles from './index.module.css';

function Header() {
  /* Global & Local States */
  /* Functions */
  /* Views */
  /* Main */
  return (
    <div className={classNames(Styles.headerContainer)}>
      <AppBar className={classNames(Styles.headerAppStyle)} position="static">
        <div className={classNames(Styles.headerLogoContainer)}>
          <div className={classNames(Styles.headerLogoIconContainer)}>
            <Image src={loadImage('general/logo.png')} />
          </div>
          <div className={classNames(Styles.headerLogoTextContainer)}>
            Order Board
          </div>
        </div>
      </AppBar>
    </div>
  );
}

export default memo(Header);
