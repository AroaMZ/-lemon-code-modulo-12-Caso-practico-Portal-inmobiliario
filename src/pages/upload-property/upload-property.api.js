import Axios from 'axios';
import { getPropertyList } from '../property-list/property-list.api';

const generalPropertytUrl = `${process.env.BASE_API_URL}/properties`;

const provincesUrl = `${process.env.BASE_API_URL}/provinces`;

export const getProvinces = (name) =>
  Axios.get(provincesUrl, name).then(({ data }) => data);

//  export const insertProperty = (houseProperties) =>
//    Axios.post(generalPropertytUrl, houseProperties).then((response) => response.data);

export const insertProperty = (houseProperties) => {
  return getPropertyList().then((properties) => {
    const property_id = properties.length + 1;
    houseProperties.id = property_id.toString()
    return Axios.post(`${generalPropertytUrl}`, houseProperties).then(
      ({ data }) => data
      
    );
  });
};