<script>
import { setContext } from "svelte";
import { writable } from "svelte/store";
import { createForm } from "$lib/utils/form.js";

export let name = "formStore";
export let initialData = {}; 

const formStore = createForm(initialData)
setContext(name, formStore);

const callbackClick = (e) => {
  console.log("tracing formStore: ", $formStore);
}

</script>

<form>
  <div>
    <slot formStore={formStore}/>
  </div>
  <input 
    type="button" 
    value="Trace formStore"
    on:click={callbackClick} 
  />
</form>
