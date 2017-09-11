import React from 'react';

import Config from 'config';
import Button from 'components/Button';
import Topbar from 'components/Topbar';

import SelectInput from './elements/selectInput';
import CodeInput from './elements/codeInput';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scroll(0, 0);
  }

  render() {
    const type = (this.props.profile.rolePreference === "Design") ? "Designer" : this.props.profile.rolePreference + " Developer";
    return (
      <div className="cards">
        <div className="card card-wide profile-card">
          <h1>Coding Challenges</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultrices faucibus nisl eget feugiat. Integer condimentum enim accumsan lorem commodo, vitae luctus nibh convallis. Maecenas eu aliquam lorem. Donec eleifend odio arcu, at fringilla purus pharetra vitae. Donec eleifend, erat sed cursus euismod, mauris magna tincidunt est, sed hendrerit sem tellus id ex. In varius ullamcorper dolor varius ultrices. In quis euismod massa, id faucibus lacus. Donec rutrum tempus mi, ac pellentesque arcu scelerisque in. Maecenas vehicula massa at neque pharetra, non semper risus fringilla. Nunc vulputate erat nec blandit pretium. Nulla ac fringilla nisi. Nam venenatis ultricies lacus, id ullamcorper neque accumsan vitae. Curabitur a odio eget arcu blandit pellentesque sit amet eu tortor.</p>
          <p>Since you selected <b>{type}</b>, we've modified your challenges to better suit your skills.</p>
        </div>
        { Config.challenges.challenges.map(challenge => 
          <div className="card card-wide profile-card" key={challenge.name}>
            <h1>{challenge.title}</h1>
            <p>{challenge.desc}</p>
            
            <form className="app-form">
              <CodeInput originalValue={this.props.profile[challenge.name]} name={challenge.name} example={challenge.example} onChange={this.props.setValue} />
              <SelectInput originalValue={this.props.profile[challenge.name + 'Language']} name={challenge.name + 'Language'} title="Language" options={Config.challenges.languages} onChange={this.props.setValue} />
            </form>
          </div>
        )}
      </div>
    );
  }
}