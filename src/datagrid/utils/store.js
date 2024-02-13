import { writable } from "svelte/store";

export const events = writable([]);

export const sortedBy = writable({
    "": {
        column: "",
        direction: 1
    }
})

export const filters = writable([]);

export function getStore(id) {
    if (stores[id]) {
        return stores[id];
    } else {
        // stores[id] = writable({});
        // return stores[id];
        return null;
    }
}


export function createStore(id, obj) {
    stores[id] = writable(obj);
    return stores[id];
}

export const stores = { "a": writable(1), "b": writable(1) };