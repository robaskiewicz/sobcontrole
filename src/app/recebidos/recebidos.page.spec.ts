import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecebidosPage } from './recebidos.page';

describe('RecebidosPage', () => {
  let component: RecebidosPage;
  let fixture: ComponentFixture<RecebidosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecebidosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecebidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
