const movieUsecase = require("./movie");

const movieRepo = {
    Get: () => {
      return {

      };
    },
};


test("should success ViewMovieDetail", async () => {

    const movie = {
        movie_id: 1
    }
    const movieRepo = {
        Get: () => {
          return movie;
        },
    };
    const MovieUseCase = new movieUsecase(movieRepo);
    const result = await MovieUseCase.ViewMovieDetail({id: 1});
    expect(result).toEqual(movie);
});