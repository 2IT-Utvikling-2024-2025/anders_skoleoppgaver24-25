import pygame
import sys

pygame.init()

# Screen dimensions
WIDTH, HEIGHT = 800, 600
BLOCK_SIZE = 40

# Colors
BACKGROUND_COLOR = (30, 30, 30)
BLOCK_COLOR = (200, 200, 200)

# Initialize the screen
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('Block Builder')

# Function to draw a block at a given position
def draw_block(x, y, color):
    pygame.draw.rect(screen, color, (x, y, BLOCK_SIZE, BLOCK_SIZE))

# Function to draw a grid of blocks
def draw_grid():
    for x in range(0, WIDTH, BLOCK_SIZE):
        for y in range(0, HEIGHT, BLOCK_SIZE):
            draw_block(x, y, BLOCK_COLOR)

# Function to draw a highlighted block under the mouse
def draw_highlighted_block(mouse_pos):
    x = (mouse_pos[0] // BLOCK_SIZE) * BLOCK_SIZE
    y = (mouse_pos[1] // BLOCK_SIZE) * BLOCK_SIZE
    draw_block(x, y, (255, 255, 255))

# Main loop
blocks = []
running = True
while running:
    screen.fill(BACKGROUND_COLOR)
    
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:  # Left mouse button
            x, y = event.pos
            x = (x // BLOCK_SIZE) * BLOCK_SIZE
            y = (y // BLOCK_SIZE) * BLOCK_SIZE
            if (x, y) not in blocks:
                blocks.append((x, y))

    # Draw all blocks
    draw_grid()
    for block in blocks:
        draw_block(*block, (100, 100, 100))

    # Draw highlighted block
    mouse_pos = pygame.mouse.get_pos()
    draw_highlighted_block(mouse_pos)

    pygame.display.flip()

pygame.quit()
sys.exit()

