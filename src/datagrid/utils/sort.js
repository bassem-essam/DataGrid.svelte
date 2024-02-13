import { listenFor } from "./eventloop";
import { getStore } from "./store";

export function AddSortEvents(grid) {
    listenFor("headCellClick", function (ev) {
        toggleSort(ev.column, grid)
    }, grid)
}

let directions = {
    1: -1,
    0: 1,
    "-1": 0
}

function toggleSort(column, grid) {
    let store = getStore(grid);
    store.update(store => {
        let direction = 0;
        if (store.sortedBy.column == column) {
            direction = store.sortedBy.direction
        }

        return {
            ...store,
            sortedBy: {
                column: column,
                direction: directions[direction]
            }
        }
    })
}

export function addMainEvents() {
    AddSortEvents()
}