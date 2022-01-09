<script>
let count = 1
const increment = () => {
  count++;
} 
console.log("tracing from button")
</script>
<label>
{count}
</label>
<input type="button" on:click={increment} value="Click count"/>
