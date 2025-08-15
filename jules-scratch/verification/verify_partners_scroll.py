from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000")
        # Wait for the partners section to be visible
        partners_section = page.locator("section:has-text('Our Partners')")
        partners_section.wait_for(state='visible')
        partners_section.screenshot(path="jules-scratch/verification/partners_section.png")
        browser.close()

run()
