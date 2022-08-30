import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AuthContext } from '../../src/auth';
import { PrivateRoute } from '../../src/router/PrivateRoute';

describe('Pruebas en <PrivateRoute />', () => {

    test('debe de mostrar el children SI se está autenticado', () => {

        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                id: 19832419,
                username: 'BraiamT'
            }
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={ ['/search?q=batman'] }>

                    <PrivateRoute>
                        <h1>Ruta Privada</h1>
                    </PrivateRoute>

                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Ruta Privada') ).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/search?q=batman');
    });

});
