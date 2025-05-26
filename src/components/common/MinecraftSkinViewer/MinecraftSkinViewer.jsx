import React, { useEffect, useRef } from 'react';
import * as skinview3d from 'skinview3d';

const MinecraftSkinViewer = ({ skinUrl }) => {
	const canvasRef = useRef(null);
	const viewerRef = useRef(null);

	useEffect(() => {
		if (canvasRef.current) {
			// Створюємо вʼюїнг
			viewerRef.current = new skinview3d.SkinViewer({
				canvas: canvasRef.current,
				width: 300,
				height: 380,
				skin: skinUrl || "/assets/adminSkins/ROMENPRO.png"
			});

			// Додаємо контроли
			viewerRef.current.controls.enableRotate = true;
			viewerRef.current.controls.enableZoom = false;
			viewerRef.current.controls.enablePan = false;

			// Анімації
			viewerRef.current.animation = new skinview3d.IdleAnimation();

			return () => {
				viewerRef.current?.dispose();
			};
		}
	}, [skinUrl]);

	return <canvas ref={canvasRef} />;
};

export default MinecraftSkinViewer;