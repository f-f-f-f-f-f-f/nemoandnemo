const input = document.querySelector("input#url-input");
const msg = document.querySelector("div#msg");
input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const url = input.value;
        const win = window.open("about:blank", "_blank");
        if (!win) {
            msg.style.color = "red";
            msg.textContent = "Something went wrong.";
            return;
        }
        win.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              * { box-sizing: border-box; }
              iframe { height: 100vh; width: 100vw; }
            </style>
          </head>
          <body>
            <iframe></iframe>
            <script>
              const iframe = document.querySelector('iframe');
              iframe.src = \`${url.replace(/`/g, "\\`")}\`;
            </script>
          </body>
        </html>
    `);
        // GoGuardian redirects the ENTIRE parent page if it detects a blocked iframe
        try {
            if (window.location.href.includes(`blocked.goguardian.com`)) {
                msg.style.color = "red";
                msg.textContent = `It might be blocked, check the new tab`;
            }
            else {
                msg.style.color = "lawngreen";
                msg.textContent = `It's unblocked! (It might say it failed to load, but if it doesan't say blocked by GoGuardian it's fine)`;
            }
        }
        catch {
            // Since its now pointing to a different origin it might throw an error
            msg.style.color = "red";
            msg.textContent = `It might be blocked, check the new tab`;
        }
    }
});
export {};
//# sourceMappingURL=main.js.map