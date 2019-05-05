// Authenticator responsibility: to verify login attempts
// Authenticator dependency: a userService that can get user's actual login details

export default class Authenticator {
  constructor(userService) {
    this._userService = userService;
  }

  async verifyLogin(loginAttempt) {
    const userCredentials = await this._userService.getUserCredentials(loginAttempt.username);
    if (userCredentials.password === loginAttempt.password) {
      return true;
    }
    return false;
  }
}
