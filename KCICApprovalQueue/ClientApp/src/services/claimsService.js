import BaseService from './baseService';

//TODO: redux-ify the calls to this
export default class ClaimsService extends BaseService {
  /* eslint-disable no-useless-constructor */
  constructor(getState) {
    super(getState);

  }

  async addClaim(data) {
    let response = await this.post("/api/Claims", data);
    return await response;
    
  }

  async getClaims() {
    let response = await this.get("api/Claims");
    return await response.json();
  }
}