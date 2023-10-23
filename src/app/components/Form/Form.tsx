'use client';

import { useRef } from 'react';

const Form = () => {
    const formRef = useRef(null);
    const goToNextStep = (e) => {
        e.preventDefault();
        const formDataStep1 = new FormData(formRef.current);
        const dataForm = Object.fromEntries(formDataStep1.entries());
        console.log(dataForm);
    };

    return (
        <form ref={formRef} onSubmit={goToNextStep}>
            <div className="flex items-center justify-center flex-col gap-8 mt-24">
                <div className="w-[100%] lg:w-[35%]  ">
                    <label className={`block text-gray-700 font-bold mb-2`} htmlFor="name">
                        Full Name
                    </label>
                    <input
                        className="w-full border h-8 appearance-none"
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Name"
                    />
                </div>
                <div className="w-[100%] lg:w-[35%]  ">
                    <label className={`block text-gray-700 font-bold mb-2`} htmlFor="family">
                        family
                    </label>
                    <input
                        className="w-full border h-8 appearance-none"
                        type="text"
                        id="family"
                        name="family"
                        required
                        placeholder="family"
                    />
                </div>
                <div className="w-[100%] lg:w-[35%] ">
                    <button type="submit" className="font-bold py-4 px-4 w-full rounded bg-[#6016fc] text-white">
                        Next
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Form;
