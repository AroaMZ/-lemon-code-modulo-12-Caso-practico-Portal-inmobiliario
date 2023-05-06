const getRoomWord = (rooms) => {
    return rooms > 1 ? "habitaciones" : "habitación"
};

const getBathroomWord = (bathrooms) => {
    return bathrooms > 1 ? "baños" : "baño"
};

export const mapPropertyFromApiToViewModel = (property) => {
    return{
        id: property.id,
        title: property.title,
        rooms:`${property.rooms} ${(getRoomWord(property.rooms))}`, //concatenamos la propiedad de rooms con la función de numero de habitaciones/habitación
        squareMeter: `${property.squareMeter}m2`,
        notes: property.notes,//substring (metodo de javascript). Cortamos las notas a las 240 caracteres y concatemos con ...
        price: `${property.price.toLocaleString()} €`,//con el método "localeString" escribe los numéros dependiendo de en la cultura que se vea la página. En nuestro caso, al ser España, al número le pondra el punto de los millares.
        mainImage: Array.isArray(property.images) ? property.images[0] : '',
        city: property.city,
        bathrooms:`${property.bathrooms} ${(getBathroomWord(property.bathrooms))}`, //concatenamos la propiedad de rooms con la función de numero de habitaciones/habitación
        locationUrl: property.locationUrl,
        mainFeatures: property.mainFeatures,
        images: property.images,
        equipments: property.equipments,

    };
    };