from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import time

service = Service('/path/to/chromedriver')
driver = webdriver.Chrome(service=service)

start_time = time.time()
driver.get('https://www.apple.com')
load_time = time.time() - start_time

print(f"Page load time: {load_time} seconds")

driver.quit()
