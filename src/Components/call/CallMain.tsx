import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/call/call.css';
import { Button, OrganismsMain } from './atoms';

const CallMain = () => {
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (inputRef.current) {
            navigate(`${inputRef.current.value}`)
        }
    };

    return (
        <div className="container">
            <OrganismsMain>
                <div style={{ color: 'white', display: 'flex' }}>
                    <div
                        style={{
                            background: '#37526d',
                            padding: '2px',
                            marginRight: '10px',
                            borderRadius: '5px',
                        }}
                    >
                        <label
                            style={{
                                padding: '5px 5px',
                                fontSize: '16px',
                                borderRight: '1px solid black',
                            }}
                            htmlFor="room"
                        >
                            teamId
                        </label>
                        <input
                            ref={inputRef}
                            style={{
                                padding: '10px',
                                background: '#37526d',
                                border: '0px',
                                fontSize: '16px',
                                color: 'white',
                            }}
                            id="room"
                            type="text"
                        />
                    </div>
                    <Button onClick={handleButtonClick}>go</Button>
                </div>
            </OrganismsMain>
        </div>
    );
};

export default CallMain;
