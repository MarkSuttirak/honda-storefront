import Cookies from 'js-cookie';
import { ReactSession } from 'react-client-session';
ReactSession.setStoreType("sessionstorage");


const TokenKey = 'token';
const getToken = () => ReactSession.get(TokenKey);
const setToken = (token) => ReactSession.set(TokenKey, token);
const removeToken = () => sessionStorage.removeItem(TokenKey);
export { getToken, removeToken, setToken };