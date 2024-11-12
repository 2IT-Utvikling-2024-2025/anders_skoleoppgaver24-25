from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Chrome()

form_url = 'https://docs.google.com/forms/d/e/1FAIpQLSfmLHWNU9oxd6i52_9H9RqTalI3RfvKod9jmNTkdnMpuMEVDw/viewform?usp=sf_link'

for _ in range(10):
    driver.get(form_url)
    time.sleep(1)
    
    name_field = driver.find_element(By.XPATH, '//input[@type="text"]')
    name_field.send_keys("D")
    
    gender_option = driver.find_element(By.XPATH, '//span[text()="Male"]')
    gender_option.click()
    
    email_field = driver.find_element(By.XPATH, '//input[@type="email"]')
    email_field.send_keys("fiskeburger@example.com")
    
    feedback_field = driver.find_element(By.XPATH, '//textarea')
    feedback_field.send_keys("S.")
    
    submit_button = driver.find_element(By.XPATH, '//span[text()="Submit"]/parent::div')
    submit_button.click()

driver.quit()
