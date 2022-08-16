export class ImageUploadRequest {
  constructor(
    public isLink: boolean,
    public detectObjects: boolean,
    public label: string,
    public fileName: string,
    public base64ImageData: string,
    public linkUrl: string,
    public imageType: string
  ) {
  }
}

export class ImageUploadRequestBuilder {
  private _isLink: boolean;
  private _detectObjects: boolean;
  private _label: string;
  private _fileName: string;
  private _base64ImageData: string;
  private _linkUrl: string;
  private _imageType: string;

  public isLink(value: boolean): ImageUploadRequestBuilder {
    this._isLink = value;
    return this;
  }

  public detectObjects(value: boolean): ImageUploadRequestBuilder {
    this._detectObjects = value;
    return this;
  }

  public label(value: string): ImageUploadRequestBuilder {
    this._label = value;
    return this;
  }

  public filename(value: string): ImageUploadRequestBuilder {
    this._fileName = value;
    return this;
  }

  public base64ImageData(value: string): ImageUploadRequestBuilder {
    this._base64ImageData = value;
    return this;
  }

  public linkUrl(value: string): ImageUploadRequestBuilder {
    this._linkUrl = value;
    return this;
  }

  public imageType(value: string): ImageUploadRequestBuilder {
    this._imageType = value;
    return this;
  }

  public build(): ImageUploadRequest {
    return new ImageUploadRequest(
      this._isLink, this._detectObjects, this._label, this._fileName,
      this._base64ImageData, this._linkUrl, this._imageType
    );
  }
}
