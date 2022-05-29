
export const shuffleArray = (array: any[]) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

export const b64EncodeUnicode = (str: string) => {
    return btoa(encodeURIComponent(str));
};

export const UnicodeDecodeB64 = (str: string) => {
    return decodeURIComponent(atob(str));
};
