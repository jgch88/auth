// User Service responsibility: to communicate with User Repository

export default class UserService {
  constructor(userRepository) {
    this._userRepository = userRepository;
  }

  async getUserLoginDetails(userName) {
    // extract only the necessary parts of the user object (may have other columns in db)
    // Law of Demeter "contract"
    const { username, password } = await this._userRepository.getUser(userName);
    return { username, password };
  }
}
