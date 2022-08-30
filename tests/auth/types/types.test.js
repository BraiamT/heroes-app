import { types } from '../../../src/auth/types/types';

describe('Pruebas en types', () => {

    test('should de regresar los types fijos siempre', () => {

        expect( types ).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout'
        });

    });

});
