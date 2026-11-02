"""Exercise the restored page with Python Playwright and Chromium.

Usage: python3 tests/browser-smoke.py [static-directory] [screenshot-directory]
"""

import functools
import http.server
import json
import pathlib
import sys
import threading

from playwright.sync_api import sync_playwright

root = pathlib.Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else pathlib.Path(__file__).resolve().parents[1] / "dist"
artifacts = pathlib.Path(sys.argv[2]).resolve() if len(sys.argv) > 2 else None
if artifacts:
    artifacts.mkdir(parents=True, exist_ok=True)


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *_):
        pass


server = http.server.ThreadingHTTPServer(
    ("127.0.0.1", 0), functools.partial(QuietHandler, directory=str(root))
)
threading.Thread(target=server.serve_forever, daemon=True).start()
base = f"http://127.0.0.1:{server.server_port}"
try:
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for name, viewport in [
            ("desktop", {"width": 1440, "height": 1000}),
            ("mobile", {"width": 390, "height": 844}),
        ]:
            page = browser.new_page(viewport=viewport)
            errors = []
            failed_responses = []
            external_requests = []
            page.on("pageerror", lambda error: errors.append(str(error)))
            page.on("response", lambda r: failed_responses.append(r.url) if r.status >= 400 else None)
            page.on("request", lambda r: external_requests.append(r.url) if not r.url.startswith(base + "/") else None)
            page.goto(base + "/", wait_until="networkidle")
            hero = page.locator(".section-hero h1")
            assert hero.inner_text().strip() == "Write, deploy, and scale apps on IPFS", hero.inner_text()
            assert page.locator(".section-hero .cta-signup").count() == 0
            assert page.locator(".section-features .learn a").get_attribute("href") == "https://docs.textile.io/"
            assert page.locator("#shell").is_visible()
            page.locator('div.menu a[href="#swift"]').click()
            assert page.locator("#swift").is_visible()
            assert not page.locator("#shell").is_visible()
            page.locator('div.menu a[href="#shell"]').click()
            assert page.locator("#shell").is_visible()
            assert not page.locator("#swift").is_visible()
            page.evaluate("document.fonts.ready")
            assert page.evaluate("document.fonts.check('20px Biotif-Regular')")
            widths = page.evaluate("({page: document.documentElement.scrollWidth, viewport: window.innerWidth})")
            assert widths["page"] <= widths["viewport"], widths
            assert not errors, errors
            assert not failed_responses, failed_responses
            assert not external_requests, external_requests
            assert page.url == base + "/", page.url
            if artifacts:
                page.screenshot(path=str(artifacts / f"{name}.png"), full_page=True)
            print(json.dumps({"viewport": name, "hero": hero.inner_text().strip(), "code_tabs": "passed", "page_errors": errors, "missing_assets": failed_responses, "external_requests": external_requests}), flush=True)
            page.close()
        browser.close()
finally:
    server.shutdown()
