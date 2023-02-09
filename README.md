A debounce function that's more reliable, performs better &amp; indicates why it's executing the function.

&nbsp;
&nbsp;

# Debounce Options
### Leading
```javascript
window.debounce(function () {
  if(status === -1) console.log("This leading call was fired call of a new debounce");
}, 500, { leading: true });
```
The leading flag calls back on the start of a new debounce

&nbsp;

### Max Wait
```javascript
window.debounce(function () {
  console.log("This callback will be called after 500ms and by 1800ms");
}, 500, { maxWait: 1800 });
```
The debounce session will last up to the specified time before ending forcefully

&nbsp;

### Trailing
```javascript
window.debounce(function (status) {
  if(-1 === status) console.log("This is the leading call");
  else console.log("This will never get called");
}, 500, { leading: true, trailing: false });
```
Setting trailing to false will prevent any callback at the end of a debounce. A true value will ensure that your callback function always receives a trailing flag even if maxWait is triggered.

&nbsp;

&nbsp;

# Callback status
```javascript
const leading = -1;
const maxWait = 0;
const trailing = 1;

window.debounce(function (status) {
  console.log("DEBOUNCE STATUS: " + status);
}, 500);
```
Returns a different status depending on the reason the provided callback is being executed.

&nbsp;

&nbsp;

# Examples
```javascript
const debouncedFunc = window.debounce(function(status, passedArg){
  console.log(passedArg);
}, 500);
debouncedFunc("Execute this after 500ms");
```
A button that will only execute if it is left alone for 500ms

&nbsp;

```javascript
const debouncedFunc = window.debounce(function(status){
  console.log(status);
}, 500, { maxWait: 1000 });
```
A button that will wait 500ms to execute, or if clicked repeatedly, will execute after up to 1000ms of waiting

&nbsp;

```javascript
const debouncedFunc = window.debounce(function(status){
  console.log(status);
}, 500, { maxWait: 1000, trailing: true });
```
A button that will wait 500ms to execute, or if clicked repeatedly, will execute after up to 1000ms of waiting. If maxWait occurs before the trailing callback, it will wait another 500ms and then execute with a trailing flag.

&nbsp;

```javascript
const debouncedFunc = window.debounce(function(status){
  console.log(status);
}, 500, { leading: true });
```
A button that will execute instantly, and then a second time after being left alone for 500ms

&nbsp;

```javascript
const debouncedFunc = window.debounce(function(status){
  console.log(status);
}, 1000, { leading: true, maxWait: 1000, trailing: false });
```
A button that executes on click, and then freezes for 1000ms

&nbsp;

```javascript
const debouncedFunc = window.debounce(function(status){
  console.log(status);
}, 500, { leading: true, maxWait: 1000, trailing: false });
```
A button that executes on click, and then freezes for 500ms or up to 1000ms

&nbsp;

```javascript
const debouncedFunc = window.debounce(function(status, arg1, arg2){
  console.log(arg1, arg2);
}, 500);
debouncedFunc("Strawberry", "Milkshake");
debouncedFunc("Orange", "Soda");
debouncedFunc("Chocolate", "Sundae");
debouncedFunc("Apple", "Juice");
```
Uses the last arguments in the current session, printing "Apple Juice". Will pass any number of arguments through.
