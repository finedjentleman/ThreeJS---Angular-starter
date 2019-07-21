import { Component, OnInit } from '@angular/core';
//import * as THREE from 'three-full';
import * as THREE from 'three';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit {

  private loader;

  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;;

  private geometry: THREE.BoxGeometry; //local
  private material: THREE.MeshBasicMaterial; //local
  private cube: THREE.Mesh;

  constructor() { }

  ngOnInit() {
    //this.loader = new THREE.ColladaLoader();
    
    window.addEventListener('resize', this.onWindowResize.bind(this), false);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth/window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.domElement);

    this.geometry = new THREE.BoxGeometry(2, 2, 2);
    this.material = new THREE.MeshBasicMaterial({ color: 0x0000ff});
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.cube);
  
    this.camera.position.z = 5;

    this.animate();
  }

  animate(){
    requestAnimationFrame(this.animate.bind(this));

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize(){ // for component to stay in the middle
    this.camera.aspect = window.innerWidth/window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  

}
