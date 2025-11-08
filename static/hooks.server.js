/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const url = event.url;
  const userAgent = event.request.headers.get("user-agent") || "";

  const inAppBrowserPatterns = [
    "FB_IAB",
    "FBAN",
    "FBAV",
    "Instagram",
    "Twitter",
    "TwitterAndroid",
    "Line/",
    "KAKAOTALK",
    "NAVER",
    "WhatsApp",
    "WeChat",
    "MicroMessenger",
    "QQ/",
    "Snapchat",
    "Pinterest",
    "LinkedInApp",
  ];

  const isInApp = inAppBrowserPatterns.some((pattern) =>
    userAgent.includes(pattern),
  );
  const isIOS = /iPhone|iPad|iPod/.test(userAgent);

  const extractIOSVersion = (userAgent) => {
    const match = userAgent.match(/iPhone OS (\d+)_(\d+)/);
    if (match) {
      return parseFloat(`${match[1]}.${match[2]}`);
    }
    return null;
  };

  const iosVersion = isIOS ? extractIOSVersion(userAgent) : null;
  if (isInApp && isIOS) {
    let redirectUrl = url.origin + url.pathname;

    // Determine which Safari scheme to use based on iOS version
    let safariScheme;

    if (iosVersion >= 15 && iosVersion !== 16) {
      // iOS 15, 17, 18+ use x-safari-
      safariScheme = `x-safari-${redirectUrl}`;
    } else {
      // iOS 16 and below use com-apple-mobilesafari-tab:
      safariScheme = `com-apple-mobilesafari-tab:${redirectUrl}`;
    }

    return new Response("Redirecting...", {
      status: 302,
      headers: {
        Location: safariScheme,
      },
    });
  }

  // Default case: resolve the request normally
  return await resolve(event);
}
