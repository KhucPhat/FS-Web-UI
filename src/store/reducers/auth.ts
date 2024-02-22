/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/default-param-last */
import * as types from '../../constants/types'
const _ = require('lodash');

const initialState = {
    loading: false,
    isError: false,
    messageFail: null
};

export const loginReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.SIGNIN_REQUEST:
            let newState = _.cloneDeep(state);
            newState.loading = true;
            return newState;
        case types.SIGNIN_SUCCESS: {
            let newState = _.cloneDeep(state);
            newState.loading = false;
            return newState;
        }
        case types.SIGNIN_FAIL: {
            let { isError } = action.payload;
            let newState = _.cloneDeep(state);
            newState.isError = isError;
            return newState;
        }
        case types.MESSAGE_FAILED: {
            return {
                ...state,
                messageFail: action.payload
            };
        }
        default:
            return state;
    }
};
