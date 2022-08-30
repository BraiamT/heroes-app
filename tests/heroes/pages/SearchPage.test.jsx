import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes/pages/SearchPage';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));


describe('Pruebas en <SearchPage />', () => {

    beforeEach( () => jest.clearAllMocks() );

    test('debe de mostrar el componente por defecto', () => {
        const { container } = render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );

        expect( container ).toMatchSnapshot();
    });

    test('debe de mostrar a Batman y el input con el valor del queryString', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        expect( input.value ).toBe('batman');

        const img = screen.getByRole('img');
        expect( img.src ).toContain('batman');

        const noMatchs = screen.getByTestId('no-match-section');
        expect( noMatchs.style.display ).toBe('none');
    });

    test('debe de mostrar un error si no se encuentra el hero (avisponxd)', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=avisponxd']}>
                <SearchPage />
            </MemoryRouter>
        );

        const noMatchs = screen.getByTestId('no-match-section');
        expect( noMatchs.style.display ).not.toBe('none');
        // Or
        expect( noMatchs.innerHTML ).toContain('No heroes matched');
    });

    test('debe de llamar el navigate a la pantalla nueva', () => {
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        const form = screen.getByRole('form');

        fireEvent.input( input, { target: { value: 'flash' } });
        fireEvent.submit( form );

        expect( mockedUseNavigate ).toHaveBeenCalledWith(`?q=flash`);
    });

});
