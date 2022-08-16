import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageResponse } from '../api/image-response';
import { ImageUploadRequest } from '../api/image-upload-request';

@Injectable()
export class ImageCrudService {

  private readonly IMAGE_RESOURCE_URL = 'http://localhost:8081/images';

  constructor(
    private http: HttpClient
  ) {
  }

  public getAllImages(): Observable<Array<ImageResponse>> {
    return this.http.get<Array<ImageResponse>>(this.IMAGE_RESOURCE_URL);
  }

  public getImage(imageId: string): Observable<ImageResponse> {
    return this.http.get<ImageResponse>(this.IMAGE_RESOURCE_URL + `/${imageId}`);
  }

  public getImagesByObjectType(objects: string[]): Observable<Array<ImageResponse>> {
    let urlWithTypes: string = this.IMAGE_RESOURCE_URL + '?objects=' + objects.toString();
    return this.http.get<Array<ImageResponse>>(urlWithTypes);
  }

  public saveImage(imageUploadRequest: ImageUploadRequest): Observable<ImageResponse> {
    return this.http.post<ImageResponse>(this.IMAGE_RESOURCE_URL, imageUploadRequest);
  }
}
