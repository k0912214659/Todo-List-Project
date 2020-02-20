import { GLOBAL_ACTION } from '@Reducers/createConstants';

/* Global */
export const SET_GLOBAL_LANG = ({ lang }) => ({
  type: GLOBAL_ACTION.SET_GLOBAL_LANG,
  lang,
});
export const SET_GLOBAL_SIDEBAR = ({ isSideBarOpen }) => ({
  type: GLOBAL_ACTION.SET_GLOBAL_SIDEBAR,
  isSideBarOpen,
});

/* Global Action */
export const postGlobalLang = (lang) => async (dispatch) => {
  dispatch(SET_GLOBAL_LANG({
    lang,
  }));
};
export const postGlobalSideBar = (isSideBarOpen) => async (dispatch) => {
  dispatch(SET_GLOBAL_SIDEBAR({
    isSideBarOpen,
  }));
};
