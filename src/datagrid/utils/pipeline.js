import { sortedBy } from "./store";

export function SortedRows(rows, props) {
    if (!props) return rows
    let { column, direction } = props
    let res = [...rows]
    res.sort(sortFn(column, direction))

    return res
}

function sortFn(column, direction) {
    return (a, b) => {
        if (direction == 1)
            return compare(a[column], b[column])
        if (direction == -1)
            return -compare(a[column], b[column])
    }
}

function compare(a, b) {
    if (a == undefined || b == undefined) return 0
    // if (typeof a == "number" && typeof b == "number") return a - b;
    if (!(a instanceof String)) a = a.toString()
    if (!(b instanceof String)) b = b.toString()
    if (isNumeric(a) && isNumeric(b)) return a - b;
    return a.localeCompare(b)
    // console.log(a + " vs " + b, typeof a, typeof b)
    // return 0;
}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    // @ts-ignore
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

export function applyFilters(rows, filters, matchAll) {
    // console.log("Called", rows.length, filters.length);
    if (!filters || filters.length == 0) {
        return rows;
    }

    return rows.filter((row) => {
        row = {...row}
        let show = false;
        let count = 0;
        filters.forEach((filter) => {
            if (filter.fn(row)) {
                show = true;
                count++;
            }
        });

        if (matchAll) {
            return count == filters.length;
        }
        
        return show;
    });
}

export function ApplyPipeline(rows, sortedBy, filters, matchAll = false) {
    let res = [...rows]
    res = SortedRows(res, sortedBy)
    res = applyFilters(res, filters, matchAll)
    return res
}