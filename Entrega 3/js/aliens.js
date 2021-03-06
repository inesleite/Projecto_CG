class Alien extends GameEntity {
	constructor(x, y, z) {
		super(x, y, z);
		this.speedMultiplier = 250;
		this.colision = false;
		this.buildAlien(x, y, z);
		this.generateRandomSpeed();
	}

	changeMaterialsToPhong(){
		this.children[0].material = gameMaterials.getAlienPhongMaterial("green");
		this.children[1].material = gameMaterials.getAlienPhongMaterial("red");
		this.children[2].material = gameMaterials.getAlienPhongMaterial("green");
		this.children[3].material = gameMaterials.getAlienPhongMaterial("green");
		this.children[4].material = gameMaterials.getAlienPhongMaterial("white");
		this.children[5].material = gameMaterials.getAlienPhongMaterial("white");
		this.children[6].material = gameMaterials.getAlienPhongMaterial("blue");
		this.children[7].material = gameMaterials.getAlienPhongMaterial("blue");
	}
	changeMaterialsToLambert(){
		this.children[0].material = gameMaterials.getAlienLambertMaterial("green");
		this.children[1].material = gameMaterials.getAlienLambertMaterial("red");
		this.children[2].material = gameMaterials.getAlienLambertMaterial("green");
		this.children[3].material = gameMaterials.getAlienLambertMaterial("green");
		this.children[4].material = gameMaterials.getAlienLambertMaterial("white");
		this.children[5].material = gameMaterials.getAlienLambertMaterial("white");
		this.children[6].material = gameMaterials.getAlienLambertMaterial("blue");
		this.children[7].material = gameMaterials.getAlienLambertMaterial("blue");
	}
	changeMaterialsToBasic(){
		this.children[0].material = gameMaterials.getAlienBasicMaterial("green");
		this.children[1].material = gameMaterials.getAlienBasicMaterial("red");
		this.children[2].material = gameMaterials.getAlienBasicMaterial("green");
		this.children[3].material = gameMaterials.getAlienBasicMaterial("green");
		this.children[4].material = gameMaterials.getAlienBasicMaterial("white");
		this.children[5].material = gameMaterials.getAlienBasicMaterial("white");
		this.children[6].material = gameMaterials.getAlienBasicMaterial("blue");
		this.children[7].material = gameMaterials.getAlienBasicMaterial("blue");
	}
	// Alien randomized speed methods
	generateRandomSpeed() {
		var rand_x = this.getRandomFloatSpeed(-1, 1);
		var rand_z = this.getRandomFloatSpeed(-1, 1);
		var normalized_speed_x = rand_x / this.getSpeedVectorLength(rand_x, rand_z);
		var normalized_speed_z = rand_z / this.getSpeedVectorLength(rand_x, rand_z);
		this.setSpeed(normalized_speed_x * this.speedMultiplier,normalized_speed_z * this.speedMultiplier);
	}
	getRandomFloatSpeed(min, max) {
		return Math.random() * (max - min + 1) + min;
	}
	getSpeedVectorLength(vector_x, vector_z) {
		return Math.pow(Math.pow(vector_x, 2) + Math.pow(vector_z, 2), 0.5);
	}
	checkLeftRightLimitsColision() {
		if (this.position.x > 520) {
			this.setSpeed_x(-this.getSpeed_x())
			this.position.x = 520;
		} else if (this.position.x < -520) {
			this.setSpeed_x(-this.getSpeed_x())
			this.position.x = -520;
		}
	}
	checkTopBottomLimitsColision() {
		if (this.position.z > 100) {
			this.setSpeed_z(-this.getSpeed_z())
			this.position.z = 100;
		} else if (this.position.z < -330) {
			this.setSpeed_z(-this.getSpeed_z())
			this.position.z = -330;
		}
	}

	// Alien Colisions
	detectColisions(delta) {
		var tentativePosition = this.getFuturePosition(delta);
		for (let alien of gameElements) {
			if (alien instanceof Alien && alien != this) {
				var other_tentativePosition = alien.getFuturePosition(delta);
				var distance = getDistance(tentativePosition, other_tentativePosition);
				if (distance <= 60) {
					this.activateColision();
					alien.activateColision();
					return;
				}
			}
		}
		this.disableColision();
	}

	processColisions() {
		this.setSpeed(-this.getSpeed_x(),-this.getSpeed_z());
		this.disableColision()
	}
	executeMovement(delta){
		if (aliens_moving) {
			super.executeMovement(delta);
		}
	}

	// Alien construction methods
	buildAlien(x, y, z) {
		scene.add(this);
		this.addHead();
		this.addBody();
		this.addArms();
		this.addAntenas();
		this.addTeeths();
	}
	addHead() {
		var geometry = new THREE.CubeGeometry(50, 30, 30);
		var mesh = new THREE.Mesh(geometry, gameMaterials.getAlienLambertMaterial("green"));
		mesh.position.set(0, 0, 0);
		this.add(mesh);
	}
	addBody() {
		var geometry = new THREE.CubeGeometry(30, 40, 30);
		var mesh = new THREE.Mesh(geometry, gameMaterials.getAlienLambertMaterial("red"));
		mesh.position.set(0, -35, 0);
		this.add(mesh)
	}
	addArms() {
		var geometry = new THREE.CubeGeometry(10, 10, 30);
		var mesh_left = new THREE.Mesh(geometry, gameMaterials.getAlienLambertMaterial("green"));
		var mesh_right = new THREE.Mesh(geometry, gameMaterials.getAlienLambertMaterial("green"));
		mesh_left.position.set(-15, -25, 20);
		mesh_right.position.set(15, -25, 20);
		this.add(mesh_left)
		this.add(mesh_right)
	}
	addTeeths() {
		var geometry = new THREE.CubeGeometry(5, 25, 10);
		var mesh_left = new THREE.Mesh(geometry, gameMaterials.getAlienLambertMaterial("blue"));
		var mesh_right = new THREE.Mesh(geometry, gameMaterials.getAlienLambertMaterial("blue"));
		mesh_left.position.set(-5, 5, 20);
		mesh_right.position.set(5, 5, 20);
		this.add(mesh_left)
		this.add(mesh_right)
	}
	addAntenas() {
		var geometry = new THREE.CubeGeometry(2, 30, 2);
		var mesh_left = new THREE.Mesh(geometry, gameMaterials.getAlienLambertMaterial("white"));
		var mesh_right = new THREE.Mesh(geometry, gameMaterials.getAlienLambertMaterial("white"));
		mesh_left.position.set(-10, 20, 0);
		mesh_right.position.set(10, 20, 0);
		this.add(mesh_left)
		this.add(mesh_right)
	}
}

function generateAliens() {
	gameElements.push(new Alien(-200, 50, -250));
	gameElements.push(new Alien(-100, 50, -250));
	gameElements.push(new Alien(0, 50, -250));
	gameElements.push(new Alien(100, 50, -250));
	gameElements.push(new Alien(200, 50, -250));

	gameElements.push(new Alien(-200, 50, -150));
	gameElements.push(new Alien(-100, 50, -150));
	gameElements.push(new Alien(0, 50, -150));
	gameElements.push(new Alien(100, 50, -150));
	gameElements.push(new Alien(200, 50, -150));
}