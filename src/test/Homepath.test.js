import { act } from 'react-dom/test-utils';

import React from 'react';

import { createEvent, fireEvent, screen, waitFor } from '@testing-library/dom';
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

test('All grid wrappers should be empty', async () => {
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

test('display Categories', async () => {
    await act(async () => {
        renderWithState(<Homepath />, {
            initialState: {
                appstate: {
                    ...Defaultstate,
                    ...teststate
                },
            },
        });
    });

    expect(screen.getAllByTestId('Cellcategory'));
    expect(screen.getAllByTestId('Cellcategory')).toHaveLength(1);
});

test('display latest meals', async () => {
    await act(async () => {
        renderWithState(<Homepath />, {
            initialState: {
                appstate: {
                    ...Defaultstate,
                    ...teststate
                },
            },
        });
    });

    expect(screen.getByTestId('WrappedrowlistLatest'));
    expect(screen.getByTestId('WrappedrowlistLatest').children[0].children).toHaveLength(1)
});

test('display library meals', async () => {
    await act(async () => {
        renderWithState(<Homepath />, {
            initialState: {
                appstate: {
                    ...Defaultstate,
                    ...teststate
                },
            },
        });
    });

    expect(screen.getByTestId('Wrappedrowlistlibrary'));
    expect(screen.getByTestId('Wrappedrowlistlibrary').children[0].children).toHaveLength(1);
});


test('[handleLoadFetch, handleFetch][This test Fetch and Wait if failed please try again] fetchs and displays categories, meals, and latesterecipe', async () => {

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
    await waitFor(() => expect(screen.getByTestId('Wrappedrowlistcategories').children[0].children).toHaveLength(14)); 

    expect(screen.getByTestId('WrappedrowlistLatest'));
    await waitFor(() => expect(screen.getByTestId('WrappedrowlistLatest').children[0].children).toHaveLength(10)); 

    expect(screen.getByTestId('Wrappedrowlistlibrary'));
    await waitFor(() => expect(screen.getByTestId('Wrappedrowlistlibrary').children[0].children).toHaveLength(27)); 
})

test('handleSearch Rice must result in 2 items', async () => {
    await act(async () => {
        renderWithState(<Homepath />, {
            initialState: {
                appstate: {
                    ...Defaultstate,
                },
            },
        });
    });
    const searchinput =screen.getByTestId('Rowsearchinput');
    fireEvent.change(searchinput, { target: { value: 'Rice' } })
    fireEvent.keyDown(searchinput, { key: 'Enter', code: 'Enter' })

    await waitFor(() => expect(screen.getByTestId('Wrappedrowlistlibrary').children[0].children).toHaveLength(2)); 
})

test('handleCategoryFilterUpdate filter by Seafood must result in 13 items', async () => {
    await act(async () => {
        renderWithState(<Homepath />, {
            initialState: {
                appstate: {
                    ...Defaultstate,
                },
            },
        });
    });

    const sidecategory = await waitFor(()=> screen.getAllByTestId('Cellcategory')[10]);
    const myEvent = createEvent.click(sidecategory, { button: 1 })
    fireEvent(sidecategory, myEvent)

    await waitFor(() => expect(screen.getByTestId('Wrappedrowlistlibrary').children[0].children).toHaveLength(13)); 
})