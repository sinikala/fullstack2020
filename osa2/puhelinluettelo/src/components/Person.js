import React from 'react';


const Person = ({ person, handleDeleteButton }) => {
    return (
        <div>{person.name}  {person.number}
            <button onClick={() => handleDeleteButton(person.id)}>delete</button>
        </div>
    )
}

export default Person