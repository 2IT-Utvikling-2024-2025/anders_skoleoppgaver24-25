import random
import time
import os
import keyboard




shapes = [
    [[1, 1, 1, 1]],  
    [[1, 1], [1, 1]],  
    [[0, 1, 0], [1, 1, 1]],  
    [[1, 1, 0], [0, 1, 1]],  
    [[0, 1, 1], [1, 1, 0]],  
    [[1, 1, 1], [1, 0, 0]],  
    [[1, 1, 1], [0, 0, 1]],  
]



width, height = 10, 20
game_board = [[0 for _ in range(width)] for _ in range(height)]


def rotate(shape):
    return [list(row) for row in zip(*shape[::1])]

def valid_move(shape, offset):
    off_x, off_y = offset
    for y, row in enumerate(shape):
        for x, cell in enumerate(row):
            if cell and (x + off_x < 0 or x + off_x >= width or y + off_y >= height or game_board[y + off_y][x + off_x]):
                return False
    return True

def place_shape(shape, offset):
    off_x, off_y = offset
    for y, row in enumerate(shape):
        for x, cell in enumerate(row):
            if cell:
                game_board[y + off_y][x + off_x] = 1

def clear_lines():
    global game_board
    game_board = [row for row in game_board if any(cell == 0 for cell in row)]
    while len(game_board) < height:
        game_board.insert(0, [0 for _ in range(width)])

def display_board(shape=None, offset=(0, 0)):
    os.system('cls' if os.name == 'nt' else 'clear')
    temp_board = [row[:] for row in game_board]
    if shape:
        off_x, off_y = offset
        for y, row in enumerate(shape):
            for x, cell in enumerate(row):
                if cell:
                    temp_board[y + off_y][x + off_x] = 1
    print("\n".join([" ".join(["#" if cell else "  " for cell in row]) for row in temp_board]))

def game_over():
    os.system('cls' if os.name == 'nt' else 'clear')
    exit()


def tetris():
    current_shape = random.choice(shapes)
    shape_offset = [width // 2 - len(current_shape[0]) // 2, 0]
    while True:
        time.sleep(0.1)
        display_board(current_shape, shape_offset)

        if keyboard.is_pressed('left') and valid_move(current_shape, (shape_offset[0] - 1, shape_offset[1])):
            shape_offset[0] -= 1
        if keyboard.is_pressed('right') and valid_move(current_shape, (shape_offset[0] + 1, shape_offset[1])):
            shape_offset[0] += 1
        if keyboard.is_pressed('down') and valid_move(current_shape, (shape_offset[0], shape_offset[1] + 1)):
            shape_offset[1] += 1
        if keyboard.is_pressed('up'):
            rotated_shape = rotate(current_shape)
            if valid_move(rotated_shape, shape_offset):
                current_shape = rotated_shape
        
        if not valid_move(current_shape, (shape_offset[0], shape_offset[1] + 1)):
            place_shape(current_shape, shape_offset)
            clear_lines()
            current_shape = random.choice(shapes)
            shape_offset = [width // 2 - len(current_shape[0]) // 2, 0]
            if not valid_move(current_shape, shape_offset):
                game_over()

        shape_offset[1] += 1





tetris()
