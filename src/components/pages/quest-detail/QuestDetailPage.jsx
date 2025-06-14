import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, User, Gift, CheckCircle, Star, Clock, Crown, AlertCircle, ChevronRight, Target, Zap } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import SEOHelmet from '../../common/SEOHelmet/SEOHelmet';
import './styles/quest-detail.scss';

const QuestDetailPage = () => {
	const [quest, setQuest] = useState(null);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState('overview');

	const navigate = useNavigate()

	const { questName } = useParams()

	useEffect(() => {
		if (!questName) return

		fetch('/assets/quests/quests.json').then(data => data.json()).then(quests => {
			const currQuest = quests.find(el => el.name === questName)

			if (!currQuest) {
				navigate("/quests")
				return
			}

			setQuest(currQuest);
			setLoading(false);
		})
	}, [questName]);

	const getDifficultyColor = (difficulty) => {
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
			case 'easy': return <CheckCircle size={16} />;
			case 'medium': return <Star size={16} />;
			case 'hard': return <Crown size={16} />;
			default: return <CheckCircle size={16} />;
		}
	};

	const getStageStatusIcon = (status) => {
		switch (status) {
			case 'completed': return <CheckCircle size={16} className="text-green-400" />;
			case 'available': return <Target size={16} className="text-cyan-400" />;
			case 'locked': return <AlertCircle size={16} className="text-gray-400" />;
			default: return <AlertCircle size={16} className="text-gray-400" />;
		}
	};

	if (loading) {
		return (
			<div className="quest-detail-page">
				<div className="container">
					<div className="quest-detail-loading">
						<div className="loading-spinner"></div>
						Завантаження квеста...
					</div>
				</div>
			</div>
		);
	}

	if (!quest) {
		return (
			<div className="quest-detail-page">
				<div className="container">
					<div className="quest-detail-error">
						<h2>Квест не знайдено</h2>
						<p>Перевірте правильність назви квеста</p>
						<button className="btn-back" onClick={() => window.history.back()}>
							<ArrowLeft size={16} />
							Повернутися назад
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			<SEOHelmet
				title={`${quest.title} | Квест на майнкрафт сервері Forze Space`}
				description={quest.fullDescription}
				canonical={`https://forze.space/quests/${quest.name}`}
			/>
			<main>
				<div className="quest-detail-page">
					<div className="container">
						{/* Кнопка повернення */}
						<button className="btn-back" onClick={() => window.history.back()}>
							<ArrowLeft size={16} />
							До всіх квестів
						</button>

						{/* Заголовок квеста */}
						<div className="quest-detail-header">
							<div className="quest-detail-image">
								<img
									src={quest.image}
									alt={quest.title}
									onError={(e) => {
										e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgdmlld0JveD0iMCAwIDY0MCAzNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2NDAiIGhlaWdodD0iMzYwIiBmaWxsPSIjMDIyNzIyIi8+CjxwYXRoIGQ9Ik0yODggMTgwTDI0MCAyMjhMMjg4IDI3NkwzMzYgMjI4TDI4OCAxODBaIiBmaWxsPSIjNGFlZGQ5Ii8+Cjx0ZXh0IHg9IjMyMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNGFlZGQ5IiBmb250LXNpemU9IjE4IiBmb250LWZhbWlseT0iQXJpYWwiPtCa0LLQtdGB0YIgRm9yemUgU3BhY2U8L3RleHQ+Cjwvc3ZnPgo=';
									}}
								/>

								{/* Статус завершення */}
								{quest.completed && (
									<div className="quest-completed-badge">
										<CheckCircle size={16} />
										Завершено
									</div>
								)}

								{/* Складність */}
								<div
									className="quest-difficulty-badge"
									style={{
										background: `${getDifficultyColor(quest.difficulty)}20`,
										border: `1px solid ${getDifficultyColor(quest.difficulty)}50`,
										color: getDifficultyColor(quest.difficulty)
									}}
								>
									{getDifficultyIcon(quest.difficulty)}
									{getDifficultyText(quest.difficulty)}
								</div>
							</div>

							<div className="quest-detail-info">
								<h1 className="quest-title">{quest.title}</h1>
								<p className="quest-description">{quest.shortDescription}</p>

								{/* Статистика */}
								<div className="quest-stats">
									<div className="quest-stat">
										<Clock size={16} />
										<span>{quest.estimatedTime}</span>
									</div>
									<div className="quest-stat">
										<Target size={16} />
										<span>{quest.stages} етапи/ів</span>
									</div>
									<div className="quest-stat">
										<Gift size={16} />
										<span>{quest.rewards.length} нагород/и</span>
									</div>
								</div>

								{/* НПС інформація */}
								<div className="quest-npc-info">
									<div className="npc-header">
										<User size={18} />
										<div>
											<h3>{quest.npc.name}</h3>
											<p>{quest.npc.description}</p>
										</div>
									</div>
									<div className="npc-location">
										<MapPin size={14} />
										<span>{quest.npc.location}</span>
										<span className="coordinates">{quest.npc.coordinates}</span>
									</div>
								</div>
							</div>
						</div>

						{/* Табули */}
						<div className="quest-tabs">
							<button
								className={`quest-tab ${activeTab === 'overview' ? 'active' : ''}`}
								onClick={() => setActiveTab('overview')}
							>
								Огляд
							</button>
							<button
								className={`quest-tab ${activeTab === 'stages' ? 'active' : ''}`}
								onClick={() => setActiveTab('stages')}
							>
								Етапи
							</button>
							<button
								className={`quest-tab ${activeTab === 'rewards' ? 'active' : ''}`}
								onClick={() => setActiveTab('rewards')}
							>
								Нагороди
							</button>
						</div>

						{/* Контент табулів */}
						<div className="quest-content">
							{activeTab === 'overview' && (
								<div className="quest-overview">
									<div className="overview-section">
										<h3>Про квест</h3>
										<p>{quest.fullDescription}</p>

										{quest.lore && (
											<div className="quest-lore">
												<h4>Передісторія</h4>
												<p>{quest.lore}</p>
											</div>
										)}
									</div>

									<div className="overview-section">
										<h3>Вимоги</h3>
										<ul className="requirements-list">
											{quest.requirements.map((req, index) => (
												<li key={index}>
													<CheckCircle size={16} />
													{req}
												</li>
											))}
										</ul>
									</div>

									{/* <div className="quest-progress">
								<h3>Прогрес гравців</h3>
								<div className="progress-bar">
									<div
										className="progress-fill"
										style={{ width: quest.completionRate }}
									></div>
								</div>
								<p>{quest.completionRate} гравців завершили цей квест</p>
							</div> */}
								</div>
							)}

							{activeTab === 'stages' && (
								<div className="quest-stages">
									{quest.stageDetails.map((stage, index) => (
										<div key={index} className={`stage-card ${stage.status}`}>
											<div className="stage-header">
												<div className="stage-number">
													{getStageStatusIcon(stage.status)}
													<span>Етап {stage.stage}</span>
												</div>
												<div className="stage-location">
													<MapPin size={14} />
													{stage.location}
												</div>
											</div>

											<h4 className="stage-title">{stage.title}</h4>
											<p className="stage-description">{stage.description}</p>

											<div className="stage-objectives">
												<h5>Завдання:</h5>
												<ul>
													{stage.objectives.map((objective, objIndex) => (
														<li key={objIndex}>
															<ChevronRight size={14} />
															{objective}
														</li>
													))}
												</ul>
											</div>
										</div>
									))}
								</div>
							)}

							{activeTab === 'rewards' && (
								<div className="quest-rewards">
									<h3>Нагороди за виконання</h3>
									<div className="rewards-grid">
										{quest.rewards.map((reward, index) => (
											<div key={index} className="reward-item">
												<Gift size={20} />
												<span>{reward}</span>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

			</main>
		</>
	);

};

export default QuestDetailPage;