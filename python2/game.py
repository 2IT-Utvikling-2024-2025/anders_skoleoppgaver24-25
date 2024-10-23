import pygame
import sys
import random

pygame.init()

WIDTH = 800
HEIGHT = 600
SPEED = 8

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('Slange')

snake = [(200, 200), (220, 200), (240, 200)] 
food = [(random.randrange(0, WIDTH, 20), random.randrange(0, HEIGHT, 20)) for _ in range(5)]  
direction = (20, 0)
score = 0

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_w and direction != (0, 20):  
                direction = (0, -20)
            elif event.key == pygame.K_s and direction != (0, -20):
                direction = (0, 20)
            elif event.key == pygame.K_a and direction != (20, 0):
                direction = (-20, 0)
            elif event.key == pygame.K_d and direction != (-20, 0):
                direction = (20, 0)

    head = snake[0]
    new_head = (head[0] + direction[0], head[1] + direction[1])
    snake.insert(0, new_head)

    if snake[0][0] < 0 or snake[0][0] >= WIDTH or snake[0][1] < 0 or snake[0][1] >= HEIGHT:
        pygame.quit()
        

    if snake[0] in food:
        score += 1
        food.remove(snake[0])
        food.append((random.randrange(0, WIDTH, 20), random.randrange(0, HEIGHT, 20)))
    else:
        snake.pop()

    screen.fill((0, 0, 0))
    for pos in snake:
        pygame.draw.rect(screen, (255, 255, 255), (pos[0], pos[1], 20, 20))
    for pos in food:
        pygame.draw.rect(screen, (255, 0, 0), (pos[0], pos[1], 20, 20))

    font = pygame.font.Font(None, 36)
    text = font.render('Score: ' + str(score), 1, (255, 255, 255))
    screen.blit(text, (10, 10))

    pygame.display.flip()
    pygame.time.delay(1000 // SPEED)

    
