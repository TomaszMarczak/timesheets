import moment from "moment";

export const formatDate = (date: Date) => {
  return moment(date).format("DD/MM/YYYY");
};

export const valueBetween0And24 = (value: string) => {
  //Enter only numbers, cannot be less than 0 and more than 24.
  if (parseInt(value) < 0 || parseInt(value) > 24) return false;
  if (value.startsWith("0") && /\D/.test(value)) return false;
  return true;
};
