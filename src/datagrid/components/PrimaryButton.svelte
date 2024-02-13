<script>
    export let classes = "";
</script>


<button class="bg-blue-600 text-slate p-2 hover:bg-blue-800 {classes}" on:click>
    <slot />
</button>