import {
  onUpdateField,
  onSubmitForm,
  onSetFormErrors,
} from '../../common/helpers/element.helpers';
import {
  setCheckboxList,
  setOptionList,
  formatCheckboxId,
  formatDeleteFeatureButtonId,
  onAddFeature,
  onRemoveFeature,
  onAddImage,
} from './upload-property.helpers';
import { formValidation } from './upload-property.validations';
import { onSetError } from '../../common/helpers/element.helpers';
import { insertProperty } from './upload-property.api';
import {
  getProvinceList,
  getSaleTypeList,
} from '../property-list/property-list.api';
import { getEquipmentList } from '../property-detail/property-detail.api';
//import {addPropertyRows} from '../property-list/property-list.helpers';
import { mapUploadPropertyFromViewModelToApi } from './upload-property.mappers';

import { insertNewProperty } from './upload-property.api';

let houseProperties = {
  title: '',
  notes: '',
  email: '',
  phone: '',
  price: '',
  address: '',
  city: '',
  province: '',
  squareMeter: '',
  rooms: '',
  bathrooms: '',
  locationUrl: '',
  mainFeatures: [],
  equipments: [],
  images: [],
  saleTypes: [],
};

Promise.all([getProvinceList(), getSaleTypeList(), getEquipmentList()]).then(
  ([provinceList, saleTypesList, EquipmentList]) => {
    setOptionList(provinceList, 'province');
    setCheckboxList(saleTypesList, 'saleTypes');
    setCheckboxList(EquipmentList, 'equipments');
  }
);

onSubmitForm('insert-feature-button', () => {
  const newFeatureElement = document.getElementById('newFeature').value;
  onAddFeature(newFeatureElement);
  onSubmitForm(`delete-${newFeatureElement}-button`, () => {
    const removeFeature = onRemoveFeature(newFeatureElement);
  });
});

onUpdateField('add-image', () => {
  const imageSelector = URL.createObjectURL(
    document.getElementById('add-image').files[0]
  );
  let file = document.getElementById('add-image').files[0];
  let reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onloadend = function() {
    let image = reader.result
    onAddImage(image);
  }

});
onUpdateField('title', (event) => {
  const value = event.target.value;
  houseProperties = { ...houseProperties, title: value };
  formValidation
    .validateField('title', houseProperties.title)
    .then((result) => {
      onSetError('title', result);
    });
});
onUpdateField('notes', (event) => {
  const value = event.target.value;
  houseProperties = {
    ...houseProperties,
    notes: value,
  };
  formValidation
    .validateField('notes', houseProperties.notes)
    .then((result) => {
      onSetError('notes', result);
    });
});
onUpdateField('email', (event) => {
  const value = event.target.value;
  houseProperties = {
    ...houseProperties,
    email: value,
  };
  formValidation
    .validateField('email', houseProperties.email)
    .then((result) => {
      onSetError('email', result);
    });
});
onUpdateField('phone', (event) => {
  const value = event.target.value;
  houseProperties = {
    ...houseProperties,
    phone: value,
  };
  formValidation
    .validateField('phone', houseProperties.phone)
    .then((result) => {
      onSetError('phone', result);
    });
});
onUpdateField('price', (event) => {
  const value = event.target.value;
  houseProperties = {
    ...houseProperties,
    price: value,
  };
  formValidation
    .validateField('price', houseProperties.price)
    .then((result) => {
      onSetError('price', result);
    });
});
onUpdateField('address', (event) => {
  const value = event.target.value;
  houseProperties = {
    ...houseProperties,
    address: value,
  };
  formValidation
    .validateField('address', houseProperties.address)
    .then((result) => {
      onSetError('address', result);
    });
});
onUpdateField('city', (event) => {
  const value = event.target.value;
  houseProperties = {
    ...houseProperties,
    city: value,
  };
  formValidation.validateField('city', houseProperties.city).then((result) => {
    onSetError('city', result);
  });
});
onUpdateField('province', (event) => {
  const value = event.target.value;
  houseProperties = {
    ...houseProperties,
    province: value,
  };
  formValidation
    .validateField('province', houseProperties.province)
    .then((result) => {
      onSetError('province', result);
    });
});
onUpdateField('squareMeter', (event) => {
  const value = event.target.value;
  houseProperties = {
    ...houseProperties,
    squareMeter: value,
  };
  formValidation
    .validateField('squareMeter', houseProperties.squareMeter)
    .then((result) => {
      onSetError('squareMeter', result);
    });
});
onUpdateField('rooms', (event) => {
  const value = event.target.value;
  houseProperties = {
    ...houseProperties,
    rooms: value,
  };
  formValidation
    .validateField('rooms', houseProperties.rooms)
    .then((result) => {
      onSetError('rooms', result);
    });
});

onUpdateField('bathrooms', (event) => {
  const value = event.target.value;
  houseProperties = {
    ...houseProperties,
    bathrooms: value,
  };
  formValidation
    .validateField('bathrooms', houseProperties.bathrooms)
    .then((result) => {
      onSetError('bathrooms', result);
    });
});
onUpdateField('locationUrl', (event) => {
  const value = event.target.value;
  houseProperties = {
    ...houseProperties,
    locationUrl: value,
  };
  formValidation
    .validateField('locationUrl', houseProperties.locationUrl)
    .then((result) => {
      onSetError('locationUrl', result);
    });
});

onUpdateField('saleTypes', (event) => {
  const value = event.target.value;
  houseProperties = {
    ...houseProperties,
    saleTypes: [value],
  };
  formValidation
    .validateField('saleTypes', houseProperties.saleTypes)
    .then((result) => {
      onSetError('saleTypes', result);
    });
});
onUpdateField('equipments', (event) => {
  const value = event.target.value;
  houseProperties = {
    ...houseProperties,
    equipments: [value],
  };
  formValidation
    .validateField('equipments', houseProperties.equipments)
    .then((result) => {
      onSetError('equipments', result);
    });
});
onUpdateField('mainFeatures', (event) => {
  const value = event.target.value;
  houseProperties = {
    ...houseProperties,
    mainFeatures: value,
  };
  formValidation
    .validateField('mainFeatures', houseProperties.mainFeatures)
    .then((result) => {
      onSetError('mainFeatures', result);
    });
});

const onSave = (houseProperties) => {
  const apiHouse = mapUploadPropertyFromViewModelToApi(houseProperties);
  return insertProperty(apiHouse)
};

const setMainFeatureValues = () => {
  let features = document.getElementById('mainFeatures').childNodes;
  let featuresArray = [];
  features.forEach((element) => {
    featuresArray.push(element.textContent);
  });

  houseProperties = {        
    ...houseProperties,
    mainFeatures: featuresArray,
  };
};

const setImages = () => {
  let images = Array.from(document.getElementsByClassName('add_img'));
  let imagesArray = [];
  images.forEach((element) => {
    imagesArray.push(element.firstChild.src);
  });

  houseProperties = {        
    ...houseProperties,
    images: imagesArray,
  };
};

onSubmitForm('save-button', () => {
  setMainFeatureValues();
  setImages();
  formValidation.validateForm(houseProperties).then((result) => {
    onSetFormErrors(result);
    if (result.succeeded == true) {
      onSave(houseProperties).then(() => {
        history.back();
      });
    }
  });
});

// onSubmitForm('save-button', () => {
//   formValidation.validateForm(houseProperties).then((result) => {
//     onSetFormErrors(result);
//     if (result.succeeded) {
//       const uploadParams = mapUploadPropertyFromViewModelToApi(
//        houseProperties
//       );
//       insertNewProperty(uploadParams)
//         .then(() => history.back())
//         .catch((response) => console.log(response.data));
//     }
//   });
// });
