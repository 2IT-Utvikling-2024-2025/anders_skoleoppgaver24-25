import time


def countdown():
    start_time = time.time()
    time.sleep(5)
    end_time = time.time()
    elapsed_time = end_time - start_time
    print(int(elapsed_time))

countdown()