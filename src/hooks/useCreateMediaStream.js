import { useEffect, useState } from 'react';

export const useCreateMediaStream = (localVideoRef) => {
  const [userMediaStream, setUserMediaStream] = useState(null);

  useEffect(() => {
    const createMediaStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { min: 640, ideal: 1280 },
          height: { min: 400, ideal: 720 },
          aspectRatio: { ideal: 1.7777777778 },
          echoCancellation: true
        },
        audio: {
            echoCancellation: true
        },
      });

      localVideoRef.current.volume = 0;
      localVideoRef.current.srcObject = stream;

      setUserMediaStream(stream);
    };

    createMediaStream();
  }, [localVideoRef]);

  return userMediaStream;
};
