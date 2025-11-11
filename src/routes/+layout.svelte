<script>
  import "@fontsource-variable/inter";
  import "./styles.css";
</script>

<svelte:head>
  <link rel="icon" href="https://i.ibb.co/R31HPpj/favicon.png" />
  <meta property="og:description" content="Ma page privée" />

  <meta property="og:type" content="website" />

  <script type="text/javascript">
    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", "tgqcokz0tf");
  </script>

  <script src="https://swetrix.org/swetrix.js" defer></script>
  <script>
    document.addEventListener("DOMContentLoaded", function () {
      swetrix.init("Qvw13HdV7e2r");
      swetrix.trackViews();
    });
  </script>

  <noscript>
    <img
      src="https://backend.swetrix.com/log/noscript?pid=Qvw13HdV7e2r"
      alt=""
      referrerpolicy="no-referrer-when-downgrade"
    />
  </noscript>

  <script
    defer
    src="https://cloud.umami.is/script.js"
    data-website-id="2d205b0d-4571-4e82-91f9-b13125d6d8e9"
  ></script>
</svelte:head>

<div class="app">
  <main>
    <slot />
  </main>
</div>
