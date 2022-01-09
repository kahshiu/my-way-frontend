import {writable} from "svelte/store";
import _ from "lodash";

export const createForm = (initialData) => {
  const values = {...initialData}
  const messages = {}

  const {subscribe, set, update} = writable({values, messages});
  return {
    subscribe
    , updateField: (fieldPath, value, message) => {
      update((curr) => {
        const { values, messages } = curr;

        // NOTE: values
        const nextV = {...values};
        if(value) _.set(nextV, fieldPath, value);

        // NOTE: messages
        const nextM = {...messages};  
        if(message) _.set(nextM, fieldPath, message);

        return { values: nextV, messages: nextM };
      })
    }
  }
}

export const getValues = (store, path) => {
  const targetPath = ["values"]
  if(path?.length>0) {
    targetPath.push(path) 
  }
  return _.get(store, targetPath.join("."));
}

export const getMessages = (store, path) => {
  const targetPath = ["messages"]
  if(path?.length>0) {
    targetPath.push(path) 
  }
  const v = _.get(store, targetPath.join("."));
  const m = collectMessages(v);

  return {error: m.length>0, messages: m}
}

const collectMessages = (v) => {
  const m = [];
  if(_.isObject(v)) {
    for( const k in v ) {
      if(v[k]?.length>0) m.push(v[k]);
    }
    return m;

  } else if(_.isArray(v)) {
    for( let k=0; k=v.length; v++) {
      if(v[k]?.length>0) m.push(v[k]);
    }
    return m;

  } else {
    return [v];
  }
}
