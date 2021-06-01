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
        debugger;
        const { payload: { [name]: rehydrate, [name]: { LoadedAt } } =
          { [name]: { LoadedAt: new Date().toISOString() }, [name]: rehydrate } } = Payload;
        const expireDate = new Date(LoadedAt);
        const isExpired = expireDate.setSeconds(expireDate.getSeconds() + ExpireTime) < new Date();
        return { ...(isExpired ? state : (Object.keys(rehydrate).length > 1 ? rehydrate : state)) };

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
