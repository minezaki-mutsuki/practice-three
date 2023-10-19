import { useEffect, useRef } from "react";
import * as THREE from "three";

export const LineAR = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current === null) return;

    // シーン作成
    const scene = new THREE.Scene();

    // カメラ作成
    const camera = new THREE.PerspectiveCamera(
      75,
      ref.current.clientWidth / ref.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // レンダラーの作成
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(ref.current.clientWidth, ref.current.clientHeight);
    ref.current.appendChild(renderer.domElement);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const video = document.createElement("video");
        video.srcObject = stream;
        video.play();

        // テクスチャとしてビデオを使用
        const videoTexture = new THREE.VideoTexture(video);
        videoTexture.minFilter = THREE.LinearFilter;

        // ビデオを背景に表示するマテリアル
        const backgroundMaterial = new THREE.MeshBasicMaterial({
          map: videoTexture,
        });
        const backgroundGeometry = new THREE.PlaneGeometry(2, 2);
        const backgroundMesh = new THREE.Mesh(
          backgroundGeometry,
          backgroundMaterial
        );
        backgroundMesh.position.z = -1;

        scene.add(backgroundMesh);

        const animate = () => {
          requestAnimationFrame(animate);

          renderer.render(scene, camera);
        };

        animate();
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
  }, []);

  return <div style={{ height: "100vh" }} ref={ref} />;
};
