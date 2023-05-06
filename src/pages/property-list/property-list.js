import { 
    getPropertyList,
    getSaleTypeList, 
    getProvinceList, } from "./property-list.api";
import { mapPropertyListFromApiToViewModel, mapFilterToQueryParams } from "./property-list.mappers";
import {addPropertyRows, setOptions, clearPropertyRows} from './property-list.helpers'; //función para pintar en el html
import {roomOptions, bathroomOptions, minPriceOptions, maxPriceOptions} from './property-list.constants';
import {onSubmitForm, onUpdateField} from '../../common/helpers';


Promise.all ([
    getPropertyList(),
    getSaleTypeList(),
    getProvinceList(),
])    //"usando destructuring":
        .then(([propertyList, saleTypeList, provinceList])=>{
            loadPropertyList(propertyList)//como sabe en que div mostrarlo?
            //No entiendo el setOptions (está en helpers)
            setOptions(saleTypeList, 'select-sale-type', '¿Que venta?');
            setOptions(provinceList, 'select-province', '¿Dónde?');
            setOptions(roomOptions, 'select-room', '¿Habitaciones?');
            setOptions(bathroomOptions, 'select-bathroom', '¿Baños?');
            setOptions(minPriceOptions, 'select-min-price', 'Min (EUR)');
            setOptions(maxPriceOptions, 'select-max-price', 'Max (EUR)');
        
}) //ejecuta cuando las tres funciones esten resueltas
    

//No entiendo el resultList. Es la versión larga del destructuring
// .then(resultList => {
//     const propertyList = resultList[0];
//     const getSaleTypeList = resultList[1];
//     const getProvinceList = resultList[2];

//Para que cargue en pantalla
const loadPropertyList = propertyList => { 
    const viewModelPropertyList = mapPropertyListFromApiToViewModel(propertyList);
    addPropertyRows(viewModelPropertyList);
};

let filter = {
    saleTypeId: '',
    provinceId: '',
    minRooms: '',
    minBathRooms: '',
    minPrice: '',
    maxPrice: '',
};

onUpdateField('select-sale-type', event => {
    const value = event.target.value;
    filter = {
        ...filter,
        saleTypeId: value,
    };
});
onUpdateField('select-province', event => {
    const value = event.target.value;
    filter = {
        ...filter,
        provinceId: value,
    };
});
onUpdateField('select-room', event => {
    const value = event.target.value;
    filter = {
        ...filter,
        minRooms: value,
    };
});
onUpdateField('select-bathroom', event => {
    const value = event.target.value;
    filter = {
        ...filter,
        minBathRooms: value,
    };
});
onUpdateField('select-min-price', event => {
    const value = event.target.value;
    filter = {
        ...filter,
        minPrice: value,
    };
});
onUpdateField('select-max-price', event => {
    const value = event.target.value;
    filter = {
        ...filter,
        maxPrice: value,
    };
});
onSubmitForm('search-button', () => {
    const queryParams = mapFilterToQueryParams(filter);
    clearPropertyRows();
    getPropertyList(queryParams).then(propertyList => { // No entiendo
        loadPropertyList(propertyList);
    });
    console.log({filter});
});