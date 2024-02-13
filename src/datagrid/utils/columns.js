export function preprocessColumns(rows, hiddenColumns, preferredColumns) {
    let columns = Object.keys(rows[0]);

            let resultColumns = [];
            for (let c = 0; c < columns.length; c++) {
                if (!hiddenColumns.includes(columns[c])) {
                    resultColumns.push(columns[c]);
                }
            }

            let result = [];
            for (let col of preferredColumns) {
                if (resultColumns.includes(col)) {
                    result.push(col);
                }
            }

            resultColumns.forEach((col) => {
                if (!result.includes(col)) {
                    result.push(col);
                }
            });

    return result;
}