import React, { memo, useMemo } from 'react';
import classNames from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import { useTheme } from '@material-ui/core/styles';
import Styles from './index.module.css';

function Modal(props) {
  /* Global & Local States */
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    open,
    onClose,
    typeSize,
    children,
  } = props;
  /* Views */
  const RenderSize = useMemo(() => {
    switch (typeSize) {
      case 'xs':
        return 'xs';
      case 'sm':
        return 'sm';
      case 'md':
        return 'md';
      case 'lg':
        return 'lg';
      case 'xl':
        return 'xl';
      default:
        return 'sm';
    }
  }, [typeSize]);
  /* Main */
  return (
    <Dialog
      className={classNames(Styles.modalContainer)}
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth={RenderSize}
      disableEscapeKeyDown
      disableBackdropClick
    >
      {children}
    </Dialog>
  );
}

export default memo(Modal);
