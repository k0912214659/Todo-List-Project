import React, { memo, useMemo } from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Modal from '@Components/Base/Modal';
import useDispatch from '@Hooks/useDispatch';
import useMappedState from '@Hooks/useMappedState';
import { removeMessageConfirm } from '@Reducers/message/actions';
import Styles from './index.module.css';

/* Confirm Item */
function ConfirmItem(props) {
  /* Global & Local States */
  const { confirm, requestRemoveConfirm } = props;
  /* Functions */
  const onConfirmClick = () => {
    if (confirm.onConfirm) confirm.onConfirm();
    requestRemoveConfirm();
  };
  const onCancelClick = () => {
    if (confirm.onCancel) confirm.onCancel();
    requestRemoveConfirm();
  };
  /* Views */
  return (
    <React.Fragment>
      <DialogContent>
        <div className={classNames(Styles.confirmItemTitleContainer)}>
          {confirm.typeTitle && confirm.typeTitle}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onCancelClick}
        >
          No
        </Button>
        <Button
          onClick={onConfirmClick}
        >
          Yes
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}

function ModalConfirm() {
  /* Global & Local States */
  const dispatch = useDispatch();
  const message = useMappedState((state) => state.message);
  /* Functions */
  const requestRemoveConfirm = () => {
    dispatch(removeMessageConfirm());
  };
  /* Views */
  const RenderMessages = useMemo(() => {
    if (message.messageConfirmList.list.length > 0) {
      return (
        <ConfirmItem
          confirm={message.messageConfirmList.list[0]}
          requestRemoveConfirm={requestRemoveConfirm}
        />
      );
    }
    return (<React.Fragment />);
  }, [message.messageConfirmList]);
  const RenderIsMessageOpen = useMemo(() => {
    if (message.messageConfirmList.list.length > 0) {
      return true;
    }
    return false;
  }, [message.messageConfirmList]);
  /* Main */
  return (
    <Modal
      open={RenderIsMessageOpen}
      onClose={requestRemoveConfirm}
      typeSize="xs"
      typeBackground="white"
    >
      {RenderMessages}
    </Modal>
  );
}

export default memo(ModalConfirm);
