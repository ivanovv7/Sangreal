import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from './logIn_register/auth-service.service';
import { map } from 'rxjs';

export const routeGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    map((isLoggedIn) => {
      if (isLoggedIn) {
        console.log('The token is valid:', isLoggedIn);
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    })
  );
};
