export const HOME_PAGE_METADATA = {
	title: 'Minecraft сервер Forze Space — Розвивайся та досліджуй світ разом з нами!',
	description: 'Ласкаво просимо на новий Minecraft сервер Forze Space! Розширюй межі світу, викликай босів, проходь паркур, виконуй квести та отримуй нагороди за активність! Будь активним в грі та на сервері — заробляй внутрішню валюту та відкривай ще більше цікавого контенту!',
	keywords: [
		'Minecraft сервер',
		'Forze Space',
		'Minecraft Україна',
		'Minecraft сервер Україна',
		'Minecraft паркур',
		'Minecraft паркур сервер',
		'Minecraft боси',
		'Minecraft босс',
		'Minecraft боси виклик',
		'Minecraft квести',
		'Minecraft квести сервер',
		'Minecraft міні-ігри',
		'Minecraft міні ігри',
		'Minecraft відкриття серверу',
		'Minecraft новий сервер',
		'Minecraft спільнота',
		'Minecraft RPG сервер',
		'Minecraft RPG',
		'Minecraft сервер космос',
		'Minecraft космічний сервер',
		'Minecraft survival сервер',
		'Minecraft PvP сервер',
		'Minecraft PvE сервер',
		'Minecraft мультиплеєр',
		'Minecraft онлайн сервер',
		'Minecraft сервер 2025',
		'кращі Minecraft сервери',
		'ігри Minecraft сервер',
		'Minecraft сервера Україна',
		'Minecraft сервер відкриття',
		'Minecraft донат сервер',
		'Minecraft артефакти',
		'Minecraft боси битви',
		'Minecraft таємничі вежі',
		'Minecraft портали',
		'Minecraft Пекло сервер',
		'Minecraft таблиця лідерів',
		'Minecraft паркур карта',
		'Minecraft NPC квести',
		'Minecraft торговці',
		'Minecraft секрети',
		'Minecraft внутрішня валюта',
		'Minecraft нагороди за активність',
		'Minecraft онлайн ігри',
		'Minecraft сервер з міні-іграми',
		'Minecraft сервер без лагів',
		'Minecraft космос',
		'Minecraft Forze Space Україна',
	],

	robots: {
		index: true,
		follow: true,
	},

	alternates: {
		canonical: 'https://forze.space',
		languages: {
			'uk': 'https://forze.space'
		}
	},

	openGraph: {
		title: 'Minecraft сервер Forze Space',
		description: 'Розвивайся, бийся з босами, проходь паркур і виконуй квести на сервері Forze Space!',
		url: 'https://forze.space',
		siteName: 'Forze Space',
		images: [
			{
				url: 'https://forze.space/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Minecraft сервер Forze Space',
			},
		],
		locale: 'uk_UA',
		type: 'article',
		publishedTime: '2025-05-01T12:00:00+03:00',
		modifiedTime: '2025-05-15T12:00:00+03:00',
		tags: [
			'Minecraft сервер',
			'Forze Space',
			'Minecraft Україна',
			'Minecraft паркур',
			'Minecraft квести'
		]
	},

	twitter: {
		card: 'summary_large_image',
		site: '@forze_space',
		creator: '@forze_space',
		title: 'Minecraft сервер Forze Space',
		description: 'Розвивайся, бийся з босами, проходь паркур і виконуй квести на сервері Forze Space!',
		images: ['https://forze.space/og-image.jpg'],
	},

	authors: [
		{ name: 'Forze Space Team', url: 'https://forze.space' }
	],

	icons: {
		icon: '/favicon.ico',
		apple: [
			{ url: '/apple-touch-icon.png', sizes: '180x180' },
			{ url: '/apple-touch-icon-152x152.png', sizes: '152x152' },
			{ url: '/apple-touch-icon-120x120.png', sizes: '120x120' }
		],
	},

	manifest: '/site.webmanifest',

	formatDetection: {
		telephone: false,
		email: false,
		address: false,
	},
};

// Окремий об'єкт для viewport, включаючи themeColor
export const HOME_PAGE_VIEWPORT = {
	width: 'device-width',
	initialScale: 1,
	themeColor: '#000000',
};

