document.addEventListener("DOMContentLoaded", function () {
	initAnim();
	AOS.init();
	var container = document.getElementById("analogies");

	for (var i = 0; i < data.length; i++) {
		var idSuivant="formulaire"
		if (i<data.length-1) {
			idSuivant=data[i+1].id;
		}
		container.innerHTML += `<section data-aos="fade-in data-aos-duration="1000"  id="`
		+ data[i].id 
		+ `" ${i%2===0?'class="left"':''}><article class="bloc"><h2>Si j\'étais ` 
		+ data[i].analogies 
		+ ', je serais... ' + '<br>' + data[i].valeurAnalogies 
		+ '</h2><p>' 
		+ data[i].text + '</p><div class="triangle_container"><a href="#' 
		+ idSuivant 
		+ '"><img class="triangle" src="img/triangle.png" alt="Suivant"></a></div></article><img data-aos="fade-down" class="img-desc" src ='+data[i].url+' alt= "Image de '+data[i].valeurAnalogies+' ">';
	}

	for (numCase = 0; numCase < analogies.length; numCase++) {}

	console.log(numCase)
	var openpmentions = document.querySelector('.mario');
	openpmentions.addEventListener('click', function visible(event){
		document.querySelector('.popup').classList.toggle('popupinvisible');
		document.querySelector('.popup').classList.toggle('popupvisible');
})
});

window.addEventListener("resize", function() {
	initAnim();
});

function initAnim() {
	var canvas = document.getElementById('fond');

	var maxx = window.innerWidth;
	var maxy = window.innerHeight;

	var halfx = maxx / 2;
	var halfy = maxy / 2;

	canvas.width = maxx;
	canvas.height = maxy;

	var context = canvas.getContext("2d");
	var dotCount = 200;
	var dots = [];

	for (var i = 0; i < dotCount; i++) {
		dots.push(new dot());
	}

	function render() {
		context.fillStyle = "#000000";
		context.fillRect(0, 0, maxx, maxy);
		for (var i = 0; i < dotCount; i++) {
			dots[i].draw();
			dots[i].move();
		}
		requestAnimationFrame(render);
	}

	function dot() {

		this.rad_x = 2 * Math.random() * halfx + 1;
		this.rad_y = 1.2 * Math.random() * halfy + 1;
		this.alpha = Math.random() * 360 + 1;
		this.speed = Math.random() * 100 < 50 ? 1 : -1;
		this.speed *= 0.1;
		this.size = Math.random() * 5 + 1;
		this.color = Math.floor(Math.random() * 256);

	}

	dot.prototype.draw = function () {

		var dx = halfx + this.rad_x * Math.cos(this.alpha / 180 * Math.PI);
		var dy = halfy + this.rad_y * Math.sin(this.alpha / 180 * Math.PI);
		context.fillStyle = "rgb(" + this.color + "," + this.color + "," + this.color + ")";
		context.fillRect(dx, dy, this.size, this.size);

	};

	dot.prototype.move = function () {

		this.alpha += this.speed;
		if (Math.random() * 100 < 50) {
			this.color += 1;
		} else {
			this.color -= 1;
		}

	};

	render();

	document.getElementById("myForm").addEventListener("submit", function (e) {
		e.preventDefault();

		const analogieValue = document.getElementById("analogie").value.trim();
		const valeurValue = document.getElementById("valeur").value.trim();
		const descValue = document.getElementById("desc").value.trim();
		const urlValue = document.getElementById("URL").value.trim();
		const urlInput = document.getElementById("URL");
		const emailValue = document.getElementById("email").value.trim();
		
		const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

		document.getElementById("message").innerHTML = "";

		if (!analogieValue || !valeurValue || !descValue || !urlValue || !emailValue) {
			document.querySelector("#message").innerHTML = "Veuillez remplir <br>tous les champs du formulaire.";
			return;
		} else

		if (!urlRegex.test(urlValue)) {
			document.getElementById("message").innerHTML = "Entrez une URL valide.";
			false
			return;
		}
	
		document.querySelector("#message").innerHTML = "";
	
		const customAnalogie = document.querySelector("#customAnalogie");
		customAnalogie.innerHTML += `<section data-aos="fade-in" data-aos-duration="1000" ${i % 2 === 0 ? 'class="left"' : ''} id="">
			<article class="bloc">
				<h2>Si j'étais ${analogieValue}, je serais... <br> ${valeurValue}</h2>
				<p>Parce que... ${descValue}</p>
				<div class="triangle_container">
					<a href="#"><img class="triangle" src="img/triangle.png" alt=""></a>
				</div>
			</article>
			<div data-aos="fade-down" class="img-desc" style="background-image:url(${urlValue})"></div>
		</section>`;
	
		fetch("https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=thomas.vidal&courriel=" + emailValue + "&message=Si j'étais" + analogieValue + ", je serais..." + valeurValue + descValue).then(function (response) {
			response.json().then(function (data) {
				if (data.status == "success") {
					document.querySelector("#message").innerHTML = "Bien reçu !";
					document.querySelector("form").reset();
				} else {
					document.querySelector("#message").innerHTML = "Une erreur est survenue";
				}
			});
		});
	
		i++;
	});

}






