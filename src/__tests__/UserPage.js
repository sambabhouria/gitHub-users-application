import "@testing-library/jest-dom/extend-expect";
import { waitFor } from "@testing-library/react";
import mockAxios from "axios";

import userData from "../__mocks__/userData.json";
import repos from "../__mocks__/repos.json";
import events from "../__mocks__/events.json";

import { UserPage } from "../features/user/UserPage";
import { renderWithRouterMatchAndRedux } from "../test-utils";

beforeEach(() => {
  window.scrollTo = () => null;
});

describe("UserPage", () => {
  it("UserListPage shows renders profile, repos, events", async () => {
    mockAxios.get.mockImplementation((url) => {
      switch (url) {
        case "/mojombo":
          return Promise.resolve({ data: userData });
        case "/mojombo/repos?page=0&per_page=20&sort=created":
          return Promise.resolve({ data: repos });
        case "/mojombo/events/public?page=0&per_page=100":
          return Promise.resolve({ data: events });
        default:
          return Promise.reject({ error: "No url" });
      }
    });

    const { container, getByText, getByTestId } = renderWithRouterMatchAndRedux(
      UserPage,
      {
        route: "/user/mojombo",
        path: "/user/:login",
      }
    );

    await waitFor(() => {
      expect(getByText("Tom Preston-Werner")).toBeInTheDocument();
      expect(getByTestId("repoCnt")).toHaveTextContent("61");
      expect(getByTestId("events").childNodes[0].childNodes.length).toBe(2);
      expect;
    });
  });
});
