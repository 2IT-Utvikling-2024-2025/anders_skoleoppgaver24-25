import pygame
import random


pygame.init()


SCREEN_WIDTH, SCREEN_HEIGHT = 800, 400
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GROUND_LEVEL = SCREEN_HEIGHT - 80
GRAVITY = 0.8


screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Slimejumper 84")
clock = pygame.time.Clock()


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
        self.image = pygame.Surface((20, 40))
        self.image.fill((200, 0, 0))  
        self.rect = self.image.get_rect()
        self.rect.x = SCREEN_WIDTH
        self.rect.y = GROUND_LEVEL - self.rect.height

    def update(self):
        self.rect.x -= 5
        if self.rect.x < -self.rect.width:
            self.rect.x = SCREEN_WIDTH
            self.rect.y = GROUND_LEVEL - self.rect.height

    def draw(self, screen):
        screen.blit(self.image, self.rect)


def main():
    dinosaur = Dinosaur()
    obstacles = [Obstacle()]
    running = True

    while running:
        screen.fill(WHITE)

        
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    dinosaur.jump()

        
        dinosaur.update()
        for obstacle in obstacles:
            obstacle.update()

            
            if dinosaur.rect.colliderect(obstacle.rect):
                print("Game Over!")
                running = False

        
        dinosaur.draw(screen)
        for obstacle in obstacles:
            obstacle.draw(screen)

        
        pygame.display.flip()
        clock.tick(60)

    pygame.quit()
    main()
