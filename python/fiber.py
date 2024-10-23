def fibo(i):
    sequence = []
    while len(sequence) < i:
        if len(sequence) == 0:
            sequence.append(0)
            sequence.append(1)
        sequence.append(sequence[-1] + sequence[-2])
    return sequence


print(fibo(14300))
