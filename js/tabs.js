window.addEventListener("load", function() {
			// store tabs variable
			var examples = document.querySelectorAll("div.examples > .example");
			function myTabClicks(tabClickEvent) {
				for (var i = 0; i < examples.length; i++) {
					console.log('removing, i')
					examples[i].classList.remove("active");
				}
				var clickedTab = tabClickEvent.currentTarget;
				clickedTab.classList.add("active");
				tabClickEvent.preventDefault();

				var anchorReference = tabClickEvent.target;
				var activePaneId = anchorReference.getAttribute("href");
				var activePane = document.querySelector(activePaneId);
				activePane.classList.add("active");
			}
			var buttons = document.querySelectorAll("div.menu > a");
			for (i = 0; i < buttons.length; i++) {
				console.log('adding')
				buttons[i].addEventListener("click", myTabClicks)
			}
		});
