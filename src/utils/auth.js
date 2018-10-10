const fakeAuth = {
  isAuthenticated: false,
  authenticate(email, password, cb) {
    // TODO: Do something with email and password
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

export default fakeAuth;