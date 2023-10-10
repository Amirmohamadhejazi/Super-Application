'use client';

const CustomLog = (): void => {
    let styleLog = 'text-shadow: 1px 1px 2px black, 0 0 1em blue, 0 0 0.2em blue; font-size: 20px;';
    console.log('%cdata Fake test', styleLog);
};

export default CustomLog;
