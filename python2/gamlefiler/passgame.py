import numpy as np
import random
import time

def codelock_game():

    correct_password = random.randint(1000, 9999)  
    a = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]], dtype="int32")
    print("Number layout:")
    print(a)

    attempts = 10 
    print(f"\nGuess the 4-digit password. You have {attempts} attempts.")

    for i in range(attempts):
        try:
            user_password = int(input(f"Attempt {i + 1}: Type your guess: "))
        except ValueError:
            print("Invalid input. Please enter a 4-digit number.")
            continue

        if user_password == correct_password:
            print("Correct! You've unlocked the code!")
            break
        elif user_password < correct_password:
            print("Incorrect! The correct password is higher.")
        else:
            print("Incorrect! The correct password is lower.")
        
        print(f"Attempts remaining: {attempts - i - 1}\n")

        if i == attempts - 1:
            print(f"\nGame over! The correct password was {correct_password}.")

def codelock_game2():
    correct_password = random.randint(10000, 99999)
    for i in range(10):
        user_password = int(input("Type password: "))
        if user_password == correct_password:
            print("Correct")
            break
        else:
            print("Incorrect")
            if i == 9:
                print(f"\nGame over! The correct password was {correct_password}.")
    

codelock_game()

