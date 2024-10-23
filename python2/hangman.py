import random

def hangman_graphics():
    print(" +-----+")
    print(" |     |")
    print(" |     0")
    print(" |     |")
    print(" |     X")
    print(" |      ")
    print("/|      ")



def hangman():
    words = ["fisk", "diplomati", "katt", "hund", "mennesker"]
    letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    word_guess = random.choice(words).upper()
    guessed_letters = set()
    guesses = 0
    wrong_guesses = 6

    while guesses < wrong_guesses:
        display_word = ''.join(letter if letter in guessed_letters else '' for letter in word_guess)
        print(f"Word: {display_word}")

        if display_word == word_guess:
            print("Congrats!")
            break

        guess = input("Guess a letter: ").upper()

        if guess in guessed_letters:
            print("Already guessed")
        elif guess in word_guess:
            print("Good guess!!")
            guessed_letters.add(guess)
            break
        else:
            print("Wrong guess")
            guesses += 1
            print(f"You have {wrong_guesses - guesses} left")

        if guesses == wrong_guesses:
            print(f"No guesses left The word was: {word_guess}")





    


hangman_graphics()
hangman()

