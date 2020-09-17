import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src: process.env.PUBLIC_URL+"/maxresdefault.jpg",
    altText: 'BBVA móvil',
    caption: 'BBVA móvil',
    header: 'BBVA móvil',
    key: '1'
  },
  {
    src:  process.env.PUBLIC_URL+"/bbva2.jpg",
    altText: 'Máster BBVA',
    caption: 'Máster BBVA',
    header: 'Máster BBVA',
    key: '2'
  },
  {
    src:  process.env.PUBLIC_URL+"/bbva3.png",
    altText: 'Pyme BBVA',
    caption: 'Pyme BBVA',
    header: 'Pyme BBVA',
    key: '3'
  },
  {
    src:  process.env.PUBLIC_URL+"/becas-bbva.jpg",
    altText: 'Becas BBVA',
    caption: 'Becas BBVA',
    header: 'Becas BBVA',
    key: '4'
  }
];

const Carousel = () => <UncontrolledCarousel items={items} />;

export default Carousel;
