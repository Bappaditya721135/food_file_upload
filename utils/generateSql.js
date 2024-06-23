export const generateSql = (data, file, id) => {
    let sql = `update food set `;
    const keys = Object.keys(data);
    if(keys.length > 0) {
        for(let i = 0; i<keys.length; i++) {
            if(i === keys.length - 1) {
                if(file) {
                    sql += `${keys[i]} = ${isNaN(data[keys[i]]) === true ? `"${data[keys[i]]}"` : data[keys[i]]}, `
                }
                else {
                    sql += `${keys[i]} = ${isNaN(data[keys[i]]) === true ? `"${data[keys[i]]}"` : data[keys[i]]} `
                }
            }
            else {
                sql += `${keys[i]} = ${isNaN(data[keys[i]]) === true ? `"${data[keys[i]]}"` : data[keys[i]]}, `
            }
        }
        
        if(file) {
            sql += `image_url = "${file.filename}" `
        }
        sql += `where id = "${id}"`
    }
    else {
        if(file) {
            sql += `image_url = ${file.filename} where id = "${id}"`
        }
    }
    return sql;
}