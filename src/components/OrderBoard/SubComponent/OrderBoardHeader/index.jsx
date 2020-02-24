import React, { memo } from 'react';
import classNames from 'classnames';
import Button from '@Components/Base/Button';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Styles from './index.module.css';

function OrderBoardHeader(orderBoardHeaderProps) {
  /* Global & Local States */
  const { onOpenEditOrderBoard } = orderBoardHeaderProps;
  /* Functions */
  /* Views */
  /* Main */
  return (
    <div className={classNames(Styles.orderBoardHeaderContainer)}>
      <Button
        size="small"
        variant="contained"
        color="primary"
        endIcon={<NoteAddIcon />}
        onClick={() => onOpenEditOrderBoard(0)}
      >
        Add
      </Button>
    </div>
  );
}

export default memo(OrderBoardHeader);
