import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

# Constants
G = 6.67430e-11  # Gravitational constant (m^3 kg^-1 s^-2)
M_sun = 1.989e30  # Mass of the Sun (kg)
M_earth = 5.972e24  # Mass of Earth (kg)
AU = 1.496e11  # 1 Astronomical Unit (m)
R_earth = 6.3781e6  # Earth's radius (m)
year_in_seconds = 365.25 * 24 * 3600  # Seconds in one year
dt = 60 * 60  # Time step (1 hour)


def calculate_orbit(initial_position, initial_velocity, mass_object, num_steps):
    """
    Simulates the orbit of an object around the Sun.
    """
    r = np.array(initial_position, dtype=np.float64)
    v = np.array(initial_velocity, dtype=np.float64)

    positions = np.zeros((num_steps, 2))
    speeds = np.zeros(num_steps)

    for i in range(num_steps):
        r_magnitude = np.linalg.norm(r)
        force_magnitude = G * M_sun * mass_object / r_magnitude**2
        force_direction = -r / r_magnitude
        force = force_magnitude * force_direction

        acceleration = force / mass_object
        v += acceleration * dt
        r += v * dt

        positions[i] = r
        speeds[i] = np.linalg.norm(v)  # Calculate and store speed

    return positions, speeds


def check_collision(earth_positions, asteroid_positions):
    """
    Checks for a potential collision between Earth and an asteroid.
    """
    for i in range(len(earth_positions)):
        distance = np.linalg.norm(earth_positions[i] - asteroid_positions[i])
        if distance < R_earth:  # Collision if the distance is less than Earth's radius
            return i  # Collision step
    return None  # No collision


def update(frame, earth_positions, asteroid_positions, earth_dot, asteroid_dot, earth_text, asteroid_text, earth_speeds, asteroid_speeds):
    """
    Updates the positions and speed displays for each animation frame.
    """
    # Update the position of Earth and asteroid
    earth_dot.set_data(earth_positions[frame, 0], earth_positions[frame, 1])
    asteroid_dot.set_data(asteroid_positions[frame, 0], asteroid_positions[frame, 1])

    # Update speed text
    earth_text.set_text(f'Earth Speed: {earth_speeds[frame]:.2f} m/s')
    asteroid_text.set_text(f'Asteroid Speed: {asteroid_speeds[frame]:.2f} m/s')

    return earth_dot, asteroid_dot, earth_text, asteroid_text


def plot_orbits_with_animation(earth_positions, asteroid_positions, earth_speeds, asteroid_speeds, collision_step=None):
    """
    Plots and animates the orbits of Earth and the asteroid.
    """
    fig, ax = plt.subplots(figsize=(8, 8))

    # Plot the Sun at the center
    ax.scatter(0, 0, color='yellow', label='Sun')

    # Set limits for viewing
    ax.set_xlim(-2 * AU, 2 * AU)
    ax.set_ylim(-2 * AU, 2 * AU)

    # Set equal scaling for aspect ratio
    ax.set_aspect('equal', adjustable='box')

    # Initialize Earth and asteroid dots
    earth_dot, = ax.plot([], [], 'bo', label="Earth")  # Blue dot for Earth
    asteroid_dot, = ax.plot([], [], 'ro', label="Asteroid")  # Red dot for asteroid

    # Initialize text for displaying speed
    earth_text = ax.text(-1.8 * AU, 1.8 * AU, '', fontsize=12)
    asteroid_text = ax.text(-1.8 * AU, 1.6 * AU, '', fontsize=12)

    # Highlight collision point if detected
    if collision_step is not None:
        ax.scatter(earth_positions[collision_step, 0], earth_positions[collision_step, 1], 
                   color='green', label='Collision Point', zorder=5)

    # Set grid and legend
    ax.legend()
    ax.grid(True)

    # Animate the simulation using FuncAnimation
    anim = FuncAnimation(fig, update, frames=len(earth_positions), 
                         fargs=(earth_positions, asteroid_positions, earth_dot, asteroid_dot, earth_text, asteroid_text, earth_speeds, asteroid_speeds),
                         interval=30, blit=False)  # Set blit=False to avoid errors

    plt.show()


# Simulation settings
num_steps = int(year_in_seconds / dt)  # Simulate for one year

# Earth's initial conditions
earth_initial_position = [AU, 0]
earth_initial_velocity = [0, 29780]  # Earth's orbital velocity in m/s

# Asteroid's initial conditions
asteroid_initial_position = [AU + 1e10, 0]  # 10 million km further than Earth
asteroid_initial_velocity = [0, 28000]  # Slightly slower velocity than Earth

# Calculate orbits and speeds
earth_positions, earth_speeds = calculate_orbit(earth_initial_position, earth_initial_velocity, M_earth, num_steps)
asteroid_positions, asteroid_speeds = calculate_orbit(asteroid_initial_position, asteroid_initial_velocity, 1e12, num_steps)

# Check for collision
collision_step = check_collision(earth_positions, asteroid_positions)

# Plot orbits with dynamic animation and speed display
plot_orbits_with_animation(earth_positions, asteroid_positions, earth_speeds, asteroid_speeds, collision_step)

# Print collision information
if collision_step is not None:
    collision_time = collision_step * dt / (24 * 3600)  # Convert time to days
    print(f"Collision detected at step {collision_step}, which corresponds to {collision_time:.2f} days.")
else:
    print("No collision detected.")
