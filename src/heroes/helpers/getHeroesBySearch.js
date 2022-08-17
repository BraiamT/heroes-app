import { heroes } from '../data/heroes';

export const getHeroesBySearch = ( search = '' ) => {
    search = search.toLocaleLowerCase().trim();

    if ( search.length === 0 ) return [];

    return heroes.filter(
        hero =>
            hero.superhero.toLocaleLowerCase().includes( search ) ||
            hero.alter_ego.toLocaleLowerCase().includes( search ) ||
            hero.characters.toLocaleLowerCase().includes( search )
    );

}
