import { ReactSession } from 'react-client-session';
ReactSession.setStoreType("sessionstorage");


const TokenKey = 'token';
const getToken = () => ReactSession.get(TokenKey);
const setToken = (token) => ReactSession.set(TokenKey, token);
const setSessionTime = (timestamp) => ReactSession.set('session_time', timestamp);
const getSessionTime = () => ReactSession.get('session_time');
const removeToken = () => sessionStorage.clear();
export { getToken, removeToken, setToken,setSessionTime,getSessionTime };