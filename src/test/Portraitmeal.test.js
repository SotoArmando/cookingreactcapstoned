import { act } from 'react-dom/test-utils';

import React from 'react';

import { screen, waitFor } from '@testing-library/dom';
import { renderWithState } from './Renderwithstate';
import Homepath from '../components/Homepath';
import { Defaultstate, mealdbkeys } from '../fetch';

const teststate = {
    meals: [
        {
            'idMeal': '52959',
            'strMeal': 'Baked salmon with fennel & tomatoes',
            'strMealThumb': 'https://www.themealdb.com/images/media/meals/1548772327.jpg'
        }
    ],
    categories: [
        {
            'strCategory': 'Beef'
        }],
    mealslatest: [
        {
            'idMeal': '52959',
            'strMeal': 'Baked salmon with fennel & tomatoes',
            'strMealThumb': 'https://www.themealdb.com/images/media/meals/1548772327.jpg'
        }
    ],
}

test('[HandleFetch,handleLoad] Does load meal id ', async () => {
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
    expect(screen.getByTestId('WrappedrowlistLatest').children[0].children).toHaveLength(0)
})


test('Should display focusedmealdetails details', async () => {

})


