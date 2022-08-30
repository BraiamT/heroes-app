import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import { useForm } from '../../common/hooks/useForm';
import { HeroCard } from '../components';
import { getHeroesBySearch } from '../helpers';

export const SearchPage = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { q = '' } = queryString.parse( location.search );
    const heroes = getHeroesBySearch( q );

    const showSearch = ( q.length === 0 );
    const showError = ( q.length > 0 && heroes.length === 0 );

    const { onInputChange, txtSearch } = useForm({ txtSearch: q });

    const onSearch = ( event ) => {
        event.preventDefault();
        // if ( txtSearch.trim().length <= 1 ) return;

        navigate(`?q=${ document.getElementById('txtSearch').value }`);
    }

    const twoCalls = ( e ) => {
        onInputChange(e);
        onSearch(e);
    }

    return (
        <>
            <h1>Search</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Searching</h4>
                    <hr />
                    <form onSubmit={ onSearch } aria-label="input-form">
                        <input
                            type="text"
                            placeholder="Look for a hero..."
                            className="form-control"
                            name="txtSearch"
                            autoComplete="off"
                            id="txtSearch"
                            value={ txtSearch }
                            onChange={ twoCalls }
                        />

                        <button
                            type="input"
                            className="btn btn-outline-primary mt-2"
                        >Search</button>
                    </form>
                </div>

                <div className="col-7">
                    <h4>Results</h4>
                    <hr />

                    {/* {
                        ( q === '' )
                            ? <div className="alert alert-info">Search a hero</div>
                            : ( heroes.length === 0 ) && <div className="alert alert-danger">No heroes matched <b>{ q }</b></div>
                    } */}

                    <div className="alert alert-info animate__animated animate__fadeIn" style={{ display: showSearch ? '' : 'none' }}>
                        Search a hero
                    </div>

                    <div data-testid="no-match-section" className="alert alert-danger animate__animated animate__fadeIn" style={{ display: showError ? '' : 'none' }}>
                        No heroes matched <b>{ txtSearch }</b>
                    </div>

                    {
                        heroes.map( hero => (
                            <HeroCard key={ hero.id } { ...hero } />
                        ))
                    }
                </div>
            </div>
        </>
    )
}
