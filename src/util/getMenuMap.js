const getMenuMap = (data) => {
    return Object.entries(data).reduce((result, [groupKey, items]) => {
        items.forEach(({ key, label, path }) => {
            result[key] = { label, path };
        });
        return result;
        }, {});
}

export default getMenuMap;