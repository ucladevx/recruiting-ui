import React from 'react';

import Config from 'config';
import Button from 'components/Button';
import Topbar from 'components/Topbar';

import TextInput from './elements/textInput';
import SelectInput from './elements/selectInput';
import CheckboxInput from './elements/checkboxInput';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scroll(0, 0);
    document.title = "DevX | Profile";
  }

  render() {
    return (
      <div className="cards">
        <div className="card card-wide profile-card">
          <h1>Personal Information</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultrices faucibus nisl eget feugiat. Integer condimentum enim accumsan lorem commodo, vitae luctus nibh convallis. Maecenas eu aliquam lorem. Donec eleifend odio arcu, at fringilla purus pharetra vitae. Donec eleifend, erat sed cursus euismod, mauris magna tincidunt est, sed hendrerit sem tellus id ex. In varius ullamcorper dolor varius ultrices. In quis euismod massa, id faucibus lacus. Donec rutrum tempus mi, ac pellentesque arcu scelerisque in. Maecenas vehicula massa at neque pharetra, non semper risus fringilla. Nunc vulputate erat nec blandit pretium. Nulla ac fringilla nisi. Nam venenatis ultricies lacus, id ullamcorper neque accumsan vitae. Curabitur a odio eget arcu blandit pellentesque sit amet eu tortor.</p>
          <form className="app-form">
            <TextInput name="firstName" title="First Name" />
            <TextInput name="lastName" title="Last Name" />
            <TextInput name="major" title="Major" />
            <SelectInput name="year" title="Year" options={Config.profile.years} />
            <SelectInput name="gender" title="Gender" options={Config.profile.genders} />
            <SelectInput name="tshirt" title="T-Shirt Size" options={Config.profile.tshirtSizes} />
          </form>
        </div>

        <div className="card card-wide profile-card">
          <h1>Technical Information</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultrices faucibus nisl eget feugiat. Integer condimentum enim accumsan lorem commodo, vitae luctus nibh convallis. Maecenas eu aliquam lorem. Donec eleifend odio arcu, at fringilla purus pharetra vitae. Donec eleifend, erat sed cursus euismod, mauris magna tincidunt est, sed hendrerit sem tellus id ex. In varius ullamcorper dolor varius ultrices. In quis euismod massa, id faucibus lacus. Donec rutrum tempus mi, ac pellentesque arcu scelerisque in. Maecenas vehicula massa at neque pharetra, non semper risus fringilla. Nunc vulputate erat nec blandit pretium. Nulla ac fringilla nisi. Nam venenatis ultricies lacus, id ullamcorper neque accumsan vitae. Curabitur a odio eget arcu blandit pellentesque sit amet eu tortor.</p>
          <form className="app-form">
            <SelectInput name="rolePreference" title="Role Preference" options={Config.profile.rolePreferences} desc="Which role are you most interested in applying for?" />
            <CheckboxInput name="languages" title="Languages" options={Config.profile.languages} desc="Select all languages that you're comfortable with." />
            <CheckboxInput name="backendTechnologies" title="Backend Technologies" options={Config.profile.backendTechnologies} desc="Select all backend technologies that you've worked with (if applicable)" />
            <CheckboxInput name="frontendTechnologies" title="Frontend Technologies" options={Config.profile.frontendTechnologies} desc="Select all frontend technologies that you've worked with (if applicable)" />
            <CheckboxInput name="otherFrameworksTools" title="Other Frameworks/Tools" options={Config.profile.otherFrameworksTools} desc="Select all other frameworks/tools that you've worked with (if any)" />

            <CheckboxInput name="mobileTechnologies" title="Mobile Technologies" options={Config.profile.mobileTechnologies} desc="Select all mobile technologies that you've worked with (if any)" />
            <CheckboxInput name="deploymentPlatforms" title="Deployment Platforms" options={Config.profile.deploymentPlatforms} desc="Select all deployment platforms that you've deployed on (if any)" />
            <CheckboxInput name="databases" title="Databases" options={Config.profile.databases} desc="Select all databases that you've worked with (if any)" />
            
            <CheckboxInput name="designTypes" title="Design Types" options={Config.profile.designTypes} desc="Select all types of design that you've worked on (if applicable)" />
            <CheckboxInput name="designTools" title="Design Tools" options={Config.profile.designTools} desc="Select all design tools that you've worked with (if applicable)" />
          </form>
        </div>
      </div>
    );
  }
}