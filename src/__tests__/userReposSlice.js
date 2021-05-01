import repos, {
  getReposStart,
  getReposSuccess,
  getReposFailure,
  initialState,
} from "../features/userRepos/userReposSlice";

describe("Repos reducer", () => {
  it("should handle initial state", () => {
    expect(repos(undefined, {})).toEqual(initialState);
  });

  it("should handle getReposStart", () => {
    expect(
      repos(initialState, {
        type: getReposStart.type,
        payload: {
          login: "abc",
          page: 1,
        },
      })
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it("should handle getReposSuccess", () => {
    expect(
      repos(initialState, {
        type: getReposSuccess.type,
        payload: {
          login: "abc",
          repos: [
            { id: 1, name: "Repo 1" },
            { id: 2, name: "Repo 2" },
          ],
        },
      })
    ).toEqual({
      ...initialState,
      reposByUser: {
        abc: [
          { id: 1, name: "Repo 1" },
          { id: 2, name: "Repo 2" },
        ],
      },
      loading: false,
      error: null,
    });
  });

  it("should handle getReposFailure", () => {
    expect(
      repos(initialState, {
        type: getReposFailure.type,
        payload: 'Error message',
      })
    ).toEqual({
      ...initialState,
      loading: false,
      error: 'Error message'
    });
  });

});
