// Authenticator responsibility: to verify login attempts
// Authenticator dependency: a userService that can get user's actual login details

export default class Authenticator {
  constructor(userService) {
    this._userService = userService;
  }

  async verifyLogin(loginAttempt) {
    this._userService.getUserLoginDetails(loginAttempt.username);
    return false;
  }
}
