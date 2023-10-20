import { Fragment, MutableRefObject, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { CapsuleModel } from "../view/cupsuleModel";

const ArCanvas: React.FC = () => {
  return (
    <>
      <Fragment>
        <CapsuleModel
          position={[100 * 2.5, 109, 109 * 2.5]}
          color={"#efef22"}
          distance={5}
          renderDistance={5}
          onClick={() => alert("onClick")}
        />
      </Fragment>

      {/* eslint-disable-next-line react/no-unknown-property */}
      <gridHelper args={[100]} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <fog attach="fog" color="#000" near={30} far={200} />
      {/* {effector} */}
    </>
  );
};

export const LineAR = () => {
  const [cameraReady, setCameraReady] = useState(false);

  return (
    <>
      <Webcam
        onUserMedia={() => setCameraReady(true)}
        videoConstraints={{
          facingMode: { exact: "environment" },
        }}
      />
      <Canvas>
        <ArCanvas />
      </Canvas>
    </>
  );
};
