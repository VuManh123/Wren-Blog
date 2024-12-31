import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MainAddLanguageComponent } from '../../components/main-add-language/main-add-language.component';
@Component({
  selector: 'app-add-language',
  standalone: true,
  imports: [HeaderComponent, MainAddLanguageComponent],
  templateUrl: './add-language.component.html',
  styleUrl: './add-language.component.css'
})
export class AddLanguageComponent {

}
