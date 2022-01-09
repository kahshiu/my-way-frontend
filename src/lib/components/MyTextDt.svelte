<script>
import Textbox from "$lib/components/MyTextbox.svelte";
import {
  parseStringDtISO,
  parseStringDtShort,
  formatDt,
  maskDt,
} from "$lib/utils/stringers.js";

export let fTitle;
export let fStyle;
export let fName;
export let fData;

export let parseData = parseStringDtISO;
export let parseEdit = parseStringDtShort;
export let formatData = formatDt;
export let maskData = maskDt
export let validateData;
export let updateField;

</script>

<Textbox
  fTitle = {fTitle}
  fStyle = {fStyle}
  fName = {fName}
  fData = {fData}
  parseData = {parseData}
  parseEdit = {parseEdit}
  formatData = {formatData} 
  maskData = {maskData}
  validateData = {validateData}
  updateField = {updateField}
/>
