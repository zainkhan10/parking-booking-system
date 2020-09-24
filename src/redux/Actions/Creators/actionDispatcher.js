import _ from "lodash";
export const actionDispatch = (type, payload) => {
  if (!_.isEmpty(payload)) return { type, payload };
  return { type };
};
