<script>
// controller
import {getContext} from "svelte";
import TextDt from "$lib/components/MyTextDt.svelte";
import {getValues, getMessages} from "$lib/utils/form.js";

// SECTION: standard props
export let name = "formStore|_";

const [form, fieldPath] = name.split("|");
const formStore = getContext(form);
const {updateField} = formStore;

let fData = getValues($formStore, fieldPath); 
// $: value = JSON.stringify(getValues($formStore, fieldPath));
// $: message = JSON.stringify(getMessages($formStore, fieldPath));
// {value} <hr />
// {message} <hr />

</script>

<label>
  <TextDt 
    fTitle="Appointment Date"
    fName={fieldPath}
    fData={fData} 
    fStyle="labelled"
    updateField={updateField}
    on:paused= {() => { alert("you paused")}}
  />
</label>
