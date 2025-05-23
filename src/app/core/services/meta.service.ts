import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { env } from 'environments/env';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(private meta: Meta) { }

  updateMetaTags() {
    const imageUrl = `${env.vercel.url}/thumbnail.png`;  // Caminho da imagem
    const websiteUrl = env.vercel.url; // URL do site

    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:url', content: websiteUrl });
  }
}
