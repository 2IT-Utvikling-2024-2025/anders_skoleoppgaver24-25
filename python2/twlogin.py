from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time


username = "Neinei"
password = "Neinei"


driver = webdriver.Chrome()  


driver.get("https://x.com/login")
time.sleep(2)  


username_input = driver.find_element(By.NAME, "text")
username_input.send_keys(username)
username_input.send_keys(Keys.RETURN)
time.sleep(2)  

password_input = driver.find_element(By.NAME, "password")
password_input.send_keys(password)
password_input.send_keys(Keys.RETURN)
time.sleep(3)  


search_query = "W"  
driver.get(f"https://x.com/search?q={search_query}&src=typed_query")
time.sleep(3)


try:
    
    like_button = driver.find_element(By.XPATH, '//div[@data-testid="like"]')
    like_button.click()
    print("Det funket!")
except Exception as e:
    print("Feil:", e)


time.sleep(2)
driver.quit()
