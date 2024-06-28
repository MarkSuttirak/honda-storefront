import { ReactSession } from 'react-client-session';
ReactSession.setStoreType("sessionstorage");


const TokenKey = 'token';
const getToken = () => localStorage.getItem(TokenKey);
const setToken = (token) => localStorage.setItem(TokenKey, token);
const setSessionTime = (timestamp) => localStorage.setItem('session_time', timestamp);
const getSessionTime = () => localStorage.getItem('session_time');
const removeToken = () => localStorage.clear();
export { getToken, removeToken, setToken, setSessionTime, getSessionTime };