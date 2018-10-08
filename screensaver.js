function ScreenSaver(args) {
	// Declare const.
	let interval = (args.interval * 1000) || 1000; // ms to sec.
	let timeToSleep = (args.timeToSleep * 1000) || 1000; // ms to sec.
	this.events = args.events || 'onmousemove'; // listen events.

	let waitTimeout;
	let changeInterval;

	const FIRST_ACTIVE_ELEMENT = args.firstActiveElement || -1;
	let counter = FIRST_ACTIVE_ELEMENT;
	let screenList = document.querySelectorAll(args.screenList); // all images
	let countItems = screenList.length; // count of 

	// Bind each eventlistner for start/stop.
	for (var i = 0, len = this.events.length; i < len; i++) {
		document.addEventListener(this.events[i], function(){
			stopScreenSaver()
			startScreenSaver()
		})
	}

	// Stop screen saver.
	function stopScreenSaver() {
		document.getElementById('screenSaver').classList.remove('active');
		clearTimeout(waitTimeout);
		clearTimeout(changeInterval);
	}
	// Start screen saver.
  function startScreenSaver() {
		clearTimeout(this.timeout);
    this.timeout = setTimeout(function() {

			document.getElementById('screenSaver').classList.add('active');
			resizeImage();
			changeItems();

		}, timeToSleep);
	}

	// Start loop for changing screensaver's items.
  function changeItems() {
		changeInterval = setInterval(function () {
			randomPosition();

			// Action for the before element.
			if(screenList[counter]) screenList[counter].classList.remove('active');
			
			// Refresh cycle loop.
			if(++counter === countItems) counter = FIRST_ACTIVE_ELEMENT;

			// Action for the active element.
			if(screenList[counter]) screenList[counter].classList.add('active');
		}, interval)
	}

	// Set random position for each image.
	function randomPosition() {
		screenList.forEach(function (elem, i) {
			var img = screenList[i].querySelector('img');
			var imgWidth = img.offsetWidth;
			var imgHeight = img.offsetHeight;

			img.style.left = Math.round(Math.random() * (document.body.offsetWidth - imgWidth)) + 'px';
			img.style.top = Math.round(Math.random() * (document.body.offsetHeight - imgHeight)) + 'px';
		})
	}

	// Resize images if height of image is more than height of device.
	function resizeImage() {
		var maxHeight = window.innerHeight;

		screenList.forEach(function (elem, i) {
			var img = screenList[i].querySelector('img');
			var imgHeight = img.offsetHeight;

			if (imgHeight > maxHeight) {
				var ratio = maxHeight / imgHeight;
				img.style.height = (imgHeight * ratio) + 'px';
			}
		})
	}
};
