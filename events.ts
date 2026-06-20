/* Event Handler */
export class EventHandler {
  public currentMouseX: number = 0;
  public currentMouseY: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    canvas.addEventListener('mousemove', (e) => {
      this.currentMouseX = e.clientX / canvas.clientWidth;
      this.currentMouseY = e.clientY / canvas.clientHeight;
    });
  }

  update() {
    // Update event state
  }
}
