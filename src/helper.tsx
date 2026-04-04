// Helper function - returns random number between min (inc) and max (exc)
const getRandInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

// Helper function to check if the div element is overflowing
function isOverflown(element: HTMLElement) {
    return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    );
}

export { getRandInt, isOverflown };
