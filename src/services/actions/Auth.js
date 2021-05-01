import * as api from '../../api/index.js';

export const signin = (formData, context) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        context.login({token: data.token, user: data.result})
    } catch (error) {
        console.error(error);
    }
};

export const signup = (formData, context) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        context.login({token: data.token, user: data.result})

    } catch (error) {
        console.error(error);
    }
};