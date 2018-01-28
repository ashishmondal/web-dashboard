/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BackgroundImageService } from './background-image.service';

describe('BackgroundImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackgroundImageService]
    });
  });

  it('should ...', inject([BackgroundImageService], (service: BackgroundImageService) => {
    expect(service).toBeTruthy();
  }));
});
