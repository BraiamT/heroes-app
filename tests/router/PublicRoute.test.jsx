import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { AuthContext } from '../../src/auth';
import { PublicRoute } from '../../src/router/PublicRoute';

describe('Pruebas en <PublicRoute />', () => {

    test('debe de mostrar el children si no se está autenticado', () => {
        const state = {
            logged: false
        }

        render(
            <AuthContext.Provider value={ state }>
                <PublicRoute>
                    <h1>Ruta Pública</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Ruta Pública') ).toBeTruthy();
    });

    test('debe de Navegar a "/" si se está autenticado', () => {
        const state = {
            logged: true,
            user: {
                id: 19832419,
                username: 'BraiamT'
            }
        }

        render(
            <AuthContext.Provider value={ state }>
                {/* initialEntries sirve para definir en que ruta se está actualmente */}
                <MemoryRouter initialEntries={ ['/login'] }>

                    <Routes>
                        <Route path='login' element={
                            <PublicRoute>
                                <h1>Ruta Pública</h1>
                            </PublicRoute>
                        } />
                        <Route path='/' element={ <h1>Página Marvel</h1> } />
                    </Routes>

                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Página Marvel') ).toBeTruthy();
    });

});
