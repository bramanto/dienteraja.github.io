$(window).on('load', function(){

	"use strict";
 
	/* ========================================================== */
	/*   Navigation Background Color                              */
	/* ========================================================== */
	
	$(window).on('scroll', function() {
		if($(this).scrollTop() > 150) {
			$('.navbar-fixed-top').addClass('opaque');
		} else {
			$('.navbar-fixed-top').removeClass('opaque');
		}
	});
 
	
	/* ========================================================== */
	/*   Hide Responsive Navigation On-Click                      */
	/* ========================================================== */
	
	$(".navbar-nav li a").on('click', function(event) {
		$(".navbar-collapse").collapse('hide');
	});

	
	/* ========================================================== */
	/*   Navigation Color                                         */
	/* ========================================================== */
	
	$('.navbar-nav').onePageNav({
		filter: ':not(.external)'
	});


	/* ========================================================== */
	/*   SmoothScroll                                             */
	/* ========================================================== */
	
	$(".navbar-nav li a, a.scrool").on('click', function(e) {		
		let full_url = this.href;
		let parts = full_url.split("#");
		let trgt = parts[1];
		let target_offset = $("#"+trgt).offset();
		let target_top = target_offset.top;
		
		$('html,body').animate({scrollTop:target_top -70}, 1000);
			return false;
		
	});	
	
	
	/* ========================================================== */
	/*   Typing Text                                              */
	/* ========================================================== */
	
	const phrases = [
		"Selamat Datang",
		"di",
		"DIENTERAJA.XYZ",
		"Jelajahi Inovasi..",
		"Bangun Kolaborasi..",
		"Raih Keberhasilan..",
		"Bersama kami",
		"DIENTERAJA.XYZ"
	];

	let currentPhraseIndex = 0;
	const typingSpeed = 100;
	const pauseTime = [2000, 1000, 5000, 2000, 2000, 2000, 2000, 5000];

	function typePhrase(phrase, index) {
		let i = 0;
		$('#typingText').text('');
		$('#typingText').addClass('cursor');

		const interval = setInterval(function() {
			$('#typingText').append(phrase.charAt(i));
			i++;
			if (i === phrase.length) {
				clearInterval(interval);
				setTimeout(function() {
					$('#typingText').removeClass('cursor');
					currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
					typePhrase(phrases[currentPhraseIndex], currentPhraseIndex);
				}, pauseTime[index]);
			}
		}, typingSpeed);
	}

	typePhrase(phrases[currentPhraseIndex], currentPhraseIndex);
	
	
	/* ========================================================== */
	/*   Testimoni                                                */
	/* ========================================================== */

	let currentIndex = 0;
	const itemsPerLoad = 3;
	let allData = [];

	function loadTestimonials(containerId, jsonFile) {
		fetch(jsonFile)
		.then(response => response.json())
		.then(data => {
			allData = data;
			loadMoreItems(containerId);
		})
		.catch(error => {
			console.error('Error loading the testimonial data:', error);
		});
	}

	function loadMoreItems(containerId) {
		const container = document.getElementById(containerId);
		const loadingElement = document.getElementById('loading-testimoni');
		const btnLoadingElement = document.getElementById('load-more');
		
		loadingElement.style.display = 'block';
		btnLoadingElement.style.display = 'none';

		setTimeout(() => {
			const endIndex = Math.min(currentIndex + itemsPerLoad, allData.length);
			
			for (let i = currentIndex; i < endIndex; i++) {
				const item = allData[i];

				const cardHTML = `
					<div class="col-md-4 col-blog-item">
						<div class="blog-item d-flex flex-column">
							<div class="blog-item-inner">
								<h3 class="blog-title mb-0">
									<a href="javascript:;">${item.nama}</a>
								</h3>
								<div>
									<a href="#" class="blog-icons last">
										<i class="bi bi-person-check"></i> ${item.job}
									</a>
								</div>
								<p class="small">${item.testimoni}</p>								
								<div class="testim-rating">
									<i class="bi bi-star-fill"></i>
									<i class="bi bi-star-fill"></i>
									<i class="bi bi-star-fill"></i>
									<i class="bi bi-star-fill"></i>
									<i class="bi bi-star-fill"></i>
								</div>
							</div>
						</div>
					</div>
				  `;
				  
				container.innerHTML += cardHTML;
			}

			currentIndex = endIndex;
			
			loadingElement.style.display = 'none';
			
			if (currentIndex >= allData.length) {
				btnLoadingElement.style.display = 'none';
			} else {
				btnLoadingElement.style.display = 'block';
			}
			
		}, 3000);
	}

	document.getElementById('load-more').addEventListener('click', function() {
		loadMoreItems('testimoni-container');
	});

	loadTestimonials('testimoni-container', 'assets/js/testimoni.json');
	
	
	/* ========================================================== */
	/*   Popover Fact                                             */
	/* ========================================================== */
	
	let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
	let popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
		return new bootstrap.Popover(popoverTriggerEl, { trigger: 'hover' })
	});
	
	
	/* ========================================================== */
	/*   Scroll to Up                                             */
	/* ========================================================== */
	
	const scrollToTopButton = document.querySelector('.scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopButton.classList.add('show');
        } else {
            scrollToTopButton.classList.remove('show');
        }
    });

    scrollToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
	
	
	/* ========================================================== */
	/*   Popup-Gallery                                            */
	/* ========================================================== */	
	
	$('.popup-gallery').find('a.popup4').magnificPopup({
		type: 'iframe',
		gallery: {
		  enabled:false
		}
	});
});
