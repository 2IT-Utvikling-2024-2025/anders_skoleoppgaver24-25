import numpy as np
import matplotlib.pyplot as plt

# Constants
G = 6.67430e-11  # Gravitational constant (m^3 kg^-1 s^-2)
M_sun = 1.989e30  # Mass of the Sun (kg)
M_earth = 5.972e24  # Mass of Earth (kg)
AU = 1.496e11  # 1 Astronomical Unit (m)
R_earth = 6.3781e6  # Earth's radius (m)
year_in_seconds = 365.25 * 24 * 3600  # Seconds in one year
dt = 60 * 60 


def calculate_orbit(initial_position, initial_velocity, mass_object, num_steps):
    """
    Simulates the orbit of an object around the Sun.
    """
    r = np.array(initial_position, dtype=np.float64)
    v = np.array(initial_velocity, dtype=np.float64)

    # Array to store positions of the object
    positions = np.zeros((num_steps, 2))

    for i in range(num_steps):
        r_magnitude = np.linalg.norm(r)
        force_magnitude = G * M_sun * mass_object / r_magnitude**2
        force_direction = -r / r_magnitude
        force = force_magnitude * force_direction

        acceleration = force / mass_object
        v += acceleration * dt
        r += v * dt

        positions[i] = r

    return positions


def check_collision(earth_positions, asteroid_positions):
    """
    Checks for a potential collision between Earth and an asteroid.
    Returns the step where the collision happens, or None if no collision occurs.
    """
    for i in range(len(earth_positions)):
        distance = np.linalg.norm(earth_positions[i] - asteroid_positions[i])
        if distance < R_earth:  
            return i  
    return None  


def plot_orbits(earth_positions, asteroid_positions, collision_step=None):
    """
    Plots the orbits of Earth and an asteroid, highlighting any collision.
    """
    plt.figure(figsize=(8, 8))
    
    
    plt.plot(earth_positions[:, 0], earth_positions[:, 1], label="Earth's Orbit")
    
    
    plt.plot(asteroid_positions[:, 0], asteroid_positions[:, 1], label="Asteroid's Orbit", color='red')
    
    
    plt.scatter(0, 0, color='yellow', label='Sun')
    
    
    if collision_step is not None:
        plt.scatter(earth_positions[collision_step, 0], earth_positions[collision_step, 1], 
                    color='green', label='Collision Point', zorder=5)
    
    plt.xlabel('x position (m)')
    plt.ylabel('y position (m)')
    plt.title("Orbit Simulation with Asteroid")
    plt.gca().set_aspect('equal', adjustable='box')
    plt.legend()
    plt.grid(True)
    plt.show()



num_steps = int(year_in_seconds / dt)  


earth_initial_position = [AU, 0]
earth_initial_velocity = [0, 29780]  

# Asteroid's initial conditions
asteroid_initial_position = [AU + 1e10, 0]  
asteroid_initial_velocity = [0, 28000]  

# Calculate orbits
earth_positions = calculate_orbit(earth_initial_position, earth_initial_velocity, M_earth, num_steps)
asteroid_positions = calculate_orbit(asteroid_initial_position, asteroid_initial_velocity, 1000, num_steps)  

# Check for collision
collision_step = check_collision(earth_positions, asteroid_positions)

# Plot orbits and collision point (if any)
plot_orbits(earth_positions, asteroid_positions, collision_step)

# Print collision information
if collision_step is not None:
    collision_time = collision_step * dt / (24 * 3600)  # Convert time to days
    print(f"Collision detected at step {collision_step}, which corresponds to {collision_time:.2f} days.")
else:
    print("No collision detected.")
