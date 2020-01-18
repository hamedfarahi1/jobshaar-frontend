import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NetworkActivityService {
  constructor() {
  }

  // tslint:disable-next-line:no-any
  public appendResponseToBody(request: HttpRequest<any>, response: HttpResponse<any>): void {
    const container = document.getElementById('app-network-activity-log');
    if (container && response.status) {
      const node = document.createElement('li');
      node.id = 'app-response-for-' +
        request.method.toLowerCase() + '-' +
        request.url.split('/')[1].toLowerCase();
      if (request.method.toLowerCase() === 'put' &&
        request.body && request.body.id) {
        node.id += '-' + request.body.id;
      }
      if (request.method.toLowerCase() === 'delete') {
        node.id += '-' + request.url.split('/')[2];
      }
      if (request.method.toLowerCase() === 'get' && request.url.split('/').length > 2) {
        node.id += '-' + request.url.split('/')[2];
      }
      node.append(response.status.toString());
      node.style.fontSize = '1px';
      node.style.display = 'inline';
      node.style.color = 'rgb(250,250,250)';
      if (request.method === 'POST' && response.body && response.body.id)
        node.append('/', response.body.id);
      container.appendChild(node);
    }
  }
}
