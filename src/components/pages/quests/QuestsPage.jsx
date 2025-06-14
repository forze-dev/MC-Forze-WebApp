import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Circle, Star, Crown, User, MapPin, Gift, Clock } from 'lucide-react';
import SEOHelmet from '../../common/SEOHelmet/SEOHelmet';
import "./styles/quests-page.scss"


const QuestsPage = () => {
	const [quests, setQuests] = useState([]);
	const [loading, setLoading] = useState(true);
	const [difficultyFilter, setDifficultyFilter] = useState('all');

	useEffect(() => {
		fetch('/assets/quests/quests.json').then(data => data.json()).then(quests => {
			setQuests(quests);
			setLoading(false);
		})
	}, []);

	const getDifficultyColor = (difficulty) => {
		switch (difficulty) {
			case 'easy': return 'rgba(34, 197, 94, 0.2)';
			case 'medium': return 'rgba(251, 255, 0, 0.2)';
			case 'hard': return 'rgba(239, 68, 68, 0.2)';
			default: return 'rgba(255, 255, 255, 0.2)';
		}
	};

	const getDifficultyBorderColor = (difficulty) => {
		switch (difficulty) {
			case 'easy': return 'rgba(34, 197, 94, 0.3)';
			case 'medium': return 'rgba(251, 255, 0, 0.3)';
			case 'hard': return 'rgba(239, 68, 68, 0.3)';
			default: return 'rgba(255, 255, 255, 0.3)';
		}
	};

	const getDifficultyTextColor = (difficulty) => {
		switch (difficulty) {
			case 'easy': return '#22c55e';
			case 'medium': return '#FBFF00';
			case 'hard': return '#ef4444';
			default: return '#ffffff';
		}
	};

	const getDifficultyText = (difficulty) => {
		switch (difficulty) {
			case 'easy': return 'Легкий';
			case 'medium': return 'Середній';
			case 'hard': return 'Складний';
			default: return 'Невідомо';
		}
	};

	const getDifficultyIcon = (difficulty) => {
		switch (difficulty) {
			case 'easy': return <Circle size={16} />;
			case 'medium': return <Star size={16} />;
			case 'hard': return <Crown size={16} />;
			default: return <Circle size={16} />;
		}
	};

	const filteredQuests = quests.filter(quest => {
		const matchesDifficulty = difficultyFilter === 'all' || quest.difficulty === difficultyFilter;
		return matchesDifficulty;
	});

	const QuestCard = ({ quest }) => (
		<div className="quest-card">
			{/* Зображення квесту */}
			<div className="quest-card__image">
				<img
					src={quest.image}
					alt={quest.title}
					onError={(e) => {
						e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDMyMCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTkyIiBmaWxsPSIjMDIyNzIyIi8+CjxwYXRoIGQ9Ik0xNDQgOTZMMTIwIDEyMEwxNDQgMTQ0TDE2OCAxMjBMMTQ0IDk2WiIgZmlsbD0iIzRhZWRkOSIvPgo8L3N2Zz4K';
					}}
				/>

				{/* Статус завершення */}
				{quest.completed && (
					<div className="quest-card__completed">
						<Circle size={14} />
						Завершено
					</div>
				)}

				{/* Складність */}
				<div
					className="quest-card__difficulty"
					style={{
						background: getDifficultyColor(quest.difficulty),
						border: `1px solid ${getDifficultyBorderColor(quest.difficulty)}`,
						color: getDifficultyTextColor(quest.difficulty)
					}}
				>
					{getDifficultyIcon(quest.difficulty)}
					{getDifficultyText(quest.difficulty)}
				</div>
			</div>

			{/* Основна інформація */}
			<div className="quest-card__content">
				<h3 className="quest-card__title">
					{quest.title}
				</h3>

				<p className="quest-card__description">
					{quest.shortDescription}
				</p>

				{/* НПС інформація */}
				<div className="quest-card__npc">
					<div className="quest-card__npc-header">
						<User size={16} />
						<span>{quest.npc.name}</span>
					</div>
					<div className="quest-card__npc-location">
						<MapPin size={14} />
						<span>{quest.npc.location}</span>
					</div>
				</div>

				{/* Час виконання */}
				<div className="quest-card__time">
					<Clock size={14} />
					<span>{quest.estimatedTime}</span>
				</div>

				<Link to={`/quests/${quest.name}`} className="quest-card__button">
					Детальніше про квест
				</Link>
			</div>
		</div>
	);

	if (loading) {
		return (
			<div className="quests-page">
				<div className="container">
					<div className="quests-loading">
						<div className="loading-spinner"></div>
						Завантаження квестів...
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			<SEOHelmet
				title={"Квести Minecraft сервера Forze Space — Захоплюючі пригоди та нагороди!"}
				description={"Відкрий для себе захоплюючі квести на сервері Forze Space! Полюй на монстрів, шукай скарби, будуй замки та отримуй унікальні нагороди. Понад 7 різноманітних квестів з НПС, етапами та винагородами чекають на тебе!"}
				canonical={"https://forze.space/quests"}
			/>
			<main>
				<div className="quests-page">
					<div className="container">
						{/* Header */}
						<div className="quests-header">
							<h1>Квести сервера</h1>
							<p>Відправляйся в захоплюючі пригоди на Forze Space! Виконуй квести, отримуй нагороди та розкривай таємниці світу.</p>
						</div>

						{/* Фільтри */}
						<div className="quests-filters">
							{[
								{ key: 'all', label: 'Всі квести' },
								{ key: 'easy', label: 'Легкі' },
								{ key: 'medium', label: 'Середні' },
								{ key: 'hard', label: 'Складні' }
							].map(({ key, label }) => (
								<button
									key={key}
									onClick={() => setDifficultyFilter(key)}
									className={`quests-filter ${difficultyFilter === key ? 'active' : ''}`}
								>
									{label}
								</button>
							))}
						</div>

						{/* Квести */}
						<div className="quests-grid">
							{filteredQuests.length === 0 ? (
								<div className="quests-empty">
									<h3>Квестів не знайдено</h3>
									<p>Спробуйте змінити фільтри</p>
								</div>
							) : (
								filteredQuests.map(quest => (
									<QuestCard key={quest.id} quest={quest} />
								))
							)}
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default QuestsPage;