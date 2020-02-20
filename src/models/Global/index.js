import cloneDeep from 'lodash/cloneDeep';
import Immerable from '@Models/GeneralImmer';
import { getHostURL } from '@Tools/url-parser';

class Global extends Immerable {
  constructor(props) {
    super();
    this.globalHost = getHostURL(props.API_ENV);
    this.globalAPIS = {
      host: getHostURL(props.API_ENV),
      target: 'local',
    };
    this.globalLang = 'en';
  }

  updateGlobalLangs(newGlobalLang) {
    const cloneNewGlobalLang = cloneDeep(newGlobalLang);
    this.globalLang = cloneNewGlobalLang;
  }
}

export default Global;
