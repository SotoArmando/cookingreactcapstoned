const ExpireTime = 60;

/* eslint max-len: 0 */

function createDefaultreducer(name) {
  return function defaultreducer(state = {}, Payload) {
    const { type: dispatch, k, v } = Payload;

    switch (dispatch) {
      case (`Update${name}`):
        return { ...state, [k]: v, LoadedAt: (new Date()).toISOString() };
      case (`Delete${name}`):
        return { ...state, [k]: undefined };
      case ('persist/REHYDRATE'): {
        if ('payload' in Payload && Payload.payload !== undefined) {
          const { payload: { [name]: rehydrate, [name]: { LoadedAt } } } = Payload;
          const expireDate = new Date(LoadedAt);
          const isExpired = expireDate.setSeconds(expireDate.getSeconds() + ExpireTime) < new Date();
          return { ...(isExpired ? state : rehydrate) };
        }
        break;
      }

      default:
        return { ...state };
    }

    return 0;
  };
}

function createMapDispatchtoProps() {
  return function x(dispatch) {
    return [{}, 'appstate'].reduce((total, e) => {
      const b = `Update${e}`;
      const c = `Delete${e}`;

      return {
        ...(total || {}),
        [b]: (k, v) => dispatch({ type: b, k, v }),
        [c]: (k, v) => dispatch({ type: c, k, v }),
      };
    });
  };
}

export { createMapDispatchtoProps, createDefaultreducer };
