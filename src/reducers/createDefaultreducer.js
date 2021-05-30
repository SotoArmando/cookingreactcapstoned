const ExpireTime = 60;

function createDefaultreducer(name) {
    return function defaultreducer(state = {}, payload) {
        const { type: dispatch, k, v } = payload;
        console.log(`${name}[${payload.type}]`)

        switch (dispatch) {
            case ("u_" + name):
                return { ...state, [k]: v, loaded_at: (new Date()).toISOString() };
            case ("d_" + name):
                delete state[k];
                return { ...state };
            case ("persist/REHYDRATE"): {
                if (payload.hasOwnProperty("payload") && payload.payload != undefined) {
                    const { payload: { [name]: rehydrate, [name]: { loaded_at } } } = payload;
                    let expireDate = new Date(loaded_at);
                    let isExpired = expireDate.setSeconds(expireDate.getSeconds() + ExpireTime) < new Date();
                    return { ...(isExpired ? state : rehydrate) }
                }
            }
            default:
                return { ...state };

        }
    }
}

function createMapDispatchtoProps() {
    return function x(dispatch) {
        return [{}, "appstate"].reduce((total, e) => {
            let b = "u_" + e,
                c = "d_" + e

            return {
                ...(total || {}),
                [b]: (k, v) => dispatch({ type: b, k, v }),
                [c]: (k, v) => dispatch({ type: c, k, v })
            }
        })
    }
}



export { createMapDispatchtoProps, createDefaultreducer }