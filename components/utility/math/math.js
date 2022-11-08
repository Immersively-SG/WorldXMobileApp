export const RandomRangeInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const RandomRangeFloat = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const RandomString = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
