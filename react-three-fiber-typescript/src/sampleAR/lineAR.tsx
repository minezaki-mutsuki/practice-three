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

    // 3メートルの線の始点と終点を定義
    const startPoint = new THREE.Vector3(0, 0, 0);
    const endPoint = new THREE.Vector3(0, -3, 0);

    // 線のジオメトリを作成
    const geometry = new THREE.BufferGeometry().setFromPoints([
      startPoint,
      endPoint,
    ]);

    // 線の材質を設定
    const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });

    // 線オブジェクトを作成
    const line = new THREE.Line(geometry, material);

    // シーンに線を追加
    scene.add(line);

    const animate = () => {
      requestAnimationFrame(animate);

      // アニメーション処理をここに追加

      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <div ref={ref} />;
};
