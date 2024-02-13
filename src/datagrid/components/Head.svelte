<script>
    import { getContext } from "svelte";
    import SortStatus from "./SortStatus.svelte";
    import { headCellClick } from "../utils/events";

    export let columns = [];
    let w = { A: 250, B: 500, C: 1000 };

    let gridID = getContext("grid");
</script>

<!--  -->
<!-- <h1>{gridID}</h1> -->
<thead>
    <tr>
        {#each columns as column}
            <th
                on:click={() => {
                    headCellClick(column, gridID);
                }}
                >{column}
                <SortStatus {column} /></th
            >
        {/each}
    </tr>
</thead>
