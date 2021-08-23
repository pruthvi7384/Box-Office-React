import React from 'react'
import ActoreCard from './ActoreCard';
import IMAGE_NOT_FOUND from '../../image/not-found.png';

function ActorGrid({data}) {
    return (
        <div>
            {
                data.map(({person})=> (
                    <ActoreCard
                        key={person.id}
                        id={person.id}
                        name={person.name}
                        country={person.country ? person.country.name : null}
                        birthday={person.birthday}
                        deathday={person.deathday}
                        gender={person.gender}
                        image={person.image ? person.image.medium : IMAGE_NOT_FOUND }
                    />
                    ))
            }
        </div>
    )
}

export default ActorGrid
