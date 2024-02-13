const alert = "❌🚪 ";

console.log(alert, "script injected");
bypass();

function bypass() {
  if (window.bypassed) {
    return;
  }

  waitForElm("#ContentWallHardsell").then((e) => {
    e.remove();
    window.onscroll = () => {};
    console.log(alert, "paywall bypassed");
  });

  waitForElm("#UserAlert").then((e) => {
    e.remove();
  });

  waitForElm("body", (e) => {
    return e.style.overflow == "hidden";
  }).then((e) => {
    e.style.overflow = "scroll";
  });

  window.bypassed = true;
}

function waitForElm(
  selector,
  condFunc = () => {
    return true;
  }
) {
  return new Promise((resolve) => {
    if (
      document.querySelector(selector) &&
      condFunc(document.querySelector(selector))
    ) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (
        document.querySelector(selector) &&
        condFunc(document.querySelector(selector))
      ) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
