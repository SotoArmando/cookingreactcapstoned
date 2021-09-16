import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, waitFor, screen, fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import Portraithomepath from '../containers/Portraithomepath';
import filter from './json_files/filter.json';
import categories from './json_files/categories.json';
import search from './json_files/search.json';
import linkpersistedstore from '../reducers/store';
import Cellcategory from '../components/Cellcategory';

const { store } = linkpersistedstore();

const server = setupServer(
  rest.get('https://themealdb.p.rapidapi.com/search.php', (req, res, ctx) => res(ctx.json(search))),
  rest.get('https://themealdb.p.rapidapi.com/list.php', (req, res, ctx) => res(ctx.json(categories))),
  rest.get('https://themealdb.p.rapidapi.com/filter.php', (req, res, ctx) => res(ctx.json(filter))),
  rest.get('https://themealdb.p.rapidapi.com/latest.php', (req, res, ctx) => res(ctx.json(filter))),
  rest.get('https://themealdb.p.rapidapi.com/lookup.php', (req, res, ctx) => res(ctx.json(filter))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loads and displays Cellcategories recipes', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <Portraithomepath />
      </Provider>,
    );
    await waitFor(() => screen.getByText('Beef'));

    fireEvent.click(screen.getByText('Beef'));
  });

  await waitFor(() => screen.getAllByTestId('Cellmeal'));

  expect((await screen.findAllByTestId('Cellmeal'))).toHaveLength(27);
  expect((await screen.findAllByTestId('Cellcategory'))).toHaveLength(14);
  // expect(screen.getByRole('button')).toBeDisabled();
});

test('Cellcategorie should be empty', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <Cellcategory />
      </Provider>,
    );
  });

  expect((await screen.findByTestId('Cellcategory'))).toContainHTML('');
});

test('Cellcategorie should assert data', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <Cellcategory strCategory="Data" />
      </Provider>,
    );
  });

  expect((await screen.findByTestId('Cellcategory'))).toContainHTML('Data');
});
