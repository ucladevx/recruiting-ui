import React from 'react';

import Config from 'config';
import Button from 'components/Button';
import Topbar from 'components/Topbar';

import TextAreaInput from '../elements/textAreaInput';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scroll(0, 0);
  }

  render() {
    return (
      <div className="cards">
        <div className="card card-wide profile-card">
          <h1>Essay Questions</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultrices faucibus nisl eget feugiat. Integer condimentum enim accumsan lorem commodo, vitae luctus nibh convallis. Maecenas eu aliquam lorem. Donec eleifend odio arcu, at fringilla purus pharetra vitae. Donec eleifend, erat sed cursus euismod, mauris magna tincidunt est, sed hendrerit sem tellus id ex. In varius ullamcorper dolor varius ultrices. In quis euismod massa, id faucibus lacus. Donec rutrum tempus mi, ac pellentesque arcu scelerisque in. Maecenas vehicula massa at neque pharetra, non semper risus fringilla. Nunc vulputate erat nec blandit pretium. Nulla ac fringilla nisi. Nam venenatis ultricies lacus, id ullamcorper neque accumsan vitae. Curabitur a odio eget arcu blandit pellentesque sit amet eu tortor.</p>
          <form className="app-form">
            { Config.essays.essays.map(essay => <TextAreaInput originalValue={this.props.profile[essay.name]} name={essay.name} key={essay.name} title={essay.title} desc={essay.desc} onChange={this.props.setValue} />) }
          </form>
        </div>
      </div>
    );
  }
}