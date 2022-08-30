import { authReducer, types } from '../../../src/auth';

describe('Pruebas en authReducer', () => {

    const user = {
        id: 19817239,
        username: 'BraiamT'
    };

    test('debe de retornar el estado por defecto', () => {
        const state = authReducer({ logged: false }, {});

        expect( state ).toEqual({ logged: false });
    });

    test('debe de (login) llamar el login autenticar y establecer el user', () => {
        const action = {
            type: types.login,
            payload: user
        };

        const state = authReducer({ logged: false }, action);

        expect( state.logged ).toBeTruthy();
        expect( state.user ).toEqual( action.payload );
    });

    test('debe de (logout) borrar el name del usuario y logged en false', () => {
        const action = {
            type: types.logout
        };

        const state = authReducer({ logged: true, user }, action);

        expect( state ).toEqual({ logged: false });
    });

});
