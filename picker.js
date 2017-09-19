var O = {};

O.Picker = function(o) {
	
	o = o || {};

	this.position = o.position || 0;
	this.fields = o.fields || [];
	this.control = o.control || {};


};

O.Picker.prototype.next = function() {
	return this.increase();
}

O.Picker.prototype.prev = function() {
	return this.decrease();
}

O.Picker.prototype.setControl = function(o) {
	this.control.mouse = (o.mouse === undefined) ? this.control.mouse : o.mouse;
	this.control.touch = (o.touch === undefined) ? this.control.touch : o.touch;
	this.control.slide = (o.slide === undefined) ? this.control.slide : o.slide;

	if(o.keyboard && o.keyboard.left && o.keyboard.right) {
		this.control.keyboard = {
			left: o.keyboard.left,
			right: o.keyboard.right
		};
	}

	return true;
}

O.Picker.prototype.getControl = function() {
	return JSON.parse(JSON.stringify(this.control));
}

O.Picker.prototype.setPosition = function(position) {
	if(position >= 0 && position < this.fields.length) {
		this.position = position;
	}

	return this.position;
}

O.Picker.prototype.getPosition = function() {
	return this.position;
}

O.Picker.prototype.increase = function() {
	if(this.position + 1 < this.fields.length) {
		this.position++;
	}

	return this.position;
}

O.Picker.prototype.decrease = function() {
	if(this.position - 1 >= 0) {
		this.position--;
	}

	return this.position;
}

O.Picker.prototype.addField = function(field) {
	if(field && field.data && field.caption) {
		this.fields.push(field);
	}

	return field && field.data && field.caption;
}

O.Picker.prototype.createDOModel = function() {
	var rootNode = document.createElement('div');
	rootNode.setAttribute('class', 'data-picker');

	var leftArrow = document.createElement('div');
	leftArrow.setAttribute('class', 'controls left');

	var dataNode = document.createElement('ul');
	dataNode.setAttribute('class', 'data');

	var rightArrow = document.createElement('div');
	rightArrow.setAttribute('class', 'controls right');

	for(var i = 0, tempNode; i < this.fields.length; i++) {
		tempNode = document.createElement('li');
		tempNode.setAttribute('class', 'item');
		tempNode.setAttribute('data-value', this.fields[i].data);
		tempNode.appendChild(document.createTextNode(this.fields[i].caption));
		
		dataNode.appendChild(tempNode);
	}

	rootNode.appendChild(leftArrow);
	rootNode.appendChild(dataNode);
	rootNode.appendChild(rightArrow);

	return rootNode || false;
}

O.Picker.prototype.buildDOMModel = function(o) {

}

O.Picker.prototype.init = function() {
	var document.querySelector('datapicker[name=' + o.name + ']');
} 