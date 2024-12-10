import { create } from 'apisauce';
import { ApiSauceJson, ApiSauceMultipart, ApiSauceJsonExternal } from './Config';
const ApiSauce = create(ApiSauceJson);
export const ApiSauceExternal = create(ApiSauceJsonExternal); 

export const ApiSauceMu = create(ApiSauceMultipart);
export const _SetAuthToken = jwt => {
  ApiSauce.setHeader('Authorization', jwt);
  ApiSauceMu.setHeader('Authorization', jwt);
};
export const _RemoveAuthToken = () => {
  ApiSauce.deleteHeader('Authorization');
  ApiSauceMu.deleteHeader('Authorization');
};
export default ApiSauce;
