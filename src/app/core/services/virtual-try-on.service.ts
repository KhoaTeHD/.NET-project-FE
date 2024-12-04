import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VirtualTryOnService {
  private apiUrl = '/fashn-api';
  private apiKey = 'api-key-from-fashn-ai';

  constructor() {}

  runVirtualTryOn(
    modelImage: string,
    garmentImage: string,
    category: string
  ): Promise<any> {
    const url = `${this.apiUrl}/run`;
    const body = {
      model_image: modelImage,
      garment_image: garmentImage,
      category: category,
    };

    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json());
  }

  getStatus(requestId: string): Promise<any> {
    const url = `${this.apiUrl}/status/${requestId}`;

    return fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'completed') {
          return { status: data.status, output: data.output };
        } else {
          return { status: data.status };
        }
      });
  }

  cancelRequest(requestId: string): Promise<any> {
    const url = `${this.apiUrl}/cancel/${requestId}`;

    return fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    }).then((response) => response.json());
  }
}
