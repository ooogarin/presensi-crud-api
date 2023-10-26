const dateNow = () => {
    const date = new Date();

    const dateNow = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return dateNow;
};

module.exports = dateNow;