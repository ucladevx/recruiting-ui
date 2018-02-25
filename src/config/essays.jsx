const devEssays = [
	{
		name: 'dev_q1',
		title: 'What do you hope to learn from DevX?',
		desc: 'Maximum 250 words.',
		required: true,
	},
	{
		name: 'dev_q2',
		title: 'What side project are you most proud of and why?',
		desc: 'Maximum 250 words.',
		required: true,
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
			desc: 'Feel free to describe any kind of idea, UCLA specific or even broader implications. If you don\'t have an idea, don\'t fret as many of our PM\'s come in without an idea and can either chose a project from a backlog, or work with us to contact external organizations/communities to help provide consultancy. We are just looking for what makes you tick, and what kind of ideas you want to see work. Maximum 300 words.',
			required: false,
		},
	],
	'Frontend Developer': devEssays,
	'Backend Developer': devEssays,
	'Full Stack Developer': devEssays,
	'Mobile Developer': devEssays,
	'Designer': [
		{
			name: 'designer_q1',
			title: 'Are you a specialist, generalist or novice designer?',
			desc: 'Specialist: You\'re a designer that focuses in a specific field, such as visual design, interaction/UX design, user research, illustration, etc. Although you\'re interested in learning about other design disciplines, your skillful expertise mainly lies in your familiar territory. *********** Generalist: You\'re a designer that hops from discipline to discipline, whether you\'re creating marketing graphics, screen mockups, or user flows. Although you don\'t spend a lot of time honing a specific craft, you find yourself learning things on the fly to solve problems. *********** Novice: You\'re extremely passionate about learning more about design and the design industry, but you don\'t have enough experience to define yourself as either a generalist or specialist. (Being a novice isn\'t bad! We\'re looking for individuals who want to learn more, especially those who are interested in a career in design in tech.)',
			required: true,
		},
		{
			name: 'designer_q2',
			title: 'If you said "Specialist" in the last question, please describe your field/discipline."
			desc: 'Examples: "Visual Design", "Interaction Design", "Illustration", "User Research"',
			required: false,
		},
		{
			name: 'designer_q3',
			title: 'What design software/tools, frameworks, or principles are you familiar with?',
			desc: 'Examples: Adobe Photoshop (software/tools), Bootstrap (framework), Atomic Design (principles)',
			required: false,
		}
	],
}
