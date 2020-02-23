import React, {
  memo,
  useState,
  useEffect,
  useMemo,
} from 'react';
import classNames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Modal from '@Components/Base/Modal';
import Styles from './index.module.css';

const OrderBoardDef = {
  name: '',
  price: 0,
  note: '',
};

const FocusDef = {
  name: false,
  price: false,
};

function ModalOrderBoardEditor(props) {
  /* Global & Local States */
  const {
    open,
    data,
    type,
    onClose,
    onCreate,
    onUpdate,
  } = props;
  const [orderBoardObject, setOrderBoardObject] = useState(OrderBoardDef);
  const [isInputOnFocus, setIsInputOnFocus] = useState(FocusDef);
  const [isLoading, setIsLoading] = useState(false);
  /* Functions */
  const onTextChange = (event) => {
    const newOrderBoardObject = cloneDeep(orderBoardObject);
    switch (event.target.name) {
      case 'name':
        newOrderBoardObject.name = event.target.value;
        break;
      case 'price':
        if (Number.isFinite(Number(event.target.value)) && Number(event.target.value) >= 0) {
          newOrderBoardObject.price = Number(event.target.value);
        }
        break;
      case 'note':
        newOrderBoardObject.note = event.target.value;
        break;
      default:
        break;
    }
    setOrderBoardObject(newOrderBoardObject);
  };
  const onTextFocus = (event) => {
    const newIsInputOnFocus = cloneDeep(isInputOnFocus);
    switch (event.target.name) {
      case 'name':
        if (!newIsInputOnFocus.name) {
          newIsInputOnFocus.name = true;
        }
        break;
      case 'price':
        if (!newIsInputOnFocus.price) {
          newIsInputOnFocus.price = true;
        }
        break;
      default:
        break;
    }
    setIsInputOnFocus(newIsInputOnFocus);
  };
  const onCancelClick = () => {
    onClose();
    setIsInputOnFocus(FocusDef);
    setOrderBoardObject(OrderBoardDef);
    setIsLoading(false);
  };
  const onCreateClick = () => {
    if (type === 0) {
      onCreate(orderBoardObject, onCancelClick);
    }
    if (type === 1) {
      const newOrderBoardObject = {
        name: orderBoardObject.name,
        price: orderBoardObject.price,
        note: orderBoardObject.note,
      };
      onUpdate(data.id, newOrderBoardObject, onCancelClick);
    }
    setIsLoading(true);
  };
  /* Views */
  const RenderTitle = useMemo(() => {
    switch (type) {
      case 0:
        return 'Create Board Item';
      case 1:
        return 'Update Board Item';
      default:
        return 'Create Board Item';
    }
  }, [type]);
  const RenderButtonText = useMemo(() => {
    switch (type) {
      case 0:
        return 'Create';
      case 1:
        return 'Update';
      default:
        return 'Create';
    }
  }, [type]);
  const RenderErrorName = useMemo(() => {
    if (!orderBoardObject.name && isInputOnFocus.name) {
      return 'Please enter name';
    }
    return '';
  }, [orderBoardObject, isInputOnFocus]);
  const RenderErrorNameBoolean = useMemo(() => {
    if (!orderBoardObject.name && isInputOnFocus.name) {
      return true;
    }
    return false;
  }, [orderBoardObject, isInputOnFocus]);
  const RenderErrorPrice = useMemo(() => {
    if (orderBoardObject.price <= 0 && isInputOnFocus.price) {
      return 'Please enter the price larger then 0';
    }
    return '';
  }, [orderBoardObject, isInputOnFocus]);
  const RenderErrorPriceBoolean = useMemo(() => {
    if (!orderBoardObject.price && isInputOnFocus.price) {
      return true;
    }
    if (orderBoardObject.price <= 0 && isInputOnFocus.price) {
      return true;
    }
    return false;
  }, [orderBoardObject, isInputOnFocus]);
  const RenderConfirmDisable = useMemo(() => {
    if (orderBoardObject.name && orderBoardObject.price > 0 && !isLoading) {
      return false;
    }
    return true;
  }, [orderBoardObject, isLoading]);
  const RenderCancelDisable = useMemo(() => {
    if (!isLoading) {
      return false;
    }
    return true;
  }, [isLoading]);
  const RenderTextInput = useMemo(() => (
    <React.Fragment>
      <TextField
        className={classNames(Styles.modalOrderBoardEditorInputStyle)}
        label="Name"
        name="name"
        margin="dense"
        inputProps={{
          maxLength: 50,
        }}
        helperText={RenderErrorName}
        error={RenderErrorNameBoolean}
        value={orderBoardObject.name}
        onChange={onTextChange}
        onBlur={onTextFocus}
      />
      <TextField
        className={classNames(Styles.modalOrderBoardEditorInputStyle)}
        label="Price"
        name="price"
        margin="dense"
        helperText={RenderErrorPrice}
        error={RenderErrorPriceBoolean}
        value={orderBoardObject.price}
        onChange={onTextChange}
        onBlur={onTextFocus}
      />
      <TextField
        className={classNames(Styles.modalOrderBoardEditorInputStyle)}
        label="Note"
        name="note"
        margin="dense"
        multiline
        placeholder="optional"
        rowsMax="20"
        inputProps={{
          maxLength: 200,
        }}
        value={orderBoardObject.note}
        onChange={onTextChange}
      />
    </React.Fragment>
  ), [orderBoardObject, isInputOnFocus]);
  /* Hooks */
  useEffect(() => {
    if (type === 1) {
      setOrderBoardObject({
        name: data.name,
        price: data.price,
        note: data.note,
      });
    }
  }, [data]);
  /* Main */
  return (
    <Modal
      open={open}
      onClose={onCancelClick}
      typeIsLoading={isLoading}
    >
      <DialogTitle
        className={classNames(Styles.modalOrderBoardEditorTitleStyle)}
      >
        {RenderTitle}
      </DialogTitle>
      <DialogContent>
        <div className={classNames(Styles.modalOrderBoardEditorInputContainer)}>
          {RenderTextInput}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={RenderCancelDisable}
          onClick={onCancelClick}
        >
          Cancel
        </Button>
        <Button
          disabled={RenderConfirmDisable}
          onClick={onCreateClick}
        >
          {RenderButtonText}
        </Button>
      </DialogActions>
    </Modal>
  );
}

export default memo(ModalOrderBoardEditor);
