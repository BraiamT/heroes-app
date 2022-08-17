import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../common/hooks/useForm';
import { AuthContext } from '../context/AuthContext';

export const LoginPage = () => {

    const { login } = useContext( AuthContext );
    const navigate = useNavigate();

    const { onInputChange, txtUsername } = useForm({ txtUsername: '' });

    const onLogin = () => {
        if ( txtUsername.trim().length <= 1 ) return;

        const lastPath = localStorage.getItem( 'lastPath' ) || '/';

        login( txtUsername );

        navigate( lastPath, {
            replace: true
        });
    }

    return (
        <div className="container mt-5">
            <h1>Login</h1>
            <hr />

            <form onSubmit={ onLogin }>
                <div className="row justify-content-center">
                    <div className="col-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="username"
                            name="txtUsername"
                            value={ txtUsername }
                            onChange={ onInputChange }
                        />
                    </div>
                </div>

                <div className="text-center">
                    <button
                        className="btn btn-primary mt-2"
                        onClick={ onLogin }
                        type="submit"
                        disabled={ txtUsername.length <= 1 }
                    >Login</button>
                </div>
            </form>
        </div>
    )
}
