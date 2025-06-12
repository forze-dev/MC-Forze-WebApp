import React from 'react';
import { Helmet } from 'react-helmet';

const SEOHelmet = ({
	title,
	description,
	canonical,
	indexable = true
}) => {
	return (
		<Helmet>
			<title>{title || "Minecraft сервер Forze Space — Український сервер #1!"}</title>
			<meta name="description" content={description || "Ласкаво просимо на новий Minecraft сервер Forze Space! Розширюй межі світу, викликай босів, проходь паркур, виконуй квести та отримуй нагороди за активність! Будь активним в грі та на сервері — заробляй внутрішню валюту та відкривай ще більше цікавого контенту!"} />
			<meta
				name="robots"
				content={`${indexable ? 'index' : 'noindex'}, ${indexable ? 'follow' : 'nofollow'}`}
			/>
			<link rel="canonical" href={canonical || "https://forze.space"} />
		</Helmet>
	);
};

export default SEOHelmet;