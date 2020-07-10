import  
{
    WebGLRenderer,
    TextureLoader,
    SphereBufferGeometry,
    Scene,
    Mesh,
    LinearFilter,
    PerspectiveCamera,
    MeshBasicMaterial,
} from './three.js-master/build/three.module.js'
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js';

export class Model
{
    constructor (node)
    {
        this.scene = new Scene ();

        this.camera = new PerspectiveCamera (75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        this.renderer = new WebGLRenderer ({ antialias: true, alpha: true });
        this.renderer.setPixelRatio (window.devicePixelRatio);
        this.renderer.setSize (window.innerWidth, window.innerHeight);
        
        node.appendChild (this.renderer.domElement);

        var globeTexture = new TextureLoader().load ("textures/globe.png");
        globeTexture.minFilter = LinearFilter;

        var globeGeometry = new SphereBufferGeometry (10, 128, 128);
        var globeMaterial = new MeshBasicMaterial ({ map: globeTexture });
        var globe = new Mesh (globeGeometry, globeMaterial);

        this.scene.add (globe);

        var layer1Texture = new TextureLoader().load ("textures/layer1.png");
        layer1Texture.minFilter = LinearFilter;

        var layer1Geometry = new SphereBufferGeometry (10.01, 128, 128);
        var layer1Material = new MeshBasicMaterial ({ map: layer1Texture, transparent: true });
        var layer1 = new Mesh (layer1Geometry, layer1Material);

        this.scene.add (layer1);

        var layer2Texture = new TextureLoader().load ("textures/layer2.png");
        layer2Texture.minFilter = LinearFilter;

        var layer2Geometry = new SphereBufferGeometry (10.02, 128, 128);
        var layer2Material = new MeshBasicMaterial ({ map: layer2Texture, transparent: true });
        var layer2 = new Mesh (layer2Geometry, layer2Material);

        this.scene.add (layer2);

        this.camera.position.z = 50;

        this.controls = new OrbitControls (this.camera, this.renderer.domElement);
        this.controls.autoRotate = false;
        this.controls.enablePan = false;
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxDistance = 150;

        this.animate();
    }

    animate ()
    {
        requestAnimationFrame (this.animate.bind(this));
        this.renderer.render (this.scene, this.camera);
        this.controls.update ();
    }
}