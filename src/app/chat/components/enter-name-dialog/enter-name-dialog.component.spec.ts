import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterNameDialogComponent } from './enter-name-dialog.component';

describe('EnterNameDialogComponent', () => {
  let component: EnterNameDialogComponent;
  let fixture: ComponentFixture<EnterNameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterNameDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
