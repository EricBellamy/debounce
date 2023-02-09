window.debounce = function (func, wait, options) {
	let timerId,
		leading, trailing,
		maxing, maxWait,
		lastArgs, lastThis,
		lastCallTime, lastInvokeTime;

	if (typeof func !== 'function') throw new TypeError('Expected a function');

	wait = +wait || 0; // Make sure wait is a number
	if (options && (typeof options === "object")) {
		leading = !!options.leading; // undefined -> false
		maxing = 'maxWait' in options;
		maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : wait; // +maxWait || 0 -> ensures number
		trailing = 'trailing' in options ? !!options.trailing : true;
	}

	function invokeFunc(time, status) {
		const args = lastArgs;
		const thisArg = lastThis;

		// clear on trailing or maxWait
		if (status != -1) {
			lastArgs = lastThis = timerId = undefined;
			if (!trailing) return;
		}

		func.apply(thisArg, [status, ...args]);
	}

	function getInvokeReasons(time) {
		const timeSinceLastCall = time - lastCallTime;
		const timeSinceLastInvoke = time - lastInvokeTime;

		return {
			trailingEdge: timeSinceLastCall >= wait, // activity stopped
			bugTrailingEdge: timeSinceLastCall < 0, // system time has gone backwards
			maxWait: maxing && maxWait <= timeSinceLastInvoke // hit maxWait limit
		}
	}

	function timerExpired() {
		const time = Date.now()
		const invokeReasons = getInvokeReasons(time);

		if (invokeReasons.trailingEdge || invokeReasons.bugTrailingEdge) return invokeFunc(time, 1);
		else if (invokeReasons.maxWait) return invokeFunc(time, 0);

		// Restart the timer.
		timerId = startTimer(timerExpired)
	}
	function startTimer(pendingFunc) {
		window.cancelAnimationFrame(timerId);
		return window.requestAnimationFrame(pendingFunc);
	}
	function isInvoking() { return timerId != undefined; }

	return function (...args) {
		const time = Date.now();

		lastArgs = args;
		lastThis = this;
		lastCallTime = time;

		// Start the timer
		if (isInvoking() === false) {
			lastInvokeTime = time;
			if (leading) invokeFunc(time, -1); // Leading call

			timerId = startTimer(timerExpired)
		}
	}
};
