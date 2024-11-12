import selenium
from selenium import webdriver
import time

driver = webdriver.Chrome()

driver.get("http://localhost:5174/")
time.sleep(5)



driver.quit()
