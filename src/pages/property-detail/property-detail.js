import {
  onUpdateField,
  onSubmitForm,
} from '../../common/helpers/element.helpers';
import {
  setPropertyValues,
  setEquipments,
  mapEquipments,
} from './property-detail.helpers';
import { history } from '../../core/router';
import { getPropertyDetail, getEquipmentList, insertForm } from './property-detail.api';
import { mapPropertyFromApiToViewModel } from './property-detail.mappers';
import { formValidation } from './property-detail.validations';
import { onSetError } from '../../../../../Library/CloudStorage/GoogleDrive-aroazmendez@gmail.com/My Drive/WEB/LemonCode/Modulo 12/00-boilerplate/src/common/helpers/element.helpers';
import Axios from 'axios';

const params = history.getParams();
const isProperty = Boolean(params.id);
const propertyId = params.id;

let form = {
  email: '',
  message: '',
};

onUpdateField('email', (event) => {
  const value = event.target.value;
  form = { ...form, email: value };
  formValidation.validateField('email', form.email).then((result) => {
    onSetError('email', result);
  });
});
onUpdateField('message', (event) => {
  const value = event.target.value;
  form = { ...form, message: value };
  formValidation.validateField('message', form.message).then((result) => {
    onSetError('message', result);
  });
});

//porque no funciona el if...quiero meter el post ahí.
const printErrors = (fieldErrors) => {
      Object.keys(fieldErrors).forEach((key) => {
        if (fieldErrors[key].succeeded == false) {
          alert(fieldErrors[key].message);
        }
      });
    };

onSubmitForm('contact-button', () => {
  formValidation.validateForm(form).then((result)=> {
    if(result.succeeded == true){
       insertForm(form)
      
    } else {
      printErrors(result.fieldErrors)
    }

  });
})

if (isProperty) {
  Promise.all([getPropertyDetail(propertyId), getEquipmentList()]).then(
    ([apiPropertyList, apiEquipmentList]) => {
      apiPropertyList.map((property) => {
        //No entiendo el property
        if (property.id == propertyId) {
          // map equipment ids to names
          property.equipments = mapEquipments(
            property.equipmentIds,
            apiEquipmentList
          );
          let mappedProperty = mapPropertyFromApiToViewModel(property);
          setPropertyValues(mappedProperty);
        }
      });
    }
  );
}
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
