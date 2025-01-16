import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogContainerComponent } from './delete-dialog-container.component';

describe('DeleteDialogContainerComponent', () => {
  let component: DeleteDialogContainerComponent;
  let fixture: ComponentFixture<DeleteDialogContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDialogContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDialogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
