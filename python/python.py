import time

input("Press any key to continue...")
print("start")


for i in range(10):
    if i % 2:
        continue
    time.sleep(1)
    print(i)





print("end")

