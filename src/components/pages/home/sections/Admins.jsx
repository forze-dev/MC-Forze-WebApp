import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import MinecraftSkinViewer from "../../../common/MinecraftSkinViewer/MinecraftSkinViewer";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import "../styles/admins.scss";

const Admins = () => {
	const [swiperInstance, setSwiperInstance] = useState(null);
	const [adminsData, setAdminsData] = useState(null)

	useEffect(() => {
		fetch("/assets/adminSkins/data.json").then(data => data.json()).then(res => setAdminsData(res))
	}, [])

	const autoplayRef = useRef(null);
	// Функції для керування слайдером при взаємодії зі скіном
	const handleSkinInteractionStart = () => {
		if (swiperInstance) {
			// Вимикаємо свайпи та автопрогравання
			swiperInstance.allowSlideNext = false;
			swiperInstance.allowSlidePrev = false;
			swiperInstance.allowTouchMove = false;

			// Зупиняємо автопрогравання
			if (swiperInstance.autoplay) {
				swiperInstance.autoplay.stop();
			}
		}
	};

	const handleSkinInteractionEnd = () => {
		if (swiperInstance) {
			// Вмикаємо свайпи та автопрогравання назад
			swiperInstance.allowSlideNext = true;
			swiperInstance.allowSlidePrev = true;
			swiperInstance.allowTouchMove = true;

			// Запускаємо автопрогравання
			if (swiperInstance.autoplay) {
				swiperInstance.autoplay.start();
			}
		}
	};

	if (!adminsData) return null

	return (
		<section className="admins">
			<div className="container">
				<div className="admins__header">
					<h2>Наша команда</h2>
					<p>Професіонали, які роблять сервер особливим</p>
				</div>

				<div className="admins__slider">
					<Swiper
						modules={[Navigation, EffectCoverflow]}
						spaceBetween={30}
						slidesPerView={1}
						navigation={{
							nextEl: '.admins-button-next',
							prevEl: '.admins-button-prev',
						}}
						autoplay={{
							delay: 4000,
							disableOnInteraction: false,
						}}
						effect="coverflow"
						coverflowEffect={{
							rotate: 15,
							stretch: 0,
							depth: 100,
							modifier: 1,
							slideShadows: false,
						}}
						loop={true}
						className="admins-swiper"
						onSwiper={setSwiperInstance}
						onAutoplayTimeLeft={(s, time, progress) => {
							autoplayRef.current = { time, progress };
						}}
					>
						{adminsData.map((admin) => (
							<SwiperSlide key={admin.id}>
								<div className="admin-card">
									<div className="admin-card__header">
										<div
											className="admin-card__skin"
											onMouseEnter={handleSkinInteractionStart}
											onMouseLeave={handleSkinInteractionEnd}
											onTouchStart={handleSkinInteractionStart}
											onTouchEnd={handleSkinInteractionEnd}
										>
											<MinecraftSkinViewer skinUrl={admin.skinUrl} />
											<div className="skin-glow"></div>
										</div>
									</div>

									<div className="admin-card__content">
										<div className="admin-card__info">
											<h3 className="admin-card__nickname">{admin.nickname}</h3>
											<span
												className="admin-card__role"
												style={{ backgroundColor: admin.roleColor }}
											>
												{admin.role}
											</span>
										</div>

										<p className="admin-card__description">
											{admin.description}
										</p>
									</div>

									<div className="admin-card__decoration">
										<div className="decoration-line"></div>
										<div className="decoration-dot"></div>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>

					{/* Custom Navigation */}
					<div className="admins-navigation">
						<button className="admins-button-prev">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</button>
						<button className="admins-button-next">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</button>
					</div>

					{/* Custom Pagination */}
					<div className="admins-pagination"></div>
				</div>
			</div>


		</section>
	);
};

export default Admins;