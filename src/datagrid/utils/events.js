import { events } from "./store";

export function emitEvent(name, props, grid) {
    console.log("emitting " + name + " in " + grid)
    events.update(ev => {
        let result = new Array({
            name, props, grid
        });

        result = ev.concat(result)
        return result
    })
}

export function rowClick(row, grid) {
    emitEvent("rowClick", {
        row: row
    }, grid)
}


export function rowDoubleClick(row, grid) {
    emitEvent("rowDoubleClick", {
        row: row
    }, grid)
}

export function cellClick(value, column, row, grid) {
    emitEvent("cellClick", {
        value, column, row
    }, grid)
} 

export function headCellClick(column, grid) {
    console.log(column +":"+ grid)
    emitEvent("headCellClick", {
        column
    }, grid)
}
