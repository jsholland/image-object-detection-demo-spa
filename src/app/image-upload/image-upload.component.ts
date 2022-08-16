import { Component, OnInit } from '@angular/core';
import { SkyFileDropChange, SkyFileLink } from '@skyux/forms';
import { finalize } from 'rxjs';
import { ImageUploadRequest, ImageUploadRequestBuilder } from './api/image-upload-request';
import { ImageCrudService } from './service/image-crud-service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
  public maxFileSize: number = 15000000; // 15 MB
  public acceptedTypes: string = 'image/apng,image/avif,image/bmp,image/gif,image/jpeg' +
    ',image/png,image/svg+xml,image/tiff,image/webp,image/x-icon';
  public showLinkError: boolean = false;
  public acceptedFileExtensions = ['.apng', '.avif', '.bmp', '.gif', '.ico', '.jpg',
    '.jpeg', '.png', '.svg', '.tif', '.tiff', '.webp'];
  public showSaveImageResponse: boolean = false;
  public showGetAllImagesResponse: boolean = false;
  public imageSaveResponse: string;
  public getAllImagesResponse: string;
  public isWaiting = false;
  public getImageResponse: string;
  public showGetImageResponse: boolean = false;
  public selectedImageId: string;
  public objectsToQuery: string;
  private objectList: string[];
  public getImagesWithObjectsResponse: string;
  public showImagesWithObjectsResponse: boolean;
  public detectObjects: boolean = true;
  public imageLabel: string;

  constructor(
    private imageCrudService: ImageCrudService
  ) { }

  public fileAdded(fileDropChange: SkyFileDropChange): void {
    let imageUploadRequest: ImageUploadRequest = this.buildRequestFromSelectedFile(fileDropChange);
    this.uploadImage(imageUploadRequest);
  }

  public linkAdded(fileLink: SkyFileLink): void {
    if (this.isValidLink(fileLink.url)) {
      let imageUploadRequest: ImageUploadRequest = this.buildRequestFromImageUrl(fileLink);
      this.uploadImage(imageUploadRequest);
    } else {
      this.showLinkError = true;
      this.isWaiting = false;
    }
  }

  public getAllImages(): void {
    this.isWaiting = true;
    this.imageCrudService.getAllImages()
      .pipe(finalize(() => {
        this.isWaiting = false;
      }))
      .subscribe(images => {
      this.getAllImagesResponse = JSON.stringify(images)
      this.showGetAllImagesResponse = true;
    });
  }

  public getImage(): void {
    this.isWaiting = true;
    this.imageCrudService.getImage(this.selectedImageId.trim())
      .pipe(finalize(() => {
        this.isWaiting = false;
      }))
      .subscribe(image => {
        this.getImageResponse = JSON.stringify(image)
        this.showGetImageResponse = true;
      });
  }

  public getImagesByObjectName(): void {
    this.isWaiting = true;
    this.objectList = this.objectsToQuery.split(',');
    this.objectList.forEach(objectName => {
      objectName.trim();
    });
    this.imageCrudService.getImagesByObjectType(this.objectList)
      .pipe(finalize(() => {
        this.isWaiting = false;
      }))
      .subscribe(images => {
        this.getImagesWithObjectsResponse = JSON.stringify(images)
        this.showImagesWithObjectsResponse = true;
      });
  }

  public getShowImageResponseButtonLabel(): string {
    return (this.showSaveImageResponse) ? 'Hide save image response' : 'Show save image response';
  }

  public flipShowImageResponseValue(): void {
    this.showSaveImageResponse = !this.showSaveImageResponse;
  }

  public getAllImagesResponseButtonLabel(): string {
    return (this.showGetAllImagesResponse) ? 'Hide getAllImages response' : 'Show getAllImages response';
  }

  public flipShowGetAllImagesResponseValue(): void {
    this.showGetAllImagesResponse = !this.showGetAllImagesResponse;
  }

  public getImagesResponseButtonLabel(): string {
    return (this.showGetImageResponse) ? 'Hide getImage response' : 'Show getImage response';
  }

  public flipShowGetImageResponseValue(): void {
    this.showGetImageResponse = !this.showGetImageResponse;
  }

  public getImagesByObjectResponseButtonLabel(): string {
    return (this.showImagesWithObjectsResponse) ? 'Hide getImagesByObject response' : 'Show getImagesByObject response';
  }

  public flipShowGetImagesByObjectsResponseValue(): void {
    this.showImagesWithObjectsResponse = !this.showImagesWithObjectsResponse;
  }

  public setDetectObjects(detectObjects: boolean): void {
    this.detectObjects = detectObjects;
    console.log(detectObjects);
  }

  private uploadImage(imageUploadRequest: ImageUploadRequest): void {
    this.isWaiting = true;
    this.imageCrudService.saveImage(imageUploadRequest)
      .pipe(finalize(() => {
        this.isWaiting = false;
      }))
      .subscribe(response => {
        this.imageSaveResponse = JSON.stringify(response)
        this.showSaveImageResponse = true;
      });
  }

  private buildRequestFromSelectedFile(fileDropChange: SkyFileDropChange): ImageUploadRequest {
    return new ImageUploadRequestBuilder()
      .filename(fileDropChange.files[0].file.name)
      .label('blah')
      .base64ImageData(fileDropChange.files[0].url)
      .isLink(false)
      .detectObjects(this.detectObjects)
      .label(this.imageLabel)
      .build();
  }

  private buildRequestFromImageUrl(fileLink: SkyFileLink): ImageUploadRequest {
    let url: string = this.ensureUrlHasProtocolPrefix(fileLink.url);
    let fileName: string = url.split("/").pop();
    return new ImageUploadRequestBuilder()
      .linkUrl(url)
      .filename(fileName)
      .isLink(true)
      .detectObjects(this.detectObjects)
      .label(this.imageLabel)
      .build();
  }

  private isValidLink(url: string): boolean {
    const lowerCaseUrl = url.toLowerCase();
    return !!lowerCaseUrl && this.isValidExtension(lowerCaseUrl, this.acceptedFileExtensions);
  }

  private isValidExtension(characterString: string, extensions: string[]): boolean {
    let hasValidExtension = false;
    extensions.forEach((extension) => {
      if (characterString.endsWith(extension)) {
        hasValidExtension = true;
      }
    });
    return hasValidExtension;
  }

  private ensureUrlHasProtocolPrefix(url: string): string {
    if (url) {
      const urlLowerCase = url.toLowerCase();
      if (!urlLowerCase.startsWith('http://') && !urlLowerCase.startsWith('https://')) {
        url = 'https://' + url;
      }
    }
    return url;
  }

}
