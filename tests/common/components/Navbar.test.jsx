import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AuthContext } from '../../../src/auth';
import { Navbar } from '../../../src/common';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));

describe('Pruebas en <Navbar />', () => {

    const username = 'BraiamT';
    const contextValue = {
        logged: true,
        user: {
            id: 98181092,
            username
        },
        logout: jest.fn()
    }

    beforeEach( () => jest.clearAllMocks() );

    test('debe de mostrar el nombre del usuario loggeado', () => {
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contextValue }>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect( screen.getByText(username) ).toBeTruthy();
    });

    test('debe de llamar el logout y navigate cuando se hace click en Logout', () => {
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contextValue }>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const logoutButton = screen.getByRole('button');
        fireEvent.click( logoutButton );

        expect( contextValue.logout ).toHaveBeenCalled();
        expect( mockedUseNavigate ).toHaveBeenCalledWith('/login', {'replace': true});
    });

});
