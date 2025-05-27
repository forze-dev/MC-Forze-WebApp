import { useState, useEffect } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import shopService from '../../../../services/shop.service';
import ProductCard from '../components/ProductCard';
import CatalogFilters from '../components/CatalogFilters';
import "../styles/catalog.scss";

const Catalog = () => {
	const { user, isAuthenticated } = useAuth();
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [filters, setFilters] = useState({
		category: null,
		product_type: null
	});
	const [pagination, setPagination] = useState({
		total: 0,
		limit: 12,
		offset: 0,
		hasMore: false
	});

	// Завантаження товарів
	useEffect(() => {
		loadProducts();
	}, [filters, user]);

	const loadProducts = async (isLoadMore = false) => {
		try {
			if (!isLoadMore) {
				setIsLoading(true);
				setError(null);
			}

			const currentOffset = isLoadMore ? pagination.offset + pagination.limit : 0;

			const params = {
				limit: pagination.limit,
				offset: currentOffset,
				...Object.fromEntries(
					Object.entries(filters).filter(([_, value]) => value !== null)
				)
			};

			const data = await shopService.getFormattedProducts(params, user);

			if (isLoadMore) {
				setProducts(prev => [...prev, ...data.products]);
			} else {
				setProducts(data.products);
			}

			setPagination({
				...pagination,
				total: data.pagination.total,
				offset: currentOffset,
				hasMore: data.pagination.hasMore
			});

		} catch (err) {
			console.error('Помилка завантаження товарів:', err);
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	// Обробка зміни фільтрів
	const handleFiltersChange = (newFilters) => {
		setFilters(newFilters);
		setPagination(prev => ({ ...prev, offset: 0 }));
	};

	// Завантаження більше товарів
	const handleLoadMore = () => {
		if (!isLoading && pagination.hasMore) {
			loadProducts(true);
		}
	};

	// Обробка успішної покупки
	const handlePurchaseSuccess = (productId) => {
		// Якщо користувач авторизований, перезавантажуємо товари
		// щоб приховати товари з вичерпаним лімітом
		if (isAuthenticated) {
			loadProducts();
		}

		// Також можна показати тост-повідомлення
		// toast.success('Товар успішно куплено!');
	};

	return (
		<section className="Catalog">
			<div className="container">
				<div className="catalog-header">
					<h1>Каталог товарів</h1>
					<p className="catalog-subtitle">
						{isAuthenticated
							? `Вітаємо, ${user?.minecraft_nick || user?.minecraftNick}! Твоя знижка: ${user?.discount_percent || 0}%`
							: 'Увійдіть в акаунт для персональних знижок'
						}
					</p>
				</div>

				<div className="catalog-layout">
					{/* Фільтри */}
					<aside className="catalog-sidebar">
						<CatalogFilters
							currentFilters={filters}
							onFiltersChange={handleFiltersChange}
						/>
					</aside>

					{/* Основний контент */}
					<main className="catalog-main">
						{/* Результати пошуку */}
						{/* <div className="catalog-results-info">
							<span>
								{isLoading && pagination.offset === 0
									? 'Завантаження...'
									: `Знайдено ${pagination.total} товарів`
								}
							</span>
						</div> */}

						{/* Товари */}
						{error ? (
							<div className="catalog-error">
								<h3>Помилка завантаження</h3>
								<p>{error}</p>
								<button
									className="retry-btn"
									onClick={() => loadProducts()}
								>
									Спробувати знову
								</button>
							</div>
						) : (
							<>
								{products.length > 0 ? (
									<>
										<div className="catalog-grid">
											{products.map(product => (
												<ProductCard
													key={product.id}
													product={product}
													onPurchaseSuccess={handlePurchaseSuccess}
												/>
											))}
										</div>

										{/* Кнопка "Завантажити більше" */}
										{pagination.hasMore && (
											<div className="catalog-load-more">
												<button
													className="load-more-btn"
													onClick={handleLoadMore}
													disabled={isLoading}
												>
													{isLoading ? 'Завантаження...' : 'Завантажити більше'}
												</button>
											</div>
										)}
									</>
								) : (
									!isLoading && (
										<div className="catalog-empty">
											<h3>Товарів не знайдено</h3>
											<p>
												{Object.values(filters).some(f => f !== null)
													? 'Спробуйте змінити фільтри пошуку'
													: 'Наразі немає доступних товарів'
												}
											</p>
											{Object.values(filters).some(f => f !== null) && (
												<button
													className="clear-filters-btn"
													onClick={() => handleFiltersChange({
														category: null,
														product_type: null
													})}
												>
													Очистити фільтри
												</button>
											)}
										</div>
									)
								)}
							</>
						)}

						{/* Індикатор завантаження */}
						{isLoading && pagination.offset === 0 && (
							<div className="catalog-loading">
								<div className="loading-spinner"></div>
								<p>Завантаження товарів...</p>
							</div>
						)}
					</main>
				</div>
			</div>
		</section>
	);
};

export default Catalog;