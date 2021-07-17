import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UploadRoutingModule} from './upload-routing.module';
import {UploadComponent} from './component/upload.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import { EditComponent } from './component/edit/edit.component';


@NgModule({
  declarations: [
    UploadComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    UploadRoutingModule,
    TranslateModule.forChild(),
    FormsModule
  ],
  exports: [
    UploadComponent
  ]
})
export class UploadModule {
}
