class Movie {
  get MovieID() {
    return this.movieID;
  }
  set MovieID(id) {
    this.movieID = id;
  }

  get MovieTitle() {
    return this.movieTitle;
  }
  set MovieTitle(title) {
    this.movieTitle = title;
  }

  // toString() print out user information in easy to read format
  toString() {
    const output = {
      MovieID: this.movieID,
      MovieTitle: this.movieTitle,
    };

    return JSON.stringify(output, null, 2);
  }
}

module.exports = Movie;