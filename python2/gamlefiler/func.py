import numpy as np
import random
import time

def codelock():
    correct_password = 6273
    a = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]], dtype="int32")
    print(a)

    user_password = int(input("Type password: "))
    
    if user_password == correct_password:
        print("Correct")
    else:
        print("Incorrect")

    print(a.size)

def codelock2():
    passoword = 19733782
    x = np.array([[1,2,3,4,5,6,7,8,9,],[9,8,7,6,5,4,3,2,1]])
    print(x)
    


codelock()
codelock2()
