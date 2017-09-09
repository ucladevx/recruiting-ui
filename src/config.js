export default {
  apiHost: process.env.WEBPACK ? 'http://localhost:8080' : '',
  routes: {
    auth: {
      login: '/app/api/v1/auth/login',
      register: '/app/api/v1/auth/register',
    }
  },
  profile: {
    years: [
      'Freshman',
      'Sophomore',
      'Junior',
      'Senior',
      'Other',
    ],

    genders: [
      'Male',
      'Female',
      'Non-binary',
      'Other',
    ],

    tshirtSizes: [
      'Extra Small',
      'Small',
      'Medium',
      'Large',
      'Extra Large',
      'XX Large',
      'XXX Large',
    ],

    rolePreferences: [
      'Frontend',
      'Backend',
      'Full Stack',
      'Design',
    ],

    languages: [
      'Bash',
      'Basic',
      'C/C++',
      'CoffeeScript',
      'Common Lisp',
      'Erlang',
      'Golang',
      'Java',
      'JavaScript/ES6',
      'Kotlin',
      'Lua',
      'MATLAB',
      'Objective-C',
      'Perl',
      'PHP',
      'Python',
      'Ruby',
      'Rust',
      'Scala',
      'Swift',
      'Other',
    ],

    backendTechnologies: [
      'Golang',
      'Java',
      'Node.js',
      'NGINX',
      'PHP/Apache',
      'Python',
      'Ruby on Rails',
      'Other',
    ],

    frontendTechnologies: [
      'AngularJS',
      'Boostrap',
      'CSS',
      'Dojo',
      'Ember.js',
      'HTML',
      'JavaScript',
      'Polymer',
      'React.js',
      'SCSS/Sass',
      'Semantic UI',
      'TodoMVC',
      'Vue.js',
      'Webpack',
      'Other',
    ],

    otherFrameworksTools: [
      'Meteor.js',
      'Gulp',
      'Grunt',
      'Git/SVN',
      'Unit Testing',
      'Other',
    ],

    mobileTechnologies: [
      'Android',
      'iOS',
      'Windows Mobile',
      'Other',
    ],

    databases: [
      'Amazon DynamoDB',
      'Amazon RDS',
      'Cassandra',
      'CouchDB',
      'Google BigTable',
      'HBase',
      'MariaDB',
      'MemSQL',
      'Memcached',
      'MongoDB',
      'MySQL',
      'PostgreSQL',
      'Redis',
      'SQLite',
      'Other',
    ],

    deploymentPlatforms: [
      'AWS',
      'Azure',
      'Digital Ocean',
      'Firebase',
      'Google Cloud Platform',
      'Heroku',
      'Linode',
      'Self-hosted',
      'Other',
    ],

    designTypes: [
      'Creative Design',
      'Communicatin Design',
      'Graphic Design',
      'Illustration',
      'Product Design',
      'UI Design',
      'UX Design',
      'UX Research',
      'Web Design',
      'Other',
    ],

    designTools: [
      'Abstract',
      'Adobe After Effects',
      'Adobe Experience Design',
      'Adobe Illustrator',
      'Adobe Photoshop',
      'Figma',
      'Framer',
      'InVision',
      'Marvel',
      'Origami Studios',
      'Sketch',
      'Zelpin',
      'Other',
    ]
  },

  essays: {
    essays: [
      {
        name: 'q1',
        title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit?',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultrices faucibus nisl eget feugiat. Integer condimentum enim accumsan lorem commodo, vitae luctus nibh convallis.',
      },
      {
        name: 'q2',
        title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit?',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultrices faucibus nisl eget feugiat. Integer condimentum enim accumsan lorem commodo, vitae luctus nibh convallis.',
      },
      {
        name: 'q3',
        title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit?',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultrices faucibus nisl eget feugiat. Integer condimentum enim accumsan lorem commodo, vitae luctus nibh convallis.',
      },
    ]
  },

  challenges: {
    languages: [
      'Bash',
      'C',
      'C++',
      'CoffeeScript',
      'Common Lisp',
      'Erlang',
      'Golang',
      'Java',
      'JavaScript',
      'Kotlin',
      'Perl',
      'PHP',
      'Python',
      'Ruby',
      'Rust',
      'Scala',
      'Swift',
    ],
    challenges: [
      {
        name: 'code1',
        title: 'A Creative Title for this Problem',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultrices faucibus nisl eget feugiat. Integer condimentum enim accumsan lorem commodo, vitae luctus nibh convallis. Maecenas eu aliquam lorem. Donec eleifend odio arcu, at fringilla purus pharetra vitae. Donec eleifend, erat sed cursus euismod, mauris magna tincidunt est, sed hendrerit sem tellus id ex. In varius ullamcorper dolor varius ultrices. In quis euismod massa, id faucibus lacus. Donec rutrum tempus mi, ac pellentesque arcu scelerisque in. Maecenas vehicula massa at neque pharetra, non semper risus fringilla. Nunc vulputate erat nec blandit pretium. Nulla ac fringilla nisi. Nam venenatis ultricies lacus, id ullamcorper neque accumsan vitae. Curabitur a odio eget arcu blandit pellentesque sit amet eu tortor.',
        example: 'Example Input<br>1<br>2<br>3<br><br>Output<br>4',
      },
      {
        name: 'code2',
        title: 'A Creative Title for this Problem 2',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultrices faucibus nisl eget feugiat. Integer condimentum enim accumsan lorem commodo, vitae luctus nibh convallis. Maecenas eu aliquam lorem. Donec eleifend odio arcu, at fringilla purus pharetra vitae. Donec eleifend, erat sed cursus euismod, mauris magna tincidunt est, sed hendrerit sem tellus id ex. In varius ullamcorper dolor varius ultrices. In quis euismod massa, id faucibus lacus. Donec rutrum tempus mi, ac pellentesque arcu scelerisque in. Maecenas vehicula massa at neque pharetra, non semper risus fringilla. Nunc vulputate erat nec blandit pretium. Nulla ac fringilla nisi. Nam venenatis ultricies lacus, id ullamcorper neque accumsan vitae. Curabitur a odio eget arcu blandit pellentesque sit amet eu tortor.',
        example: 'Function signature<br><br>C       int func(int, char*);<br>C++     int func(vector&lt;int&gt;);<br>Java    public int func(ArrayList&lt;int&gt;);',
      },
    ]
  }
}