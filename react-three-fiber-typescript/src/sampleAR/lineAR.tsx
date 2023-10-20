import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";

const ArCanvas = () => {
  return (
    <>
      <Canvas>{/* ここに3DモデルやARコンテンツを配置 */}</Canvas>
    </>
  );
};

export const LineAR = () => {
  const [cameraReady, setCameraReady] = useState(false);

  // Webcamコンポーネントへのrefを作成
  const webcamRef = useRef(null);

  useEffect(() => {
    if (webcamRef.current) {
      setCameraReady(true);
    }
  }, [webcamRef]);

  return (
    <>
      <Webcam
        onUserMedia={() => setCameraReady(true)}
        videoConstraints={{
          facingMode: { exact: "environment" },
        }}
        ref={webcamRef}
      />
      {cameraReady && (
        <div style={{ position: "relative", width: "100%", height: "100vh" }}>
          <ArCanvas />

          {/* Webcamの映像を表示 */}
          <video
            autoPlay
            playsInline
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: -1, // 3Dコンテンツの下に表示
            }}
            ref={webcamRef}
          />

          {/* テキストをWebcamの映像の上に重ねる */}
          <h1
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              zIndex: 1, // Webcamの映像の上に表示
              color: "black", // テキストの色
            }}
          >
            ああああ
          </h1>
        </div>
      )}
    </>
  );
};
