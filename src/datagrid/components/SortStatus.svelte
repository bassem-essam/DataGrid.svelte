<script>
    import { getContext } from "svelte";
    import Icon from "./lib/Icon.svelte";
    import { getStore } from "../utils/store";
    import PrettyObject from "../../lib/PrettyObject.svelte";

    let store = getStore(getContext("grid"))
    export let column;
</script>

{#if $store.sortedBy && $store.sortedBy.column == column}
    {#if $store.sortedBy.direction == 1}
        <Icon which={"fa-solid fa-arrow-up"} />
    {:else if $store.sortedBy.direction == -1}
        <Icon which={"fa-solid fa-arrow-down"} />
    {/if}
{/if}
