import React, {
  memo,
  useMemo,
} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import IconButton from '@material-ui/core/IconButton';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import TablePagination from '@material-ui/core/TablePagination';
import classNames from 'classnames';
import Styles from './index.module.css';

function OrderBoardList(orderBoardListProps) {
  /* Global & Local States */
  const {
    orderBoardList,
    onOrderBoardPageClick,
    onOrderBoardItemRemove,
    onOpenEditOrderBoard,
  } = orderBoardListProps;
  /* Functions */
  const onOrderBoardPageChange = (event, page) => {
    event.preventDefault();
    const newPage = page + 1;
    onOrderBoardPageClick(newPage);
  };
  /* Views */
  const RenderPage = ({ from, to, count }) => (`${from}-${to === -1 ? count : to} of ${count}`);
  const RenderOrderBoardList = useMemo(() => (
    <List>
      {
        orderBoardList.list.map((board, index) => (
          <ListItem alignItems="flex-start" key={index}>
            <ListItemIcon>
              <SpeakerNotesIcon />
            </ListItemIcon>
            <ListItemText
              className={classNames(Styles.orderBoardListItemTextStyle)}
              primary={board.name}
              secondary={(
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    Notes :
                  </Typography>
                  <Typography
                    component="span"
                    className={classNames(Styles.orderBoardListItemSubTextStyle)}
                  >
                    {board.note}
                  </Typography>
                </React.Fragment>
              )}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => onOpenEditOrderBoard(1, board)}
              >
                <EditSharpIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onOrderBoardItemRemove(board.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))
      }
    </List>
  ), [orderBoardList]);
  const RenderOrderBoardPager = useMemo(() => (
    <TablePagination
      component="div"
      rowsPerPageOptions={[]}
      count={orderBoardList.page.total * 10}
      rowsPerPage={10}
      labelRowsPerPage=""
      labelDisplayedRows={RenderPage}
      page={orderBoardList.page.cur - 1}
      onChangePage={onOrderBoardPageChange}
      onChangeRowsPerPage={() => {}}
    />
  ), [orderBoardList]);
  /* Main */
  return (
    <div className={classNames(Styles.orderBoardListContainer)}>
      <div className={classNames(Styles.orderBoardListItemsContainer)}>
        {RenderOrderBoardList}
      </div>
      <div className={classNames(Styles.orderBoardListPagerContainer)}>
        {RenderOrderBoardPager}
      </div>
    </div>
  );
}

export default memo(OrderBoardList);
