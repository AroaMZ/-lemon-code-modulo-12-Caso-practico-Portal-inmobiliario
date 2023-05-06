import { setPropertyValues, setEquipments, mapEquipments } from './property-detail.helpers';
import { history } from '../../core/router';
import { getPropertyDetail, getEquipmentList } from './property-detail.api';
import { mapPropertyFromApiToViewModel } from "./property-detail.mappers";

const params = history.getParams();
const isProperty = Boolean(params.id);
const propertyId = params.id;


if (isProperty) {

  Promise.all([
    getPropertyDetail(propertyId),
    getEquipmentList()
  ]).then(
    ([
      apiPropertyList,
      apiEquipmentList,
    ]) => {
      apiPropertyList.map((property) => { //No entiendo el property
        if (property.id == propertyId) {
          // map equipment ids to names
          property.equipments = mapEquipments(property.equipmentIds, apiEquipmentList)
          let mappedProperty = mapPropertyFromApiToViewModel(property)
          setPropertyValues(mappedProperty);
          console.log(property.equipmentIds)
        }


      }
      )
    }
  )
}

  // getEquipmentList(propertyId).then((response) => {
  //   response.map((property) => {
  //     console.log(property.name)
  //   })
  // });







  //console.log(property);

  let propertyDetail = {
    image: '',
    title: '',
    city: '',
    rooms: '',
    squareMeter: '',
    bathrooms: '',
    notes: '',
    mainFeatures: '',
    equipmentIds: '',
    locationUrl: '',
  };
