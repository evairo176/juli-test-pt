import { globalAction } from "../slices/global";

const setLoading = (value) => {
  return globalAction({ type: "SET_LOADING", value });
};

const setData = (value) => {
  return globalAction({ type: "SET_DATA", value });
};

export { setLoading, setData };
