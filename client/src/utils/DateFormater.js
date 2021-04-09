import moment from "moment";

export const humanReadableDate = (date) => {
  return moment(date).format("LL");
};
