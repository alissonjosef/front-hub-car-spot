import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Observable, catchError, throwError } from 'rxjs';

export interface HttpApiError {
    title: string;
    message: string;
    status: number;
    url: string;
    path: string;
    params: any;
    body: any;
    host: string;
    alertType: string;
    timestamp: number;
    stackTrace: any;
}

/**
 * Intercept
 *
 * @param req
 * @param next
 */
export class ErrorInterceptor implements HttpInterceptor {
    _fuseConfirmationService: FuseConfirmationService = inject(FuseConfirmationService);
    _snackBar: MatSnackBar = inject(MatSnackBar);
    alertType: 'alert' | 'snack' = 'alert';

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Response
        return next.handle(req).pipe(
            catchError((error) => {
                const splitUrl = error.url.split('/');

                const apiError: HttpApiError = {
                    title: 'Error',
                    message: 'An error occurred',
                    status: error.status,
                    url: error.url,
                    host: error.url.split('/')[0] + '/' + error.url.split('/')[2],
                    timestamp: Date.now(),
                    path: splitUrl.slice(3, splitUrl.length).join('/'),
                    params: req.params,
                    body: req.body,
                    alertType: 'error',
                    stackTrace: error,
                };

                let showConfirmDialog = false;

                switch (error.status) {
                    case 400:
                        apiError.title = 'Bad Request';
                        apiError.message = 'The server could not understand the request due to invalid syntax.';
                        break;
                    case 401:
                        apiError.title = 'Unauthorized';
                        apiError.message = 'The client must authenticate itself to get the requested response.';
                        break;
                    case 403:
                        apiError.title = 'Forbidden';
                        apiError.message = 'The client does not have access rights to the content.';
                        break;
                    case 404:
                        apiError.title = '[404] - Not Found.';
                        apiError.message = 'O servidor não pode encontrar o recurso solicitado.<br/> verifique a URL e tente novamente.';
                        showConfirmDialog = true;
                        break;
                    case 500:
                        apiError.title = 'Internal Server Error';
                        apiError.message = 'O servidor encontrou uma situação com a qual não sabe lidar.';
                        showConfirmDialog = true;
                        this.alertType = 'snack';
                        break;
                    case 0:
                        apiError.title = 'Connection Error';
                        apiError.message = 'O servidor não está respondendo. Verifique sua conexão com a internet e tente novamente.';
                        showConfirmDialog = true;
                        this.alertType = 'snack';
                    default:
                        break;
                }

                if (showConfirmDialog) {
                    if (this.alertType === 'snack') {
                        this._snackBar.open(apiError.message, 'Fechar', {
                            duration: 2000,
                            panelClass: ['bg-red-500', 'text-white', 'snackbar-error'],
                        });
                    } else {
                        this._fuseConfirmationService.open({
                            title: `${apiError.title}`,
                            message: apiError.message,
                            icon: {
                                name: 'error',
                                color: 'error',
                            },
                            actions: {
                                cancel: {
                                    show: false,
                                },
                                confirm: {
                                    show: true,
                                    label: 'Fechar',
                                },
                            },
                        });
                    }
                }

                return throwError(() => apiError);
            })
        );
    }
}
