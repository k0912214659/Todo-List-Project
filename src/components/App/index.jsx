import React, {
  memo,
  useMemo,
} from 'react';
import {
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import classNames from 'classnames';
import useMappedState from '@Hooks/useMappedState';
import Header from '@Components/Header';
import LazyComponent from '@Components/Base/Lazy';
import ModalDialog from '@Components/Modals/ModalDialog';
import ModalConfirm from '@Components/Modals/ModalConfirm';
import Styles from './index.module.css';

function App({ Router, routerProps }) {
  /* Global & Local States */
  const storeMessage = useMappedState((state) => state.message);
  /* Views */
  const RenderMainView = useMemo(() => (
    <div className={classNames(Styles.appContainer)}>
      <div className={classNames(Styles.appHeader)}>
        <Header />
      </div>
      <div className={classNames(Styles.appBody)}>
        <div className={classNames(Styles.appHeart)}>
          <div className={classNames(Styles.appMain)}>
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Redirect to="/todo" />}
              />
              <Route
                path="/todo"
                render={() => <LazyComponent componentImport={import('@Components/OrderBoard')} componentChunkName="todoChunk" />}
              />
              <Redirect to="/todo" />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  ), []);
  const RenderConfirm = useMemo(() => (
    <ModalConfirm />
  ), [storeMessage]);
  const RenderDialog = useMemo(() => (
    <ModalDialog />
  ), [storeMessage]);
  /* Hooks */
  return (
    <Router {...routerProps}>
      {RenderMainView}
      {RenderDialog}
      {RenderConfirm}
    </Router>
  );
}

export default memo(App);
