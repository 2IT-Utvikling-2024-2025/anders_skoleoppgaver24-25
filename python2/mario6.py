import pygame
import random

pygame.init()


SCREEN_WIDTH, SCREEN_HEIGHT = 800, 400
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GROUND_LEVEL = SCREEN_HEIGHT - 50
GRAVITY = 0.8

screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Mario 6: Total krig")
clock = pygame.time.Clock()
font = pygame.font.SysFont(None, 36)


class Player:
    def __init__(self):
        self.image = pygame.Surface((30, 40))
        self.image.fill((0, 0, 255))  
        self.rect = self.image.get_rect()
        self.rect.x = 100
        self.rect.y = GROUND_LEVEL - self.rect.height
        self.is_jumping = False
        self.jump_speed = -15
        self.y_velocity = 0
        self.x_velocity = 0

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

        
        self.rect.x += self.x_velocity

        
        if self.rect.x < 0:
            self.rect.x = 0
        elif self.rect.x > SCREEN_WIDTH - self.rect.width:
            self.rect.x = SCREEN_WIDTH - self.rect.width

    def draw(self, screen):
        screen.blit(self.image, self.rect)


class Platform:
    def __init__(self, x, y, width=100, height=10):
        self.image = pygame.Surface((width, height))
        self.image.fill((139, 69, 19))  
        self.rect = self.image.get_rect()
        self.rect.x = x
        self.rect.y = y

    def draw(self, screen):
        screen.blit(self.image, self.rect)


class Obstacle:
    def __init__(self):
        self.image = pygame.Surface((30, 30))
        self.image.fill((200, 0, 0))  
        self.rect = self.image.get_rect()
        self.rect.x = random.randint(SCREEN_WIDTH, SCREEN_WIDTH + 300)
        self.rect.y = GROUND_LEVEL - self.rect.height

    def update(self):
        self.rect.x -= 5
        if self.rect.x < -self.rect.width:
            self.rect.x = SCREEN_WIDTH + random.randint(100, 300)
            self.rect.y = GROUND_LEVEL - self.rect.height

    def draw(self, screen):
        screen.blit(self.image, self.rect)


def draw_background():
    screen.fill((135, 206, 235))  
    pygame.draw.rect(screen, (34, 139, 34), (0, GROUND_LEVEL, SCREEN_WIDTH, SCREEN_HEIGHT - GROUND_LEVEL))  


def main():
    player = Player()
    pygame.quit()

main()
