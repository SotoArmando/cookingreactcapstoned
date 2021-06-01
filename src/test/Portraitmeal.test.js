import { act } from 'react-dom/test-utils';

import React from 'react';

import { screen, waitFor } from '@testing-library/dom';
import renderWithState from './Renderwithstate';
import Homepath from '../components/Homepath';
import { Defaultstate } from '../fetch';
import Mswsetupserver from './mswsetupserver';
import Portraitmeal from '../components/Portraitmeal';
import '@testing-library/jest-dom/extend-expect';

const teststate = {
  meals: [
    {
      idMeal: '52959',
      strMeal: 'Baked salmon with fennel & tomatoes',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/1548772327.jpg',
    },
  ],
  categories: [
    {
      strCategory: 'Beef',
    }],
  mealslatest: [
    {
      idMeal: '52959',
      strMeal: 'Baked salmon with fennel & tomatoes',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/1548772327.jpg',
    },
  ],
};

const server = Mswsetupserver();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    id: '52959',
  }),
  useRouteMatch: () => ({ url: '/recipe/52959' }),
}));

it('[HandleFetch,handleLoad] Does load meal id ', async () => {
  await act(async () => {
    renderWithState(<Homepath />, {
      initialState: {
        appstate: {
          ...Defaultstate,
        },
      },
    });
  });

  expect(screen.getByTestId('Wrappedrowlistcategories'));
  expect(screen.getByTestId('Wrappedrowlistcategories').children[0].children).toHaveLength(0);

  expect(screen.getByTestId('Wrappedrowlistlibrary'));
  expect(screen.getByTestId('Wrappedrowlistlibrary').children[0].children).toHaveLength(0);

  expect(screen.getByTestId('WrappedrowlistLatest'));
  expect(screen.getByTestId('WrappedrowlistLatest').children[0].children).toHaveLength(0);
});

it('Should display focusedmealdetails details', async () => {
  await act(async () => {
    renderWithState(
      <Portraitmeal />, {
        initialState: {
          appstate: {
            ...Defaultstate,
            ...teststate,
            focusedmealdetails: {
              strArea: 'Testarea',
              strCategory: 'Testcategory',
              strInstructions: 'Testinstrucctions',
              strMeal: 'Testmeal',
              strMealThumb: 'Testmealthumb',
              strTags: 'Testags',
              strYoutube: 'Testyoutube',
            },
          },
        },
      },
    );
  });

  await waitFor(() => expect(screen.getByTestId('Portraitmeal')).toBeInTheDocument());
  expect(screen.getByTestId('Portraitmeal').children.length).toBe(7);
});

it('Should fetch and display focusedmealdetails details', async () => {
  await act(async () => {
    renderWithState(
      <Portraitmeal />, {
        initialState: {
          appstate: {
            ...Defaultstate,
          },
        },
      },
    );
  });

  await waitFor(() => expect(screen.getByTestId('Portraitmeal')).toBeInTheDocument());
  await waitFor(() => expect(screen.getByTestId('Portraitmeal').children.length).toBe(7));
});
