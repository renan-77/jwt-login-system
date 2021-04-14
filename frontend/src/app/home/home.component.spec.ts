import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ HomeComponent ],
            imports: [
                RouterTestingModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should test if clearStorage method has been called once', fakeAsync(() => {
        fixture.detectChanges();
        spyOn(component, 'clearStorage');
        (document.getElementById('btn-logout') as HTMLButtonElement).click();
        expect(component.clearStorage).toHaveBeenCalledTimes(1);
    }));
});
