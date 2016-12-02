async function sleep() {
    await new Promise((resolve, reject) => {
        setTimeout(() => resolve(), 1000);
    });
    return 'Hao123';
}
export {sleep};
