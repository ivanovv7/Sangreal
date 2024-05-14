import { HttpInterceptorFn } from '@angular/common/http';
import { AuthServiceService } from '../auth-service.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthServiceService);

  const token = authService.getToken();

  if (token) {
    const cloneReq = req.clone({
      setHeaders:{
        Authorization:token
      }
    })

    return next(cloneReq)
  }
  return next(req);
};
