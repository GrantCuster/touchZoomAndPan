import React, { useEffect, useRef } from "react";
import State from "./State";
import * as THREE from "three";
import { getHeightFromZ, getWorldPixelAtZ } from "./Utils";
import {
  getPointerById,
  initScene,
  makePointerData,
  removePointer,
  updatePointer,
  updateAllOrder,
  updateAllDown,
  makeMidpoint,
  removeMidpoint,
  updateMidpoint,
  setDownCamera,
  setRayFromMouse,
} from "./Actions";

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    const pointerDown = (e) => {
      const activePointer = makePointerData(e);
      State.pointers.push(activePointer);

      setDownCamera();

      updateAllOrder(State.pointers);
      updateAllDown(State.pointers);

      if (State.pointers.length > 1) {
        removeMidpoint();
        makeMidpoint();
      }

      canvas.setPointerCapture(e.pointerId);
    };

    const pointerMove = (e) => {
      if (State.pointers.length > 0) {
        const activePointer = getPointerById(e.pointerId);
        updatePointer(activePointer, e);

        if (State.midpoint !== null) {
          const midpoint = State.midpoint;
          updateMidpoint();

          // Directed zoom
          const zoomData = State.zoomData;
          const ratio = midpoint.distance / midpoint.down.distance;
          const newZ = Math.max(
            0.1,
            Math.min(30, State.downCamera.position.z / ratio)
          );
          zoomData.mouse.copy(midpoint.mouse);
          setRayFromMouse(zoomData, newZ, State.downCamera);

          // Apply pan on top of ray
          const worldPixel = getWorldPixelAtZ(State.downCamera.position.z);
          const diffx = midpoint.mouse.x - midpoint.down.mouse.x;
          const diffy = midpoint.mouse.y - midpoint.down.mouse.y;
          State.camera.position.x = zoomData.ray.x - diffx * worldPixel;
          State.camera.position.y = zoomData.ray.y + diffy * worldPixel;
          State.camera.position.z = zoomData.ray.z;
        }
      }
    };

    const pointerUp = (e) => {
      removePointer(e);

      setDownCamera();

      updateAllOrder(State.pointers);
      updateAllDown(State.pointers);

      removeMidpoint();
      if (State.pointers.length > 1) {
        makeMidpoint();
      }

      canvas.releasePointerCapture(e.pointerId);
    };

    const mouseWheel = (e) => {
      // if (e.ctrlKey) {
      const zoomData = State.zoomData;
      const visibleHeight = window.innerHeight;
      console.log(e.deltaMode);
      const adjusted = visibleHeight - e.deltaY;
      const ratio = adjusted / visibleHeight;
      const newZ = Math.max(0.1, Math.min(30, State.camera.position.z / ratio));
      const mouse = new THREE.Vector2(e.clientX, e.clientY);
      zoomData.mouse.copy(mouse);
      setRayFromMouse(zoomData, newZ, State.camera);
      State.camera.position.copy(zoomData.ray);
      // } else {
      //   const worldPixel = getWorldPixelAtZ(State.camera.position.z);
      //   State.camera.position.x -= e.deltaX * worldPixel;
      //   State.camera.position.y += e.deltaY * worldPixel;
      // }
    };

    canvas.addEventListener("pointerdown", pointerDown);
    canvas.addEventListener("pointermove", pointerMove);
    canvas.addEventListener("pointerup", pointerUp);
    canvas.addEventListener("pointercancel", pointerUp);
    canvas.addEventListener("mousewheel", mouseWheel, { passive: false });
    return () => {
      canvas.removeEventListener("pointerdown", pointerDown);
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerup", pointerUp);
      canvas.removeEventListener("pointercancel", pointerUp);
      canvas.removeEventListener("mousewheel", mouseWheel);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    State.canvas = canvas;
    initScene();
  }, [canvasRef]);

  useEffect(() => {
    const handleResize = () => {
      State.camera.aspect = window.innerWidth / window.innerHeight;
      State.camera.updateProjectionMatrix();
      State.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default App;
