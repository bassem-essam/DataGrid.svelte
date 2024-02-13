<script>
    import Body from "./Body.svelte";
    import Head from "./Head.svelte";

    export let columns;
    export let rows;
</script>

<table>
    <Head {columns} />
    {#if !rows || !columns || rows.length == 0 || columns.length == 0}
    <tr>
        <td colspan={columns.length} class="align-center text-center p-4">
            nothing!
            <h1>columns: {JSON.stringify(columns)}</h1>
            <h1>rows: {JSON.stringify(rows)}</h1>
            </td>
        </tr>
    {:else}
        <Body {columns} {rows} />
    {/if}
</table>
