import * as types from '../../constants/types';

export const loginReq = (userName: any, passWord: any, token = null) => ({
    type: types.SIGNIN_REQUEST,
    payload: {
        userName,
        passWord,
        token
    }
});

export const loginSuccess = () => ({
    type: types.SIGNIN_REQUEST
});

export const loginFailed = (data: any) => ({
    type: types.SIGNIN_REQUEST,
    payload: data
});