

export const mapUploadPropertyFromViewModelToApi = (houseProperties) => {
  return {
    title: houseProperties.title,
    notes: houseProperties.notes,
    email: houseProperties.email,
    phone: houseProperties.phone,
    price: parseFloat(houseProperties.price),
    saleTypeIds: houseProperties.saleTypes,
    address: houseProperties.address,
    city: houseProperties.address,
    provinceId: houseProperties.province,
    squareMeter: parseFloat(houseProperties.squareMeter),
    rooms: parseInt(houseProperties.rooms),
    bathrooms: parseInt(houseProperties.bathrooms),
    locationUrl: houseProperties.locationUrl,
    mainFeatures: houseProperties.mainFeatures,
    equipmentIds: houseProperties.equipments,
    images: houseProperties.images,
  };
};