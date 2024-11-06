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
    def __init__(self, x, y, width=100, height=10, moving=False):
        self.image = pygame.Surface((width, height))
        self.image.fill((139, 69, 19))  
        self.rect = self.image.get_rect()
        self.rect.x = x
        self.rect.y = y
        self.moving = moving
        self.direction = 1

    def update(self):
        if self.moving:
            self.rect.y += self.direction
            if self.rect.y < GROUND_LEVEL - 150 or self.rect.y > GROUND_LEVEL - 50:
                self.direction *= -1

    def draw(self, screen):
        screen.blit(self.image, self.rect)


class Obstacle:
    def __init__(self, speed=5):
        self.image = pygame.Surface((30, 30))
        self.image.fill((200, 0, 0)) 
        self.rect = self.image.get_rect()
        self.rect.x = random.randint(SCREEN_WIDTH, SCREEN_WIDTH + 300)
        self.rect.y = GROUND_LEVEL - self.rect.height
        self.speed = speed

    def update(self):
        self.rect.x -= self.speed
        if self.rect.x < -self.rect.width:
            self.rect.x = SCREEN_WIDTH + random.randint(100, 300)
            self.rect.y = GROUND_LEVEL - self.rect.height
            self.speed += 0.1  

    def draw(self, screen):
        screen.blit(self.image, self.rect)


class Enemy:
    def __init__(self, platform):
        self.image = pygame.Surface((20, 20))
        self.image.fill((255, 0, 0)) 
        self.rect = self.image.get_rect()
        self.rect.x = platform.rect.x + random.randint(0, platform.rect.width - self.rect.width)
        self.rect.y = platform.rect.y - self.rect.height
        self.speed = 2
        self.direction = 1

    def update(self):
        self.rect.x += self.direction * self.speed
        if self.rect.right >= SCREEN_WIDTH or self.rect.left <= 0:
            self.direction *= -1

    def draw(self, screen):
        screen.blit(self.image, self.rect)


class PowerUp:
    def __init__(self):
        self.image = pygame.Surface((15, 15))
        self.image.fill((255, 215, 0))  
        self.rect = self.image.get_rect()
        self.rect.x = random.randint(100, SCREEN_WIDTH - 100)
        self.rect.y = random.randint(50, GROUND_LEVEL - 100)

    def draw(self, screen):
        screen.blit(self.image, self.rect)


def draw_background():
    screen.fill((135, 206, 235))  
    pygame.draw.rect(screen, (34, 139, 34), (0, GROUND_LEVEL, SCREEN_WIDTH, SCREEN_HEIGHT - GROUND_LEVEL))  


def main():
    player = Player()
    platforms = [Platform(200, GROUND_LEVEL - 100, 100, 10, moving=True), Platform(400, GROUND_LEVEL - 150, 120, 10)]
    obstacles = [Obstacle() for _ in range(2)]
    enemies = [Enemy(platforms[1])]
    power_ups = [PowerUp()]
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
                    player.jump()
                elif event.key == pygame.K_r and game_over:
                    main()
                elif event.key == pygame.K_RIGHT:
                    player.x_velocity = 5
                elif event.key == pygame.K_LEFT:
                    player.x_velocity = -5
            elif event.type == pygame.KEYUP:
                if event.key in (pygame.K_RIGHT, pygame.K_LEFT):
                    player.x_velocity = 0

        if not game_over:
            player.update()

            for platform in platforms:
                platform.update()
                if player.rect.colliderect(platform.rect) and player.y_velocity >= 0:
                    player.rect.y = platform.rect.y - player.rect.height
                    player.is_jumping = False
                    player.y_velocity = 0

            for obstacle in obstacles:
                obstacle.update()
                if player.rect.colliderect(obstacle.rect):
                    game_over = True

            for enemy in enemies:
                enemy.update()
                if player.rect.colliderect(enemy.rect):
                    game_over = True

            for power_up in power_ups[:]:
                if player.rect.colliderect(power_up.rect):
                    power_ups.remove(power_up)
                    score += 100  
            score += 1  

        player.draw(screen)
        for platform in platforms:
            platform.draw(screen)
        for obstacle in obstacles:
            obstacle.draw(screen)
        for enemy in enemies:
            enemy.draw(screen)
        for power_up in power_ups:
            power_up.draw(screen)

        if game_over:
            game_over_text = font.render("L! Press R to Restart", True, BLACK)
            screen.blit(game_over_text, (SCREEN_WIDTH // 2 - game_over_text.get_width() // 2, SCREEN_HEIGHT // 2))
        else:
            score_text = font.render(f"Score: {score}", True, BLACK)
            screen.blit(score_text, (10, 10))

        pygame.display.flip()
        clock.tick(60)

    pygame.quit()

main()

