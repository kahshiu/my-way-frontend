import { format } from 'date-fns';

// SECTION: parse string to data
export const parseStringDtISO = (data) => {
  const parsed = new Date(data);
  const isError = isNaN(parsed.getTime());
  return {
    parseError: isError 
    , parseMessage: isError? "Invalid date": ""
    , parsed: isError? null: parsed.toISOString() 
  } 
}

export const parseStringDtShort = (edit) => {
  const dd = edit.substring(0,2);
  const MM = edit.substring(2,4);
  let yyyy = edit.substring(4,8);

  if( dd.length === 0 
  || MM.length === 0 
  ) return { 
    parseError: true 
    , parseMessage: "Invalid date" 
    , parsed: null 
  };

  //NOTE: helpful patch
  if(yyyy.length === 0) yyyy = new Date().getFullYear();
  if(yyyy.length === 2) yyyy = "20"+ yyyy;

  if( yyyy.length === 1 || yyyy.length === 3 ) return { 
    parseError: true 
    , parseMessage: "Invalid date" 
    , parsed: null 
  };

  const parsed = new Date(`${yyyy}=${MM}-${dd}`);
  const isError = isNaN(parsed.getTime());
  return { 
    parseError: isError 
    , parseMessage: isError? "Invalid date": ""
    , parsed: isError? null: parsed.toISOString() 
  };
}



// SECTION: format data to string 
export const formatDt = (data) => {
  return format(new Date(data), "ddMMyyyy");
}



// SECTION: masking data
export let maskDt = (data) => {
  return format(new Date(data), "dd-MM-yyyy");
}
