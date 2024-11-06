import numpy as np
import matplotlib.pyplot as plt

def calculate_earth_orbit():
    G = 6.67430e-11  
    M = 1.989e30     
    AU = 1.496e11    
    year_in_seconds = 365.25 * 24 * 3600
   
    r = np.array([AU, 0])  
    v = np.array([0, 29780]) 

  
    dt = 60 * 60  
    num_steps = int(year_in_seconds / dt)  
    
    positions = np.zeros((num_steps, 2))

    for i in range(num_steps):
       
        r_magnitude = np.linalg.norm(r)
        force_magnitude = G * M / r_magnitude**2
        force_direction = -r / r_magnitude
        force = force_magnitude * force_direction

       
        v += force * dt
        r += v * dt

        
        positions[i] = r

    return positions

def plot_earth_orbit(positions):
    plt.figure(figsize=(8, 8))
    plt.plot(positions[:, 0], positions[:, 1])
    plt.scatter(0, 0, color='yellow', label='Sun')  # Sun at the origin
    plt.xlabel('x position (m)')
    plt.ylabel('y position (m)')
    plt.title('Orbit of Earth around the Sun')
    plt.gca().set_aspect('equal', adjustable='box')
    plt.legend()
    plt.grid(True)
    plt.show()


positions = calculate_earth_orbit()
plot_earth_orbit(positions)
