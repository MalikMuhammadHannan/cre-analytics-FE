import axios from "axios";
import { toast } from "react-toastify";
import { signOutRequest } from "../store/auth/authSlice";
import { BaseURL, CreateFormData, apiHeader } from "../config/apiUrl.js";

/**
 * @description Sends a Get request to api
 * @param {String} route
 * @example "/api/route"
 * @returns Promise<any>
 */

let Get = async (route, accessToken, showAlert = true, dispatch) => {
  const options = accessToken
    ? {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
          "ngrok-skip-browser-warning": "69420",
        },
      }
    : {
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      };
  try {
    const response = await axios.get(route, options);
    return response;
  } catch (error) {
    let errorMessage = "";
    Array.isArray(error?.response?.data?.message?.error)
      ? error?.response?.data?.message?.error?.map(
          (item, i) => (errorMessage = `${errorMessage} • ${item} \n`)
        )
      : (errorMessage = error?.response?.data?.message?.error);
    if (error.response.status === 401) {
      dispatch && dispatch(signOutRequest());
    }
    if (showAlert == true) {
      if (error.message === "Network Error") {
        toast.error(`${error.message} : Please Check Your Network Connection`, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  }
};

/**
 * @description Sends a post request to api
 * @param {String} route
 * @example "/api/route"
 * @param {Object} data
 * @example {foo:bar}
 * @returns Promise<any>
 */

let Post = async (route, data, headers, showAlert = true, dispatch) => {
  try {
    return await axios.post(route, data, headers);
  } catch (error) {
    let errorMessage = "";
    Array.isArray(error?.response?.data?.message?.error)
      ? error?.response?.data?.message?.error?.map(
          (item, i) => (errorMessage = `${errorMessage} • ${item} \n`)
        )
      : (errorMessage = error?.response?.data?.message?.error);
    if (error.response.status === 401) {
      dispatch && dispatch(signOutRequest());
    }
    if (error.message === "Network Error") {
      toast.error(`${error.message} : Please Check Your Network Connection`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }
};

/**
 * @description Sends a post request to api
 * @param {String} route
 * @example "/api/route"
 * @param {Object} data
 * @example {foo:bar}
 *   @returns Promise<any>
 */

let Patch = async (route, data, headers, showAlert = true, dispatch) => {
  try {
    return await axios.patch(route, data, headers);
  } catch (error) {
    let errorMessage = "";
    Array.isArray(error?.response?.data?.message?.error)
      ? error?.response?.data?.message?.error?.map(
          (item, i) => (errorMessage = `${errorMessage} • ${item} \n`)
        )
      : (errorMessage = error?.response?.data?.message?.error);
    if (error.response.status === 401) {
      dispatch && dispatch(signOutRequest());
    }
    if (error.message === "Network Error") {
      toast.error(`${error.message} : Please Check Your Network Connection`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }
};

/**
 * @description Sends a post request to api
 * @param {String} route
 * @example "/api/route"
 * @param {Object} data
 * @example {foo:bar}
 *   @returns Promise<any>
 */

let Put = async (route, data, headers, showAlert = true, dispatch) => {
  try {
    return await axios.put(route, data, headers);
  } catch (error) {
    let errorMessage = "";
    Array.isArray(error?.response?.data?.message?.error)
      ? error?.response?.data?.message?.error?.map(
          (item, i) => (errorMessage = `${errorMessage} • ${item} \n`)
        )
      : (errorMessage = error?.response?.data?.message?.error);
    if (error.response.status === 401) {
      dispatch && dispatch(signOutRequest());
    }
    if (error.message === "Network Error") {
      toast.error(`${error.message} : Please Check Your Network Connection`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }
};

/**
 * @description Sends a Delete request to api
 * @param {String} route
 * @example "/api/route"
 * @param {Object} data
 * @example {foo:bar}
 *   @returns Promise<any>
 */

let Delete = async (route, data, headers, showAlert = true, dispatch) => {
  try {
    return data == null
      ? await axios.delete(route, headers)
      : await axios.delete(route, data, headers);
  } catch (error) {
    let errorMessage = "";
    Array.isArray(error?.response?.data?.message?.error)
      ? error?.response?.data?.message?.error?.map(
          (item, i) => (errorMessage = `${errorMessage} • ${item} \n`)
        )
      : (errorMessage = error?.response?.data?.message?.error);
    if (error.response.status === 401) {
      dispatch && dispatch(signOutRequest());
    }
    if (error.message === "Network Error") {
      toast.error(`${error.message} : Please Check Your Network Connection`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }
};
export { Post, Put, Get, Patch, Delete };

export let UploadFiles = async (data, key = "images") => {
  const url = BaseURL("uploads");

  const formData = CreateFormData({});
  for (let i in data) {
    if (Array.isArray(data[i])) {
      for (let j in data[i]) {
        formData.append(key, data[i][j]);
      }
    } else {
      formData.append(key, data[i]);
    }
  }

  const response = await Post(url, formData);
  if (response !== undefined) {
    return response;
  }
};

export let UploadVideosToAwsBySignedUrl = async (
  urlsArray,
  videos,
  setUploadProgress
) => {
  try {    
    const promises = urlsArray.map((url, index) => {
      return axios.put(url, videos[index], {
        headers: {
          "Content-Type": `video/${videos[index]?.name?.split(".")[1]}`,
          "ngrok-skip-browser-warning": "69420",
        },
        onUploadProgress: (data) => {
          const progress = Math.round((100 * data.loaded) / data.total);
          setUploadProgress((prev) => (prev >= progress ? prev : progress));
        },
      });
    });
    const results = await Promise.allSettled(promises);
    return results;
  } catch (error) {
    return null;
  }
};
export const uploadFile = async (videos, token) => {
  const params = {
    mimeTypes: videos?.map((ele) => ele?.type),
  };
  const response = await Post(
    BaseURL("get-signed-url"),
    params,
    apiHeader(token)
  );
  if (response !== undefined) {
    const { urls, keys } = response?.data;
    await UploadVideosToAwsBySignedUrl(
      urls,
      videos,
      () => {}
    );
    return keys;
  } else {
    return null;
  }
};
