/*****************************
 *    FRONTEND CHALLENGES    *
 *****************************/

const duplicateArray = {
	name: 'frontend_code1',
	title: 'Duplicate an Array',
	required: true,
	desc: 'Given an array of integers with <code>1 <= length_of_array <= 1,000,000,000</code>, write a function that returns a new array that behaves as follows',
	example: `duplicate([1]) == [1, 1]
duplicate([1, 2]) == [1, 2, 1, 2]
duplicate([1, 2, 3, 4, 5]) == [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]`
};

const breakingItDown = {
	name: 'frontend_code2',
	title: 'Breaking it Down',
	written: true,
	desc: `Breaking down the view into "components,"" can help you visualize how to start structuring your website. Using <a target="_BLANK" href="https://www.youtube.com">this sample website</a>, briefly list out the main 5 components you see on the page (for example, the navigation/search bar) and choose 2 of them to bullet out in detail. This can include how you would go about structuring their position on the page as well as anything noteworthy about its internal composition. The first sample component is written out below as an example:<br /><br />
Navbar<br />
- Structure on the page: position fixed, top: 0 to make it stick to the top<br />
- Internal composition:<br />
&nbsp;&nbsp;- All immediate children display inline-block OR position flex on parent navbar<br />
&nbsp;&nbsp;- Search bar has % width for responsiveness, expands to full nav width on mobile view`,
};

const modifyingTheDOM = {
	name: 'frontend_code3',
	title: 'Events and Modifying the DOM',
	desc: 'Write an event handler with vanilla JS to handle a form submit. Inside the handler, modify the alert popover to display on the page and contain the text "Form submitted!" <b>Modify **only** within the &lt;script&gt; tags as indicated within the code below.</b>',
	example: `<!DOCTYPE html>
<html>
<head>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
*:focus {
  outline: none;
}
body {
  background: #f5f5f5;
}
button {
  padding: 10px;
  margin: 10px;
  display: inline-block;
  color: #fff;
  font-family: Roboto,sans-serif;
  font-weight: 500;
  font-size: .9em;
  text-transform: uppercase;
  background-color: #5c6bc0;
  border: 0;
  border-radius: 3px;
  border-bottom: 4px solid #303f9f;
  -webkit-appearance: button;
  cursor: pointer;
  transition: .1s ease-in;
  vertical-align: top;
}
button:hover {
  border-bottom-width: 1px;
  margin-top: 4px;
}
.alert-popover {
  display: none;
  position: absolute;
  bottom: 30px;
  left: 30px;
  width: 140px;
  height: auto;
  background: #c8e6c9;
  padding: 20px;
  border: 1px solid #a5d6a7;
  border-radius: 3px;
  font-family: Roboto,sans-serif;
}
.alert-popover.active {
  display: block;
}
#form {
  display: block;
  margin: 80px 0;
}
.form-element{
  display: block;
  width: 70%;
  margin: 0 auto;
  height: 100px;
  font-size: 3rem;
  font-family: Roboto,sans-serif;
}
.form-input {
  border: none;
  border-radius: 3px;
  padding: 0 20px;
}
</style>
</head>
<body>
  <div class="alert-popover">
    <p class="alert-text">Form submitted!</p>
  </div>
  <form id="form">
    <input type="text" class="form-element form-input"></input>
    <button type="submit" class="form-element form-submit-btn">Submit</button>
  </form>
<script>
/**
 * Write your code goes here
 */
</script>
</body>
</html>`
};

const whyES6 = {
	name: 'frontend_code4',
	title: 'ECMAScript 6 (ES6)',
	desc: 'Why is Javascript ES6 useful? What are some features of ES6 that you like the most / use the most, and why? What are some things you dislike and why?',
	written: true
};

const cssGridSystem = {
	name: 'frontend_code5',
	title: 'CSS Grid System',
	desc: 'Have you ever used a grid system, and if so, what do you prefer? Can you explain why you like this system and how it works?',
	written: true
};

/*****************************
 *    BACKEND CHALLENGES     *
 *****************************/

const increasingSubsequence = {
	name: 'backend_code1',
	title: 'Longest Strictly Increasing Subsequence',
	required: true,
	desc: 'Given an array of integers with <code>1 <= length_of_array <= 1,000,000,000</code>, write a function that returns the length of the longest contiguous strictly increasing subsequence.',
	example: `longestIncreasingSubsequence([1,1,1]) == 1
longestIncreasingSubsequence([1,2,1]) == 2
longestIncreasingSubsequence([1,2,3,3,4]) == 3
longestIncreasingSubsequence([1,2,6,6,4,1,2,2]) == 3`
};

const bugSquash = {
	name: 'backend_code2',
	title: 'Bug Squash',
	required: false,
	desc: 'Your colleague wrote this function called <code>transformString</code> that traverses a lowercase <code>std::string</code> backwards and deletes all vowels from it, simultaneously creating a reversed <code>std::string</code> with the vowels removed. However, there are some bugs. Find and fix the bugs. If you can, explain in a comment what the bug was, what its effect was, and how the change solves it.',
	example: `std::string transformString(std::string& str) {
  // unsigned since the length cannot be negative
  unsigned int length = str.size();
  std::string reversed;

  for (unsigned int i = length; i >= 0; i--) {
    if (str[i] == 'a' || 'e' || 'i' || 'o' || 'u')
      // erases 1 character from position i
      str.erase(i, 1);
    }
    else {
      Reversed += str[i];
    }
  }
}`
};

const randomList = {
	name: 'backend_code3',
	title: 'Set with Efficient Random',
	required: false,
	desc: 'You work at a casino and you\'ve been tasked with trying to improve the efficiency of their sweepstakes system. Players will be constantly entering and leaving the casino (each represented by an integer). The casino would like to periodically select a random person in the casino to win a small prize and then ironically encourage them to spend the money they won while they\'re at the casino. To do this, they\'ve asked you to <b>implement a data structure called <code>RandomList</code>, which lets you insert, delete, and get a random number efficiently</b>. Note that each random number should have an equal probability of being returned. You can do this in any language, but here is the interface you have to implement (shown as a C++ class, but again, feel free to implement in any language):',
	example: `class RandomList {
public:
  /**
   * Constructor - initialize your data structures
   */
  RandomList();

  /**
   * Insert a number into the data structure only if the number
   * was not already in the data structure. Return true if
   * so, return false otherwise.
   */
  bool insert(int number);

  /**
   * Remove a number from the data structure only if the number
   * was already in the data structure. Return true if
   * so, return false otherwise.
   */
  bool remove(int number);

  /**
   * Return a random integer from the data structure.
   * Each number must have equal probability.
   */
  int getRandom();

private:
  // add your data structures here
};

// Example usage:
RandomList list;
list.insert(1); // returns true
list.insert(2); // returns true
list.insert(3); // returns true
list.insert(1); // returns false, the list only contains [1, 2, 3]

for (int i = 0; i < 10000; i++) {
  list.getRandom(); // returns a random element in [1, 2, 3]
  // over a lot of iterations, each number should be returned
  // approximately the same number of times, hence having an
  // equal probability
}

list.remove(2); // returns true
list.remove(4); // returns false
list.getRandom(); // should only return a random element in [1, 3]`
};

const designAPIServer = {
	name: 'backend_code4',
	title: 'Design an API Server',
	required: false,
	desc: 'You\'re the backend lead for a project to create a todo list app. The project would like to store a user\'s notes on a server so that it can be backed up and restored, as well as synced to other devices. Your PM would like you to design and implement a <a target="_BLANK" href="http://www.restapitutorial.com/lessons/whatisrest.html">RESTful</a> API server that keeps track of an <b>ordered todo list</b>. For the purposes of this problem, you can decide how you denote a "task" (e.g. what properties you save and return, how you store it, how you access it, etc.) Use best practices and try to design it so that it is easy to add features in the future. You do not need to use a database (use an in-memory data store). You have free reign over all aspects of this project -- language, frameworks, etc.',
};

const databaseQueries = {
	name: 'backend_code5',
	title: 'Database Queries',
	required: false,
	desc: 'You have a data structure called <code>DataPool</code>, which holds a set of objects with no particular order. You can also perform four operations on <code>DataPool</code>s: <b>left outer join</b>, <b>right outer join</b>, <b>filter</b>, and <b>apply</b>. See more information about <a href="https://stackoverflow.com/questions/448023/what-is-the-difference-between-left-right-outer-and-inner-joins" target="_BLANK">SQL joins</a>. The inputs, outputs, and usages of all of these functions are shown below. Using these four functions and given two <code>DataPool</code>s, write a function that returns the <b>intersection</b> of those two data pools.',
	example: `
/**************************
 *  How to use DataPools  *
 **************************/

const dp1 = new DataPool([2, 3, 4]);
const dp2 = new DataPool([3, 4, 5]);

/**
 * Left outer join:
 * Return a new Data Pool that contains all pairs of items
 * (left, right) such that inputting those two items into the
 * passed in function return true;
 */
const res = dp1.leftOuterJoin(dp2, function(a, b) {
  return a + b <= 6;
});

res === new DataPool([[2, 3], [2, 4], [3, 3], [4, null]]);
// res will contain a DataPool with [[2, 3], [2, 4], [3, 3], [4, null]]
// The pair (4, null) exists because there is no item in dp2 when paired
// with 4 from dp1 that will satisfy the function, but 4 itself satifies it.


/**
 * Right outer join:
 * Return a new Data Pool that contains all pairs of items
 * (left, right) such that inputting those two items into the
 * passed in function return true;
 */
const res = dp1.rightOuterJoin(dp2, function(a, b) {
  return a + b <= 6;
});

res === new DataPool([[2, 3], [2, 4], [3, 3], [null, 5]]);
// res will contain a DataPool with [[2, 3], [2, 4], [3, 3], [null, 5]]
// The pair (null, 5) exists because there is no item in dp1 when paired
// with 5 from dp2 that will satisfy the function, but 5 itself satifies it.

/**
 * Filter:
 * Return a subset of items in the DataPool for which the function returns
 * true
 */
const res = dp1.filter(function(item) {
  return item % 2 == 0;
});

res === new DataPool([2, 4]);
// res will contain a DataPool with [2, 4] since the function only
// returns true for those two items

/**
 * Apply:
 * Return a new DataPool after applying a given function to each item in the
 * DataPool
 */
const dp3 = new DataPool([[1, 3], [2, 4], [3, 5]]);
const res = dp3.apply(function(item) {
  return item[0] + item[1];
});

res === new DataPool([4, 6, 8]);
// res will contain a DataPool with [4, 6, 8] since the function just returns
// the sum of the items in each pair.

/**************************
 *       Your Task        *
 **************************/

/**
 * Complete this function so that given two DataPools, a new
 * DataPool is returned that contains their intersection.
 */
function getIntersection(dp1, dp2) {
  // implement this
}

// Example using dp1 and dp2 from above:
getIntersection(dp1, dp2) === new DataPool([3, 4]);`,
};

/*****************************
 *     DESIGN CHALLENGES     *
 *****************************/

const analyzingMyUCLA = {
	name: 'designer_code1',
	title: 'Analyzing MyUCLA',
	desc: 'What do you like and dislike about the myUCLA design?',
	written: true,
};

const redesignMyUCLA = {
	name: 'designer_code2',
	title: 'Redesign MyUCLA',
	desc: 'Draw up a wireframe or sketch on how you would redesign a single feature of myUCLA. Focus on the process/reasoning behind your choices, rather than technical details. Never wireframed before? No worries! Here\'s <a target="_BLANK" href="https://careerfoundry.com/en/blog/ux-design/how-to-create-your-first-wireframe/">an article</a> to help you get started. Upload your wireframe or sketch to a service like Google Drive or Dropbox and paste the link here. Make sure the link is public and accessible to us.',
	written: true,
};

export default {
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
		'Plain text',
		'Python',
		'Ruby',
		'Rust',
		'Scala',
		'Swift',
	],

	'Product Manager': [],

	'Frontend Developer': [
		duplicateArray,
		breakingItDown,
		modifyingTheDOM,
		whyES6,
		cssGridSystem,
	],
	'Backend Developer': [
		increasingSubsequence,
		bugSquash,
		randomList,
		designAPIServer,
		databaseQueries,
	],
	'Full Stack Developer': [
		increasingSubsequence,
		bugSquash,
		modifyingTheDOM,
		breakingItDown,
		randomList,
	],
	'Designer': [
  	analyzingMyUCLA,
  	redesignMyUCLA,
	],
}