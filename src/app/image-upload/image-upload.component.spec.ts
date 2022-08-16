import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadComponent } from './image-upload.component';
import { ImageCrudService } from './service/image-crud-service';
import {
  Spy
} from 'jasmine-auto-spies';

describe('ImageUploadComponent', () => {
  let component: ImageUploadComponent;
  let fixture: ComponentFixture<ImageUploadComponent>;
  let imageCrudServiceSpy: Spy<ImageCrudService>;

  beforeEach(async () => {
    imageCrudServiceSpy = jasmine.createSpyObj('ImageCrudService',
      ['getAllImages', 'getImage', 'getImagesByObjectType', 'saveImage']);
    await TestBed.configureTestingModule({
      declarations: [ ImageUploadComponent ],
      providers: [
        { provide: ImageCrudService, useValue: imageCrudServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
