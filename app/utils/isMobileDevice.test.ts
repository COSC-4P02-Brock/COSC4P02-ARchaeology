/* eslint-disable no-global-assign */

import { isMobileDevice } from "./isMobileDevice";

describe("isMobileDevice", () => {
  let originalNavigator: Navigator = navigator;

  afterEach(() => {
    navigator = originalNavigator;
  });

  test("should return true if the user agent is a phone", () => {
    navigator = {
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1",
    } as Navigator;

    expect(isMobileDevice()).toEqual(true);
  });

  test("should return false if the user agent is a desktop", () => {
    navigator = {
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
    } as Navigator;

    expect(isMobileDevice()).toEqual(false);
  });
});
