/* Number Provider for rendering digits */
export class NumberProvider {
  public digitTextureAtlas: any;

  constructor(root: any) {
    this.digitTextureAtlas = root.createTexture({
      size: [256, 256],
      format: 'rgba8unorm',
    });
  }

  async fillAtlas() {
    // Fill digit texture atlas
  }
}
