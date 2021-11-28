import React from 'react'

const MaterialDescription = ({products}) => {
    return (
        <div>
            {products.map(p => <p>{p.description} - {p.materialID} </p>)}
        </div>
    )
}

export default MaterialDescription
