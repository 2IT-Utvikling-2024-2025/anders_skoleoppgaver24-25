import pygame
import random
import sys

pygame.init()


WIDTH, HEIGHT = 800, 600
WHITE = (255, 255, 255)
RED = (255, 0, 0)
BLUE = (0, 0, 255)
BLACK = (0, 0, 0)
clock = pygame.time.Clock()


screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('Tomatregn 3: Ketchupkongens hevn')

pygame.font.init()
font = pygame.font.Font(None, 74)  

class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((30, 30))
        self.image.fill(BLUE)
        self.rect = self.image.get_rect()
        self.rect.centerx = WIDTH // 2
        self.rect.bottom = HEIGHT - 10
        self.speed_x = 0

    def update(self):
        self.speed_x = 0
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:
            self.speed_x = -4.5
        if keys[pygame.K_RIGHT]:
            self.speed_x = 4.5

        self.rect.x += self.speed_x
        if self.rect.right > WIDTH:
            self.rect.right = WIDTH
        if self.rect.left < 0:
            self.rect.left = 0

class Enemy(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((15, 15))
        self.image.fill(RED)
        self.rect = self.image.get_rect()
        self.rect.x = random.randrange(WIDTH - self.rect.width)
        self.rect.y = random.randrange(-100, -40)
        self.speed_y = random.randrange(1, 12)

    def update(self):
        self.rect.y += self.speed_y
        if self.rect.top > HEIGHT + 10:
            self.rect.x = random.randrange(WIDTH - self.rect.width)
            self.rect.y = random.randrange(-100, -40)
            self.speed_y = random.randrange(1, 5)

def add_enemies(num):
    for _ in range(num):
        enemy = Enemy()
        all_sprites.add(enemy)
        enemies.add(enemy)


all_sprites = pygame.sprite.Group()
enemies = pygame.sprite.Group()
player = Player()
all_sprites.add(player)


initial_enemy_count = 2
add_enemies(initial_enemy_count)


running = True
score = 0
last_enemy_add_time = pygame.time.get_ticks()  
enemy_multiplier = 1  
show_message = False  
message_timer = 0  

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    all_sprites.update()

    
    hits = pygame.sprite.spritecollide(player, enemies, False)
    if hits:
        print("Ketchup!")
        running = False  

    
    current_time = pygame.time.get_ticks()
    if current_time - last_enemy_add_time > 5000:  
        enemy_multiplier *= 2 -1
        add_enemies(initial_enemy_count * enemy_multiplier)  
        last_enemy_add_time = current_time  
        show_message = True  
        message_timer = current_time  

    screen.fill(BLACK)
    all_sprites.draw(screen)

    
    if show_message:
        message_surface = font.render("Ketchupkongen er sinna!!!", True, WHITE)
        message_rect = message_surface.get_rect(center=(WIDTH // 2, HEIGHT // 2))
        screen.blit(message_surface, message_rect)

        
        if current_time - message_timer > 3000:  
            show_message = False  

    pygame.display.flip()
    clock.tick(200)

pygame.quit()
sys.exit()
