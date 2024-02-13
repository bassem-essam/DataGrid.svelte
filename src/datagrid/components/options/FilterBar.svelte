<script>
  import PrimaryButton from "../PrimaryButton.svelte";

  export let filters;

  export let knownColumns = [];

  export let matchAll = false;

  let newFilter = "";

  function makeFunction(filter) {
    let fn = null;
    try {
      fn = new Function(
        "r",
        `let {${knownColumns.join(", ")}} = r; return ${filter}`
      );
    } catch (e) {
      return false;
    }

    return fn;
  }

  function addFilter(filter) {
    if (filter == "") return;

    let fn = makeFunction(filter);
    if (fn) {
      filters = [
        ...filters,
        {
          value: filter,
          fn: fn,
        },
      ];

      newFilter = "";
    } else {
      alert("Invalid filter");
    }
  }
</script>

<div class="flex flex-col font-mono p-8 items-center">
  <div class="w-full p-4 border">
    <div class="text-white flex align-center">
      <h2 class="grow p-2">Filters: ({filters.length})</h2>
      <div class="p-2 bg-slate-900">
        <label for="chk-any">Match intersection</label>
        <input class="" type="checkbox" name="chk-any" id="chk-any" bind:checked={matchAll}/>
      </div>
    </div>
    <ul>
      {#each filters as filter}
        <li class="flex flex-row align-center mt-2">
          <input
            class="bg-slate-300 text-slate-900 grow p-4"
            type="text"
            name="filter-value"
            id="filter-value"
            readonly
            value={filter.value}
          />
          <PrimaryButton
            classes="bg-red-500 text-white p-4 grow-0 hover:bg-red-600"
            on:click={() => {
              filters = filters.filter((f) => f.value != filter.value);
            }}>Remove</PrimaryButton
          >
        </li>
      {/each}
    </ul>
  </div>
  <div class="w-full flex items-center mt-6 align-center gap-1">
    <label for="txt-filter">New filter</label>
    <input
      class="bg-slate-300 text-slate-900 grow p-2"
      type="text"
      name="filter"
      id="txt-filter"
      bind:value={newFilter}
      on:keydown={(e) => {
        if (e.key == "Enter") {
          addFilter(newFilter);
        }
      }}
    />
    <PrimaryButton
      on:click={() => {
        addFilter(newFilter);
      }}>Add Filter</PrimaryButton
    >
  </div>
</div>
