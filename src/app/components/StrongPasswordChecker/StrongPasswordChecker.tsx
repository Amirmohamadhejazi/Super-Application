import React, { useState } from 'react';

const StrongPasswordChecker = () => {
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState(0);

    const handlePasswordChange = (event) => {
        const password = event.target.value;
        setPassword(password);

        // Check password strength
        let strengthRating = 0;

        // Password should contain at least one lowercase letter
        if (/[a-z]/.test(password)) {
            strengthRating += 25;
        }

        // Password should contain at least one uppercase letter
        if (/[A-Z]/.test(password)) {
            strengthRating += 25;
        }

        // Password should contain at least one digit
        if (/\d/.test(password)) {
            strengthRating += 25;
        }

        // Password should contain at least one special character
        if (/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
            strengthRating += 25;
        }
        setStrength(strengthRating);
    };

    return (
        <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={handlePasswordChange} />
            <div>
                <span>Password strength: </span>
                <span style={{ color: strength > 75 ? 'green' : strength > 50 ? 'orange' : 'red' }}>{strength}%</span>
                {password}
            </div>
        </div>
    );
};

export default StrongPasswordChecker;
