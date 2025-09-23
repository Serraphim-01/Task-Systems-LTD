from playwright.sync_api import sync_playwright, TimeoutError

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    page.goto("http://localhost:3000")

    print("Waiting for video to load...")
    try:
        page.wait_for_selector("video[src='/videos/Innovative Disruption.mp4']", timeout=10000)
        print("Video loaded.")
    except TimeoutError:
        print("Video did not load in time. Taking a screenshot anyway.")

    page.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
