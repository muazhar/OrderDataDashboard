const timeoutError = () => {
    return new Promise((resolve, reject) => {
        setTimeout(reject, 10000, {
            error: -1,
            message: 'Could not connect to server.',
        });
    });
};

export default timeoutError;
