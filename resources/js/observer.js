var observer = {
    info: {},
    subscribe: (cb, winId) => {
        this.info[winId] = cb;
    },
    publish: (winId, data) => {
        this.info[winId](data);
    }
};
