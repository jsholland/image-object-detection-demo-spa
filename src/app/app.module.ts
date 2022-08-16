import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SkyCheckboxModule, SkyFileAttachmentsModule, SkyInputBoxModule } from '@skyux/forms';
import { SkyWaitModule } from '@skyux/indicators';
import { SkyTabsModule } from '@skyux/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ImageCrudService } from './image-upload/service/image-crud-service';

@NgModule({
  declarations: [
    AppComponent,
    ImageUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SkyCheckboxModule,
    SkyFileAttachmentsModule,
    SkyInputBoxModule,
    SkyTabsModule,
    SkyWaitModule,
  ],
  providers: [
    HttpClient,
    ImageCrudService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
