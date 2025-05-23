import { useState, useEffect } from 'react';
import shopService from '../../../../services/shop.service';
import '../styles/catalog-filters.scss';

const CatalogFilters = ({ onFiltersChange, currentFilters }) => {
	const [categories, setCategories] = useState([]);
	const [productTypes, setProductTypes] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [showMobileFilters, setShowMobileFilters] = useState(false);

	useEffect(() => {
		loadFilterData();
	}, []);

	const loadFilterData = async () => {
		try {
			setIsLoading(true);
			const [categoriesData, typesData] = await Promise.all([
				shopService.getCategories(),
				shopService.getProductTypes()
			]);

			setCategories(categoriesData.categories || []);
			setProductTypes(typesData.types || []);
		} catch (error) {
			console.error('Помилка завантаження фільтрів:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleFilterChange = (filterType, value) => {
		const newFilters = {
			...currentFilters,
			[filterType]: value === currentFilters[filterType] ? null : value
		};

		onFiltersChange(newFilters);
	};

	const clearAllFilters = () => {
		onFiltersChange({
			category: null,
			product_type: null
		});
	};

	const hasActiveFilters = currentFilters.category || currentFilters.product_type;

	if (isLoading) {
		return (
			<div className="catalog-filters">
				<div className="catalog-filters__loading">
					Завантаження фільтрів...
				</div>
			</div>
		);
	}

	return (
		<>
			{/* Кнопка для мобільних пристроїв */}
			<button
				className="catalog-filters__mobile-toggle"
				onClick={() => setShowMobileFilters(!showMobileFilters)}
			>
				<span>Фільтри</span>
				{hasActiveFilters && <span className="active-indicator"></span>}
			</button>

			{/* Фільтри */}
			<div className={`catalog-filters ${showMobileFilters ? 'catalog-filters--mobile-open' : ''}`}>
				<div className="catalog-filters__header">
					<h3>Фільтри</h3>
					{hasActiveFilters && (
						<button
							className="catalog-filters__clear"
							onClick={clearAllFilters}
						>
							Очистити все
						</button>
					)}
				</div>

				{/* Категорії */}
				{categories.length > 0 && (
					<div className="catalog-filters__section">
						<h4>Категорії</h4>
						<div className="catalog-filters__options">
							{categories.map((category) => (
								<button
									key={category.category}
									className={`catalog-filters__option ${currentFilters.category === category.category ? 'active' : ''
										}`}
									onClick={() => handleFilterChange('category', category.category)}
								>
									<span className="option-name">{category.category}</span>
									<span className="option-count">({category.count})</span>
								</button>
							))}
						</div>
					</div>
				)}

				{/* Типи товарів */}
				{productTypes.length > 0 && (
					<div className="catalog-filters__section">
						<h4>Типи товарів</h4>
						<div className="catalog-filters__options">
							{productTypes.map((type) => (
								<button
									key={type.product_type}
									className={`catalog-filters__option ${currentFilters.product_type === type.product_type ? 'active' : ''
										}`}
									onClick={() => handleFilterChange('product_type', type.product_type)}
								>
									<span className="option-name">
										{getProductTypeLabel(type.product_type)}
									</span>
									<span className="option-count">({type.count})</span>
								</button>
							))}
						</div>
					</div>
				)}

				{/* Мобільні кнопки */}
				<div className="catalog-filters__mobile-actions">
					<button
						className="catalog-filters__mobile-close"
						onClick={() => setShowMobileFilters(false)}
					>
						Застосувати
					</button>
				</div>
			</div>

			{/* Оверлей для мобільних пристроїв */}
			{showMobileFilters && (
				<div
					className="catalog-filters__overlay"
					onClick={() => setShowMobileFilters(false)}
				></div>
			)}
		</>
	);
};

// Допоміжна функція для отримання назв типів товарів
const getProductTypeLabel = (productType) => {
	const labels = {
		'item': 'Предмети',
		'subscription': 'Підписки',
		'whitelist': 'Вайтліст',
		'rank': 'Ранги',
		'service': 'Послуги',
		'command': 'Команди'
	};

	return labels[productType] || productType;
};

export default CatalogFilters;