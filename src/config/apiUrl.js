// export const apiUrl = "https://zc6jz9dt-5003.inc1.devtunnels.ms";
export const apiUrl = "https://property-assesment.onrender.com";
// export const apiUrl = "https://sds968d2-5003.inc1.devtunnels.ms";
export const s3Url = "https://tron-bucket-dev.s3.amazonaws.com";
// live changes 3
export const imageUrl = (url) => `${s3Url}/${url}`;
export const mediaUrl = (url) => `${s3Url}/${url}`;

export const BaseURL = (link) => {
  return `${apiUrl}/api/v1/${link}`;
};
//live 1
export const apiHeader = (token, isFormData) => {
  if (token && !isFormData) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  }
  if (token && isFormData) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
  }
  if (!token && !isFormData) {
    return {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  if (!token && isFormData) {
    return {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
  }
};

export const CreateFormData = (data) => {
  const formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }
  return formData;
};

export const formRegEx = /([a-z])([A-Z])/g;
export const formRegExReplacer = "$1 $2";

export var recordsLimit = 10;
export var recordsLimit50 = 50;

export const ReturnFormatedNumber = (number) => {
  let newNumber = number?.slice(2);
  newNumber = newNumber?.replace(/(\d{3})(\d{3})(\d{4})/, "($1) - $2 $3");
  return newNumber;
};

export const falsyArray = [
  null,
  undefined,
  "",
  0,
  false,
  NaN,
  "null",
  "undefined",
  "false",
  "0",
  "NaN",
];

export const numberRegEx = /[^0-9]+/g;
export const roleRegex = /^[A-Za-z\s]*$/;
