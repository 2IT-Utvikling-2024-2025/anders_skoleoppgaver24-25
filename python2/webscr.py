from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()

try:
    driver.get("https://www.vg.no/")
    search_icon = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, "button[data-testid='search-button']"))
    )
    search_icon.click()
    search_box = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.NAME, "query"))
    )
    search_box.send_keys("VG")
    search_box.send_keys(Keys.RETURN)
    WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CLASS_NAME, "article-content")))
    results = driver.find_elements(By.CLASS_NAME, "article-content")
    for index, result in enumerate(results):
        title = result.find_element(By.TAG_NAME, "h3").text
        print(f"Result {index + 1}: {title}")
    page_source = driver.page_source
    print("\nPage Source:")
    print(page_source[:1000])

finally:
    driver.quit()
