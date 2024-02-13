<script>
  import { beforeUpdate, createEventDispatcher, onMount, setContext } from "svelte";
  import Table from "./components/Table.svelte";
  import { makeid } from "./utils/helpers";
  import { createStore } from "./utils/store";
  import { AddSortEvents } from "./utils/sort";
  import { listenFor, startEventLoop } from "./utils/eventloop";
  import { ApplyPipeline } from "./utils/pipeline";
  import { preprocessColumns } from "./utils/columns";
  import FilterBar from "./components/options/FilterBar.svelte";

  export let columns = [];
  export let rows = [];

  export let desiredColumns = null;

  export let preferredColumns = [];

  let dispatch = createEventDispatcher();

  let id = makeid(16);

  setContext("grid", id);

  let store = createStore(id, {
    matchAll: false,
    filters: [],
    sortedBy: { column: null, direction: null },
    selected: [],
    id: id,
  });

  beforeUpdate(() => {
    console.log("rowing", rows && rows.length != 0)
    if (rows && rows.length != 0) {
    columns = preprocessColumns(rows, new Array(), preferredColumns);
    console.log("preprocessing", columns);
  }
  })

  onMount(() => {
    startEventLoop();
    AddSortEvents(id);

    listenFor("rowClick", (data) => dispatch("rowClick", data), id);
    listenFor("rowDoubleClick", (data) => dispatch("rowDoubleClick", data), id);
  });

  export let readyRows;
  $: readyRows = ApplyPipeline(rows, $store.sortedBy, $store.filters, $store.matchAll);

  if (desiredColumns == null) desiredColumns = columns;
</script>

<div id="grid-container">
  <FilterBar bind:matchAll={$store.matchAll} knownColumns={columns} bind:filters={$store.filters} />
  <!-- {#if !rows || rows.length == 0}
    <div>
      <p>No one's here</p>
    </div>
  {:else} -->
    <div id="grid-table-container" class="overflow-auto">
      <p class="p-2">({readyRows.length}) item{readyRows.length == 1 ? "" : "s"}</p>
      <Table {columns} rows={readyRows} />
    </div>
  <!-- {/if} -->
</div>

<style>
  @import "./style.css";
</style>
