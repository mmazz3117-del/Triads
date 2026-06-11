#!/usr/bin/env node
/* Pentatonic Triads — build script
   Regenerates the production index.html from index.dev.html:
     1. compiles the JSX block with Babel (preset-react)
     2. minifies it with terser
     3. strips babel-standalone (not needed in production)
     4. adds the service-worker registration
   Usage:
     npm i --no-save @babel/core @babel/preset-react terser
     node build.js
*/
const fs = require("fs");
const babel = require("@babel/core");
const { minify } = require("terser");

(async () => {
  let src = fs.readFileSync("index.dev.html", "utf8");

  // 1. strip the dev banner comment
  src = src.replace(/<!--[\s\S]*?-->\s*<!DOCTYPE html>/, "<!DOCTYPE html>");

  // 2. compile + minify the JSX block
  const m = src.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);
  if (!m) throw new Error("No text/babel block found in index.dev.html");
  const compiled = babel.transformSync(m[1], {
    presets: [["@babel/preset-react", { runtime: "classic" }]],
    compact: false,
  }).code;
  const min = (await minify(compiled, { compress: true, mangle: true })).code;
  if (min.includes("</script")) throw new Error("script terminator in bundle");

  const bundleTag =
    "<script>\n" +
    "/* Precompiled application bundle (source of truth: index.dev.html).\n" +
    "   Built with build.js — do not edit by hand. */\n" +
    min +
    "\n</script>";
  src = src.slice(0, m.index) + bundleTag + src.slice(m.index + m[0].length);

  // 3. remove babel-standalone
  src = src.replace(
    /<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/babel-standalone[^"]*"><\/script>\n?/,
    ""
  );

  // 4. service-worker registration (production only)
  const swReg = `<script>
/* PWA: register the service worker (offline support + installable app). */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("./sw.js").catch(function () {});
  });
}
</script>

</body>`;
  src = src.replace("</body>", swReg);

  fs.writeFileSync("index.html", src);
  console.log("✓ built index.html (" + src.length + " bytes, bundle " + min.length + " bytes)");
})();
