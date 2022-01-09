<script>
  import {writable} from "svelte/store";
  import Button from "$lib/components/button.svelte";

  import Table from "$lib/components/MyTable.svelte";
  import Form from "$lib/components/MyForm.svelte";
  import Text from "$lib/components/MyController.svelte";
  import Textbox from "$lib/components/MyTextbox.svelte";
  import TextDt from "$lib/components/MyTextDt.svelte";

  import {format} from "date-fns";

  let dt = new Date();
  let dtFormatted = format(dt, 'dd/MM/yyyy');
  let logoSrc = "/function.PNG";

  // login
  let username = "";
  let password = "";

  let contentLetter = "<strong>Letter of Appointment</strong>";

  const v = {
    fieldName: "testing",
    fieldValue: "hello123",
  }

let showinput = true;
console.log("tracing from index");
let temp = {a: {a:new Date().toISOString()}, b:2}

</script>

<h1>My Way</h1>
form1
<Form name="a" initialData={temp}>
  <Text name="a|a.a" />
</Form>
<hr />


<!---
<Form name="x" initialData={{a:11, b:21}}>
  <div>
  <br/>
    <Text name="hello" />
  <br/>
    <Text name="x"/>
  <br/>
  <br/>
  </div>
</Form>
form2
<Form name="bello" initialData={{a:11, b:21}}>
  <Text name="bello.one"/>
</Form>
<hr />
--->

<Table />
<input type="button" on:click={()=>{showinput = !showinput}} value="hide box">
<Button />
{#if showinput}
<TextDt 
  fTitle="Appointment Date"
  fStyle="labelled"
  fName="tttt"
  fData={new Date()} 
  on:paused= {() => { alert("you paused")}}
/>
{/if}

<!---
<Textbox {...v}/>
<Textbox />
--->


<div>
  {dtFormatted}
  <img alt="company logo" src={logoSrc}/>
  <p> {@html contentLetter} </p>
</div>
