import pygame
import random
import sys


pygame.init()


WIDTH, HEIGHT = 500, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Tomato catcher 3")


LIGHT_BLUE = (173, 216, 230)
BLUE = (0, 0, 255)
RED = (255, 0, 0)
WHITE = (255, 255, 255)


bucket_width, bucket_height = 50, 20
bucket_x = WIDTH // 2 - bucket_width // 2
bucket_y = HEIGHT - bucket_height - 10
bucket_speed = 20


ball_radius = 10
ball_speed = 5
ball_spawn_time = 2000  


score = 0
game_over = False
balls = []
font = pygame.font.Font(None, 36)


ball_timer = pygame.USEREVENT + 1
pygame.time.set_timer(ball_timer, ball_spawn_time)


def create_ball():
    x = random.randint(ball_radius, WIDTH - ball_radius)
    y = -ball_radius
    return pygame.Rect(x, y, ball_radius * 2, ball_radius * 2)

def draw_game():
    screen.fill(LIGHT_BLUE)
    pygame.draw.rect(screen, BLUE, bucket)
    for ball in balls:
        pygame.draw.ellipse(screen, RED, ball)
    score_text = font.render(f"Score: {score}", True, WHITE)
    screen.blit(score_text, (WIDTH - 150, 10))
    if game_over:
        game_over_text = font.render("Game Over", True, RED)
        screen.blit(game_over_text, (WIDTH // 2 - 80, HEIGHT // 2))
    pygame.display.flip()


bucket = pygame.Rect(bucket_x, bucket_y, bucket_width, bucket_height)


clock = pygame.time.Clock()
while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
        elif event.type == ball_timer and not game_over:
            balls.append(create_ball())
    
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT] and bucket.left > 0:
        bucket.x -= bucket_speed
    if keys[pygame.K_RIGHT] and bucket.right < WIDTH:
        bucket.x += bucket_speed

    if not game_over:
        for ball in balls[:]:
            ball.y += ball_speed
            if ball.colliderect(bucket):
                score += 1
                balls.remove(ball)
            elif ball.y > HEIGHT:
                game_over = True
                break

    draw_game()
    clock.tick(30)
