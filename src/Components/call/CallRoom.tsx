import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import LocalVideo from './atoms/molecules/LocalVideo';
import { Gallery, RemoteVideo, VideoControls } from './atoms';
import { useCalculateVideoLayout, useCreateMediaStream, useStartPeerSession } from '../../hooks/';
import { toggleFullscreen } from '../../util/helpers';

export const CallRoom = () => {

  // roomID
  const { room } = useParams();
  const galleryRef = useRef();
  const localVideoRef = useRef();
  const mainRef = useRef();

  const userMediaStream = useCreateMediaStream(localVideoRef);
  const { connectedUsers, shareScreen, cancelScreenSharing, isScreenShared } = useStartPeerSession(
    room,
    userMediaStream,
    localVideoRef,
  );

  useCalculateVideoLayout(galleryRef, connectedUsers.length + 1);

  async function handleScreenSharing(share: any) {
    if (share) {
      await shareScreen();
    } else {
      await cancelScreenSharing();
    }
  }

  function handleFullscreen(fullscreen: any) {
    toggleFullscreen(fullscreen, mainRef.current);
  }

  return (
    <div className="container">
      <div className="main" ref={mainRef}>
        <Gallery ref={galleryRef}>
          <LocalVideo ref={localVideoRef} autoPlay playsInline muted />
          {connectedUsers.map((user) => (
            <RemoteVideo key={user} id={user} autoPlay playsInline />
          ))}
        </Gallery>
        <VideoControls
          isScreenShared={isScreenShared}
          onScreenShare={handleScreenSharing}
          onToggleFullscreen={handleFullscreen}
        />
      </div>
    </div>
  );
};

export default CallRoom;