export class ImageResponse {
  constructor(
    public imageId: string,
    public label: string,
    public fileName: string,
    public base64imageData: string,
    public imageType: string,
    public imageUrl: string,
    public objects: string[]
  ) {
  }
}

export class ImageResponseBuilder {
  private _imageId: string;
  private _label: string;
  private _fileName: string;
  private _base64imageData: string;
  private _imageType: string;
  private _imageUrl: string;
  private _objects: string[];

  public imageId(value: string): ImageResponseBuilder {
    this._imageId = value;
    return this;
  }

  public label(value: string): ImageResponseBuilder {
    this._label = value;
    return this;
  }

  public filename(value: string): ImageResponseBuilder {
    this._fileName = value;
    return this;
  }

  public base64imageData(value: string): ImageResponseBuilder {
    this._base64imageData = value;
    return this;
  }

  public imageType(value: string): ImageResponseBuilder {
    this._imageType = value;
    return this;
  }

  public imageUrl(value: string): ImageResponseBuilder {
    this._imageUrl = value;
    return this;
  }

  public objects(value: string[]): ImageResponseBuilder {
    this._objects = value;
    return this;
  }

  public build(): ImageResponse {
    return new ImageResponse(
      this._imageId, this._label, this._fileName, this._base64imageData,
      this._imageType, this._imageUrl, this._objects
    );
  }
}
