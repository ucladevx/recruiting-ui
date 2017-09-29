const devEssays = [
	{
		name: 'dev_q1',
		title: 'What do you hope to learn from DevX?',
		desc: 'Maximum 250 words.',
		required: true,
	},
	{
		name: 'dev_q2',
		title: 'What side project are you most proud of any why?',
		desc: 'Optional. Maximum 250 words.',
		required: false,
	}
];

export default {
	'Product Manager': [
		{
			name: 'pm_q1',
			title: 'What characteristics do you have that would make you a stellar PM?',
			desc: 'Maximum 200 words.',
			required: true,
		},
		{
			name: 'pm_q2',
			title: 'What do you hope to learn from DevX?',
			desc: 'Maximum 200 words.',
			required: true,
		},
		{
			name: 'pm_q3',
			title: 'Do you have any ideas that you\'re interested in developing into a project for DevX?',
			desc: 'Many of our past projects have come out of ideas or points of frustrations for our members. We develop for the UCLA community, so we want to make sure our products actually solve student needs. If you are selected as a PM, but did not provide an idea, don’t fret. Every PM will be matched to an idea they feel passionate about. Maximum 300 words.',
			required: false,
		},
	],
	'Frontend Developer': devEssays,
	'Backend Developer': devEssays,
	'Full Stack Developer': devEssays,
	'Designer': [
		{
			name: 'designer_q1',
			title: 'What is your favorite product from a design perspective? Why?',
			desc: 'Maximum 400 words.',
			required: true,
		}
	],
}