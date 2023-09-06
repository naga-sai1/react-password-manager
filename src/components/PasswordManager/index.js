import {v4 as uuidv4} from 'uuid'

import {Component} from 'react'

import PasswordItem from '../PasswordItem'

import './index.css'

const colorHexCodes = [
  '#0b69ff',
  '#94a3b8',
  '#b6c3ca',
  '#b91c1c',
  '#14b8a6',
  '#f97316',
  '#10b981',
  '#f59e0b',
  '#7683cb',
]

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    isChecked: false,
    passwordList: [],
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onAddNewPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const newPasswordDetails = {
      id: uuidv4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
    }
    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPasswordDetails],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onChecked = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  deletePassword = id => {
    const {passwordList} = this.state
    const filteredPasswords = passwordList.filter(
      eachItem => eachItem.id !== id,
    )
    this.setState({passwordList: filteredPasswords})
  }

  onSearchPassword = event => {
    const {passwordList} = this.state
    const searchedValue = event.target.value
    const filteredPasswords = passwordList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchedValue.toLowerCase()),
    )
    this.setState({passwordList: filteredPasswords})
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      isChecked,
      passwordList,
    } = this.state
    const status = passwordList.length !== 0
    return (
      <div className="bg-container">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
        </div>
        <div className="user-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="sm-manager-icon"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="lg-manager-icon"
          />
          <form className="user-details-container">
            <h1 className="heading">Add New Password</h1>
            <div className="input-item-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-item-img"
              />
              <input
                className="input-item"
                type="text"
                placeholder="Enter Website"
                value={websiteInput}
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="input-item-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-item-img"
              />
              <input
                className="input-item"
                type="text"
                placeholder="Enter Username"
                value={usernameInput}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-item-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-item-img"
              />
              <input
                className="input-item"
                type="password"
                placeholder="Enter Password"
                value={passwordInput}
                onChange={this.onChangePassword}
              />
            </div>
            <button
              type="submit"
              className="add-btn"
              onClick={this.onAddNewPassword}
            >
              Add
            </button>
          </form>
        </div>
        <div className="your-password-container">
          <div className="search-and-count-container">
            <div className="your-password-count-container">
              <h1 className="heading">Your Passwords</h1>
              <p className="password-count">{passwordList.length}</p>
            </div>
            <div className="password-search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="password-search-icon"
                alt="search"
              />
              <input
                type="search"
                placeholder="Search"
                className="password-search-input"
                onChange={this.onSearchPassword}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="check-box-container">
            <input
              type="checkbox"
              className="input-element"
              id="checkbox"
              checked={isChecked}
              onChange={this.onChecked}
            />
            <label className="label" htmlFor="checkbox">
              Show Passwords
            </label>
          </div>
          {status ? (
            <ul className="password-items-container">
              {passwordList.map(eachItem => (
                <PasswordItem
                  key={eachItem.id}
                  passwordItem={eachItem}
                  colorHexCodes={colorHexCodes}
                  isChecked={isChecked}
                  deletePassword={this.deletePassword}
                />
              ))}
            </ul>
          ) : (
            <div className="no-password-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-password-img"
              />
              <p className="no-password-heading">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
