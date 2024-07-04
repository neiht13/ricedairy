const readline = require('readline');
const XLSX = require('xlsx');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Nhập đường dẫn của file Excel: ', (filePath) => {
    const workbook = XLSX.readFile(filePath);

    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    rl.question('Nhập số dòng: ', (rowCount) => {
        rl.question('Nhập số cột: ', (colCount) => {
            const rowData = {};
            const columnData = {};

            data.forEach((row, rowIndex) => {
                if (rowIndex < rowCount) {
                    Object.keys(row).forEach((column, colIndex) => {
                        if (colIndex < colCount) {
                            const value = getValueFromMergeCell(worksheet, column, rowIndex);
                            if (!rowData[rowIndex]) {
                                rowData[rowIndex] = [];
                            }
                            if (!columnData[column]) {
                                columnData[column] = [];
                            }

                            rowData[rowIndex].push({ value, code: generateCode() });
                            columnData[column].push({ value, code: generateCode() });
                        }
                    });
                }
            });

            console.log('Row Data:');
            console.log(rowData);

            console.log('Column Data:');
            console.log(columnData);

            rl.close();
        });
    });
});

function getValueFromMergeCell(worksheet, column, rowIndex) {
    const address = XLSX.utils.encode_cell({ r: rowIndex, c: XLSX.utils.decode_col(column) });
    const cell = worksheet[address];
    if (cell && cell.t === 's' && cell.s && cell.s.f && cell.s.f.includes('merge')) {
        // Nếu ô merge, trả về giá trị từ ô merge đầu tiên
        return worksheet[XLSX.utils.encode_cell({ r: cell.s.r, c: cell.s.c })].v;
    } else {
        return cell ? cell.v : '';
    }
}

function generateCode() {
    return Math.random().toString(36).substr(2, 9);
}
