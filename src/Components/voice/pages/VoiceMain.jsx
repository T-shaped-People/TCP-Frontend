import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../styles/call/call.css';
import { Button } from '../atoms';
import { Header } from '../organisms';
import { OrganismsMain } from '../organisms';

const VoiceMain = () => {
  let navigate = useNavigate();
  const inputRef = useRef();

  return (
    <div className={styles.container}>
      <Header title="WebRTC Example" />
      <OrganismsMain full>
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
          <Button onClick={() => navigate(`${inputRef.current.value}`)}>go</Button>
        </div>
      </OrganismsMain>
    </div>
  );
};

export default VoiceMain;