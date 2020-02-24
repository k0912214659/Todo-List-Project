import cloneDeep from 'lodash/cloneDeep';
import Immerable from '@Models/GeneralImmer';
import { getHostURL, getHostApiURL } from '@Tools/url-parser';
import TodoAPI from '@API';

const API_TARGET = [
  'local',
  'cloud',
];

class Global extends Immerable {
  constructor(props) {
    super();
    this.globalEnv = props.API_ENV;
    this.globalHost = getHostURL(props.API_ENV);
    this.globalAPIS = {
      api: new TodoAPI({
        host: getHostApiURL(props.API_ENV),
        target: API_TARGET[0],
      }),
      host: getHostURL(props.API_ENV),
    };
    this.globalLang = 'en';
  }

  updateGlobalLangs(newGlobalLang) {
    const cloneNewGlobalLang = cloneDeep(newGlobalLang);
    this.globalLang = cloneNewGlobalLang;
  }

  updateGlobalAPITarget(newTarget) {
    const newTargetIndex = API_TARGET.indexOf(newTarget);
    if (newTargetIndex > -1) {
      this.globalAPIS = new TodoAPI({
        host: getHostApiURL(this.globalEnv),
        target: API_TARGET[newTargetIndex],
      });
    } else {
      this.globalAPIS = new TodoAPI({
        host: getHostApiURL(this.globalEnv),
        target: API_TARGET[0],
      });
    }
  }
}

export default Global;
