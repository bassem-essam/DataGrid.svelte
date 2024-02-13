<script>
  import TailwindCss from "./TailwindCSS.svelte";
  import DataGrid from "./datagrid/DataGrid.svelte";
  import PrimaryButton from "./datagrid/components/PrimaryButton.svelte";

  let data = [];
  let filteredRows = [];
  let url = "";

  let downloadName = "data.json";

  let d = [
    { A: 1, B: 2, C: 3 },
    { A: 2, B: 3, C: 4 },
    { A: 3, B: 4, C: 5 },
    { A: 4, B: 5, C: 6 },
  ];
</script>

<div>
  <div class="overflow-scroll m-auto w-3/4 max-h-fit">
    <div class="bg-slate-800">
      <!-- A file to set data through -->
      <div class="flex p-4 items-center gap-2">
        <label for="file">Upload JSON file</label>
        <input
          id="file"
          type="file"
          accept=".json"
          on:change={(e) => {
            let reader = new FileReader();
            reader.onload = (e) => {
              data = JSON.parse(e.target.result);
              console.log(data);
            };
            reader.readAsText(e.target.files[0]);
          }}
        />
      </div>
      <div class="flex p-4 items-center gap-2 w-full">
        <label for="url">Load from url</label>
        <input
        class="grow p-2 text-black"
          id="url"
          type="url"
          bind:value={url}
        />
        <PrimaryButton
          on:click={() => {
            fetch(url)
              .then((res) => res.json())
              .then((d) => {
                data = d;
              });
          }}
        >
          Load
        </PrimaryButton>
      </div>
      <div class="flex p-4 items-center gap-2 w-full">
        <p>Download data in this window (filtered data)
          <input class="p-2 text-black" type="text" bind:value={downloadName}>
          <PrimaryButton
            on:click={() => {
              let a = document.createElement("a");
              a.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredRows));
              a.download = downloadName;
              a.click();
            }}
          >Download</PrimaryButton>
        </p>
      </div>
    </div>
    <div class="border">
    <DataGrid
      rows={data}
      bind:readyRows={filteredRows}
    />
  </div>
  </div>
</div>
