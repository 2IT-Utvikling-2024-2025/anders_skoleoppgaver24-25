import numpy as np
import matplotlib.pyplot as plt


G = 6.67430e-11  
M_sun = 1.989e30  
M_earth = 5.972e24  
AU = 1.496e11  
R_earth = 6.3781e6  
year_in_seconds = 365.25 * 24 * 3600  
dt = 60 * 60  


def calculate_orbit(initial_position, initial_velocity, mass_object, num_steps):
    """
    Earth's orbit.
    """
    r = np.array(initial_position, dtype=np.float64)
    v = np.array(initial_velocity, dtype=np.float64)

    
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



initial_position = [AU, 0]
initial_velocity = [0, 29780]
num_steps = int(year_in_seconds / dt)

positions = calculate_orbit(initial_position, initial_velocity, M_earth, num_steps)


plt.figure(figsize=(8, 8))
plt.plot(positions[:, 0], positions[:, 1])
plt.scatter(0, 0, color='yellow', label='Sun')
plt.xlabel('x position (m)')
plt.ylabel('y position (m)')
plt.title('Orbit of Earth around the Sun')
plt.gca().set_aspect('equal', adjustable='box')
plt.legend()
plt.grid(True)
plt.show()
