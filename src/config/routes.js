export default {
	auth: {
		login: '/app/api/v1/auth/login',
		register: '/app/api/v1/auth/register',
	},
	season: {
		get: '/app/api/v1/season',
		delete: '/app/api/v1/season/',
	},
	application: {
		get: '/app/api/v1/application',
		getOne: '/app/api/v1/application/',
		create: '/app/api/v1/application/create',
		update: id => `/app/api/v1/application/${id}`,
		submit: id => `/app/api/v1/application/${id}/submit`,
		review: id => `/app/api/v1/application/${id}/review`,
	}
}