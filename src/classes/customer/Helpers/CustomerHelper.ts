export const treatData = (data: any) => {
  return data.map((item: any) => ({
    fieldName: item.attributeDescription,
    required: item.mandatory,
    type: item.bookingAttributesDomain.type,
    options: item.validation ? [...item.validation] : null,
  }));
};
