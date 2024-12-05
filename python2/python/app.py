import tkinter as tk

class SimpleDrawingApp:
    def __init__(self, root):
        self.root = root
        self.root.title("APP")
        
        
        self.canvas = tk.Canvas(self.root, bg="white", width=600, height=400)
        self.canvas.pack(fill=tk.BOTH, expand=True)
        
        
        self.canvas.bind("<B1-Motion>", self.paint)
        self.canvas.bind("<ButtonRelease-1>", self.reset)
        
        
        self.old_x = None
        self.old_y = None
        self.color = "blue"
        self.pen_width = 5
        
       
        clear_button = tk.Button(self.root, text="Clear", command=self.clear_canvas)
        clear_button.pack(pady=10)

    def paint(self, event):
        if self.old_x and self.old_y:
            self.canvas.create_line(self.old_x, self.old_y, event.x, event.y,
                width=self.pen_width, fill=self.color, capstyle=tk.ROUND, smooth=True)
        self.old_x = event.x
        self.old_y = event.y

    def reset(self, event):
        self.old_x = None
        self.old_y = None

    def clear_canvas(self):
        self.canvas.delete("all")

if __name__ == "__main__":
    root = tk.Tk()
    app = SimpleDrawingApp(root)
    root.mainloop()
