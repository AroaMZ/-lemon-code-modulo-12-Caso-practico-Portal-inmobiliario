
export const mapPropertyListFromApiToViewModel = (propertyList) => {
    return propertyList.map((property) => mapPropertyFromApiToViewModel(property));
} // No entiendo. Video1 min 1h 16min aprox


//el nombre del property lo hemos puesto nosotros verdad? como lo relaciona con el id...del archivo data.json?(server/src/data.json)
const mapPropertyFromApiToViewModel = (property) => {
return{
    id: property.id,
    title: property.title,
    rooms:`${property.rooms} ${(getRoomWord(property.rooms))}`, //concatenamos la propiedad de rooms con la función de numero de habitaciones/habitación
    squareMeter: `${property.squareMeter}m2`,
    notes: `${property.notes.substring(0, 240)}...`,//substring (metodo de javascript). Cortamos las notas a las 240 caracteres y concatemos con ...
    price: `${property.price.toLocaleString()} €`,//con el método "localeString" escribe los numéros dependiendo de en la cultura que se vea la página. En nuestro caso, al ser España, al número le pondra el punto de los millares.
    image: Array.isArray(property.images) ? property.images[0] : '',
};
};

//dame la palabra habitación segun el numero de habitaciones que venga del servidor, es decir, si las habitaciones son > 1 lo que me da ha devolver es la palabra habitacioens y si no solo la palabra habitación
const getRoomWord = (rooms) => {
    return rooms > 1 ? "habitaciones" : "habitación"
};

export const mapFilterToQueryParams = filter => {
    let queryParams = '';
    if(filter.saleTypeId) {
        queryParams = `${queryParams}saleTypesIds_like=${filter.saleTypeId}&`; //porque no es igual que minRooms?
    }

    if(filter.provinceId) {
        queryParams = `${queryParams}provinceId=${filter.provinceId}&`; 
    }

    if(filter.minRooms){
        queryParams = `${queryParams}rooms_gte=${filter.minRooms}&`; //"gte" maneras de filter para minimos un archivo json.

    }
    if(filter.minBathRooms){
        queryParams = `${queryParams}bathrooms_gte=${filter.minBathRooms}&`; //"gte" maneras de filter para minimos un archivo json.

    }
    if(filter.minPrice){
        queryParams = `${queryParams}price_gte=${filter.minPrice}&`; //"gte" maneras de filter para minimos un archivo json.

    }
    if(filter.maxPrice){
        queryParams = `${queryParams}price_lte=${filter.maxPrice}&`; //"lte" maneras de filter para maximos un archivo json.

    }

    return queryParams.slice(0, -1); // para quitar el ultimo & para evitar errores
    
}

