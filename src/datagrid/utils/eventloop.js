import { addMainEvents } from "./sort";
import { events } from "./store";

function broadcast(event) {
    if (event == undefined) return
    for (let el of eventListeners) {
        if (el.name == event.name && el.grid == event.grid)
            el.fn(event.props)
    }
}

export let eventListeners = []

let started = false

export function startEventLoop() {
    if (started)  return
    events.subscribe(e => {
        let lastEvent = e[e.length - 1];
        broadcast(lastEvent)
    })

    addMainEvents()
    started = true
}

export function listenFor(name, fn, grid) {
    eventListeners.push({
        name, fn, grid
    })
}