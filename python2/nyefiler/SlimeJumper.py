#Oppdatert versjon med litt varier høyde på hindringer
#La også til busker og en nydelig himmel


import pygame
import random


pygame.init()


SCREEN_WIDTH, SCREEN_HEIGHT = 800, 400
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GROUND_LEVEL = SCREEN_HEIGHT - 80
GRAVITY = 0.8


screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Slimejumper Ultimate")
clock = pygame.time.Clock()
font = pygame.font.SysFont(None, 36)


class Dinosaur:
    def __init__(self):
        self.image = pygame.Surface((25, 25))
        self.image.fill((0, 100, 0))  
        self.rect = self.image.get_rect()
        self.rect.x = 50
        self.rect.y = GROUND_LEVEL - self.rect.height
        self.is_jumping = False
        self.jump_speed = -15
        self.y_velocity = 0

    def jump(self):
        if not self.is_jumping:
            self.is_jumping = True
            self.y_velocity = self.jump_speed

    def update(self):
        if self.is_jumping:
            self.y_velocity += GRAVITY
            self.rect.y += int(self.y_velocity)
            if self.rect.y >= GROUND_LEVEL - self.rect.height:
                self.rect.y = GROUND_LEVEL - self.rect.height
                self.is_jumping = False

    def draw(self, screen):
        screen.blit(self.image, self.rect)


class Obstacle:
    def __init__(self):
        self.image = pygame.Surface((random.randint(20, 40), random.randint(30, 50)))
        self.image.fill((200, 0, 0))  
        self.rect = self.image.get_rect()
        self.rect.x = SCREEN_WIDTH
        self.rect.y = GROUND_LEVEL - self.rect.height

    def update(self):
        self.rect.x -= 5
        if self.rect.x < -self.rect.width:
            self.rect.x = SCREEN_WIDTH + random.randint(200, 300)
            self.rect.y = GROUND_LEVEL - self.rect.height

    def draw(self, screen):
        screen.blit(self.image, self.rect)


def draw_background():
    screen.fill((135, 206, 235)) 
    pygame.draw.rect(screen, (34, 139, 34), (0, GROUND_LEVEL, SCREEN_WIDTH, SCREEN_HEIGHT - GROUND_LEVEL)) 


def main():
    dinosaur = Dinosaur()
    obstacles = [Obstacle() for _ in range(3)]
    score = 0
    running = True
    game_over = False

    while running:
        draw_background()

        
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE and not game_over:
                    dinosaur.jump()
                elif event.key == pygame.K_r and game_over:
                    main()

        
        if not game_over:
            dinosaur.update()
            for obstacle in obstacles:
                obstacle.update()

                
                if dinosaur.rect.colliderect(obstacle.rect):
                    game_over = True

            
            score += 1

        
        dinosaur.draw(screen)
        for obstacle in obstacles:
            obstacle.draw(screen)

        
        if game_over:
            game_over_text = font.render(", Ratata! L! Press R to Restart ", True, BLACK)
            screen.blit(game_over_text, (SCREEN_WIDTH // 2 - game_over_text.get_width() // 2, SCREEN_HEIGHT // 2))
        else:
            score_text = font.render(f"Score: {score}", True, BLACK)
            screen.blit(score_text, (10, 10))

        
        pygame.display.flip()
        clock.tick(60)

    pygame.quit()


main()
