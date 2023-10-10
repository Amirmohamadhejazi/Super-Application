'use client';

import { useEffect, useState } from 'react';

export default function Home() {
    const [fullData, setFullData] = useState([
        { name: 'Amir', age: 22, id: 0 },
        { name: 'Ali', age: 21, id: 1 },
        { name: 'hassan', age: 17, id: 2 },
        { name: 'mmd', age: 12, id: 3 },
        { name: 'shayan', age: 24, id: 4 },
        { name: 'younes', age: 27, id: 5 },
        { name: 'majid', age: 10, id: 6 },
        { name: 'reza', age: 7, id: 7 },
        { name: 'javad', age: 17.5, id: 8 }
    ]);
    setInterval(() => {
        function getRandomName() {
            const randomIndex = Math.floor(Math.random() * fullData.length);
            return fullData[randomIndex];
        }

        const randomDetail = getRandomName();

        setFullData(fullData.filter((itemsFilter) => itemsFilter != randomDetail));
    }, 1000);

    useEffect(() => {
        console.log(fullData);
    }, [fullData]);
    return 'A';
}

