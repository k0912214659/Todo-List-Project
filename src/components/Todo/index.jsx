import React, { memo } from 'react';
import classNames from 'classnames';
import Styles from './index.module.css';

function Todo() {
  /* Global & Local States */
  /* Functions */
  /* Views */
  /* Main */
  return (
    <div className={classNames(Styles.todoContainer)}>
      Todo List Main View
    </div>
  );
}

export default memo(Todo);
