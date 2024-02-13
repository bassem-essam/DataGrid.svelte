<script>
    import { getContext } from "svelte";
    import { cellClick, rowDoubleClick, rowClick } from "../utils/events";

    export let columns;
    export let rows;

    let grid = getContext("grid");

    let getId = (() => {
        // Wow, Closure!
        var objIdMap = new WeakMap(),
            objectCount = 0;
        return (row) => {
            if (!objIdMap.has(row)) objIdMap.set(row, ++objectCount);
            return objIdMap.get(row);
        };
    })();

    var time_map = {};

    function handleRowClick(row, grid) {
        rowClick(row, grid);
        let id = getId(row);
        if (time_map[id]) {
            let diff = new Date().getTime() - time_map[id];
            if (diff < 500) {
                handleDoubleClick(row, grid);
            }
        }

        time_map[id] = new Date().getTime();
    }

    function handleDoubleClick(row, grid) {
        rowDoubleClick(row, grid);
    }
</script>

<tbody>
    {#each rows as row}
        <tr on:click={() => handleRowClick(row, grid)}>
            {#each columns as col}
                <td
                    on:keypress={() => {}}
                    on:click={() => cellClick(row[col], col, row, grid)}
                    >{row[col]}</td
                >
            {/each}
        </tr>
    {/each}
</tbody>
