import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, waitFor, screen, fireEvent, act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import Portraithomepath from '../components/Portraithomepath';
import filter from './json_files/filter.json';
import categories from './json_files/categories.json';
import search from './json_files/search.json';
import linkpersistedstore from '../reducers/store';

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

test('loads and displays recipes and categories', async () => {
  render(
    <Provider store={store}>
      <Portraithomepath />
    </Provider>,
  );

  await waitFor(() => screen.getAllByTestId('Cellmeal'));

  expect((await screen.findAllByTestId('Cellmeal'))).toHaveLength(27);
  expect((await screen.findAllByTestId('Cellcategory'))).toHaveLength(14);
});

test('search and displays recipes starting with A', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <Portraithomepath />
      </Provider>,
    );
    userEvent.type(screen.getByTestId('Rowsearchinput'), 'A');
    fireEvent.keyDown(screen.getByTestId('Rowsearchinput'), { key: 'Enter', code: 'Enter' });
    await waitFor(() => screen.getAllByTestId('Cellmeal'));
    await screen.findByText('Spicy Arrabiata Penne');
  });

  expect((await screen.findAllByTestId('Cellmeal'))).toHaveLength(1);
});
