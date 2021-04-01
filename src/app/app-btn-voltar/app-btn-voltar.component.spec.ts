import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppBtnVoltarComponent } from './app-btn-voltar.component';

describe('AppBtnVoltarComponent', () => {
  let component: AppBtnVoltarComponent;
  let fixture: ComponentFixture<AppBtnVoltarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppBtnVoltarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppBtnVoltarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
