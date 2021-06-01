import { createDefaultreducer } from '../../reducers/createDefaultreducer';

describe('createDefaultreducer must populate, persist and delete keys and values', () => {
  test('reducer must Update using new objects', () => {
    const reducer = createDefaultreducer('people');
    const state = reducer({}, {
      type: 'Updatepeople',
      k: 'Nick',
      v: '1',
    });

    expect(state).toMatchObject({
      Nick: '1',
    });
  });

  test('reducer must Delete using key values', () => {
    const reducer = createDefaultreducer('people');
    let state = reducer({}, {
      type: 'Updatepeople',
      k: 'Nick',
      v: '1',
    });
    state = reducer({}, {
      type: 'Deletepeople',
      k: 'Nick',
      v: '1',
    });

    expect(state).toMatchObject({
      Nick: undefined,
    });
  });

  test('reducer must Persist using payload', () => {
    const reducer = createDefaultreducer('people');
    const state = reducer({}, {
      type: 'persist/REHYDRATE',
      payload: {
        people: {
          LoadedAt: new Date().toISOString(),
          Nick: '1',
        },
      },
    });

    expect(state).toMatchObject({
      Nick: '1',
    });
  });

  test('reducer must Expire payload', () => {
    const reducer = createDefaultreducer('people');
    const date = new Date(Date.now() - 1000 * 61);
    const state = reducer({}, {
      type: 'persist/REHYDRATE',
      payload: {
        people: {
          LoadedAt: date,
          Nick: '1',
        },
      },
    });

    expect(state).toMatchObject({
    });
  });

  test('reducer not Persist expired payload', () => {
    const reducer = createDefaultreducer('people');
    const date = new Date(Date.now() - 1000 * 61);
    const state = reducer({}, {
      type: 'persist/REHYDRATE',
      payload: {
        people: {
          LoadedAt: date,
          Nick: '1',
        },
      },
    });

    expect(state).toMatchObject({
    });
  });
});
