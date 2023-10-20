import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";

const ArCanvas = () => {
  return (
    <>
      <Canvas>
        {/* Three.jsのシーン */}
        <Scene />
      </Canvas>
    </>
  );
};

const Scene = () => {
  const triangleGeometry = new THREE.BufferGeometry();

  const positions = new Float32Array([0, 0, 0, 1, 0, 0, 0.5, 1, 0]);

  triangleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  const triangleMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const triangle = new THREE.Mesh(triangleGeometry, triangleMaterial);

  return (
    <>
      {triangle}
      {/* 他のARコンテンツを追加できます */}
    </>
  );
};

export const LineAR = () => {
  const [cameraReady, setCameraReady] = useState(false);
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
          <video
            autoPlay
            playsInline
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: -1,
            }}
            ref={webcamRef}
          />
          <h1
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              zIndex: 1,
              color: "white",
            }}
          >
            ああああ
          </h1>
        </div>
      )}
    </>
  );
};
