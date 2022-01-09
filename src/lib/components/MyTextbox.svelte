<script>
import { getContext, createEventDispatcher } from 'svelte';
import Label from "$lib/components/MyLabel.svelte";



// SECTION: variables
export let fTitle = "field_title";
export let fName = "field_name";
export let fData = "";
export let fStyle = "labelled"; //options: basic, labelled

let vEdit = "";
let vMask = "";
let vMode = "mask";
$: v = vMode === "mask"? vMask: vEdit;
// console.log("v", fData, vEdit, vMask);

let eError = false;
let eMessage = "";
let self;
let refTimeout;

const dispatch = createEventDispatcher();



// SECTION: pure functions
export let parseData;
export let parseEdit;
export let formatData;
export let maskData;
export let updateField; 
$: updateField && updateField(fName, fData, eMessage);

// validate edit to either
export let validateData = (data, rules) => {
  return { validError: false, data, message: ""} 
}



// SECTION: pipelines
const pipeInit = () => {
  if(parseData) {
    const {parseError, parseMessage, parsed} = parseData(fData);
    eError = parseError
    eMessage = parseMessage
    if(eError) return;

    fData = parsed;
  }

  vEdit = formatData? formatData(fData): fData;
  vMask = maskData? maskData(fData): fData;
};

const pipeEdit = (value) => {
  if(parseEdit) {
    const {parseError, parseMessage, parsed} = parseEdit(value);
    eError = parseError
    eMessage = parseMessage
    fData = value;
    vEdit = value;
    vMask = value
    if(eError) return;

    fData = parsed;
  }

  vEdit = formatData? formatData(fData): fData;
  vMask = maskData? maskData(fData): fData;

  if(validateData) {
    const {validError, validMessage} = validateData(fData);
    eError = validError;
    eMessage = validMessage;
    if(eError) return;
  }
}

pipeInit();



// SECTION: event callbacks
// sequence: focus, down, beforeinput, input, up
// if just fn/ arrow keys: down, up 

const fnDebounce = (e) => {
  clearTimeout(refTimeout);

  refTimeout = setTimeout(() => {
    dispatch("paused", {
      data: fData,
      value: vEdit, 
      masked: vMask
    })
  }, 1250)
}

const callbackFocus = (e) => {
  const {target: {value}} = e;
  vMode = "value";
}

const callbackBlur = (e) => {
  const {target: {value}} = e;
  vMode = "mask";
  pipeEdit(value);
}

const callbackInput = (e) => {
  const {target: {value}} = e;
  fnDebounce(e);
}

</script>

<style>
</style>

{#if fStyle === "labelled"}
  <Label title={fTitle}>
    <input 
      type="text" 
      bind:this = {self} 
      on:focus = {callbackFocus}
      on:input = {callbackInput}
      on:blur = {callbackBlur}
      value = {v}
    />             
    {#if eError}
      <div> {eMessage} </div>
    {/if}
  </Label>
{:else}
  <input 
    type="text" 
    bind:this = {self} 
    on:focus = {callbackFocus}
    on:input = {callbackInput}
    on:blur = {callbackBlur}
    value = {v}
  />             
  {#if eError}
    <div> {eMessage} </div>
  {/if}
{/if}
