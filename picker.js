var UI = UI || {};

UI.Picker = function(name, o) {
	
	o = o || {};

	if(!name) {
		throw new TypeError();
	}

	this.name = name;
	this.position = 0;
	this.fields = o.fields || [];
	this.control = o.control || {};
	this.setPosition(o.position);
	this.initDOMModel();

};

UI.Picker.prototype.next = function() {
	this.increase();
	return this.getValue();
}

UI.Picker.prototype.prev = function() {
	this.decrease();
	return this.getValue();
}

UI.Picker.prototype.setControl = function(o) {
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

UI.Picker.prototype.getControl = function() {
	return JSON.parse(JSON.stringify(this.control));
}

UI.Picker.prototype.setPosition = function(position) {
	if(position >= 0 && position < this.fields.length) {
		this.position = position;
	}

	return this.position;
}

UI.Picker.prototype.getPosition = function() {
	return this.position;
}

UI.Picker.prototype.increase = function() {
	if(this.position + 1 < this.fields.length) {
		this.position++;
	}

	return this.position;
}

UI.Picker.prototype.decrease = function() {
	if(this.position - 1 >= 0) {
		this.position--;
	}

	return this.position;
}

UI.Picker.prototype.addField = function(field) {
	if(Array.isArray(field)) {
		for(var i = 0; i < field.length; i++) {
			if(field[i] && field[i].data && field[i].caption) {
				this.fields.push(field[i]);
			}
		}
	}
	else if(field && field.data && field.caption) {
		this.fields.push(field);
	}

	this.update();

	return field && field.data && field.caption;
}

UI.Picker.prototype.createDOModel = function() {

	var increase = this.increase.bind(this);
	var decrease = this.decrease.bind(this);

	var rootNode = document.createElement('div');
	rootNode.setAttribute('class', 'data-picker');

	var leftArrow = document.createElement('button');
	leftArrow.setAttribute('class', 'controls left');



	leftArrow.addEventListener('click', function() {
		this.nextSibling.firstChild.style.marginLeft = -decrease() * 100 + '%';
	}, false);

	var dataNode = document.createElement('ul');
	dataNode.setAttribute('class', 'data');

	var rightArrow = document.createElement('button');
	rightArrow.setAttribute('class', 'controls right');
	rightArrow.addEventListener('click', function() {
		this.previousSibling.firstChild.style.marginLeft = -increase() * 100 + '%';
	}, false);

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

	return {
		rootNode: rootNode,
		leftArrow: leftArrow,
		rightArrow: rightArrow,
		dataNode: dataNode,
		dataCount: this.fields.length
	} || false;
}

UI.Picker.prototype.initDOMModel = function(o) {
	this.model = o || this.createDOModel();

	this.model.dataNode.firstChild.style.marginLeft = -this.position * 100 + '%';

	var replaceElement = document.querySelector('datapicker[name=' + this.name + ']');
	this.model.rootNode.setAttribute('class', this.model.rootNode.getAttribute('class') + ' ' + replaceElement.getAttribute('class'));
	replaceElement.parentNode.replaceChild(this.model.rootNode, replaceElement);

	return true;
}

UI.Picker.prototype.updateDOMModel = function() {
	if(!this.model) {
		return initDOMModel();
	}

	for(var tempNode; this.model.dataCount < this.fields.length; this.model.dataCount++) {
		tempNode = document.createElement('li');
		tempNode.setAttribute('class', 'item');
		tempNode.setAttribute('data-value', this.fields[this.model.dataCount].data);
		tempNode.appendChild(document.createTextNode(this.fields[this.model.dataCount].caption));

		this.model.dataNode.appendChild(tempNode);
	}

	return true;
} 

UI.Picker.prototype.init = function() {
	//var document.querySelector('datapicker[name=' + this.name + ']');
}

UI.Picker.prototype.update = function() {
	this.updateDOMModel();
}

UI.Picker.prototype.getValue = function() {
	return this.fields[this.position].data;
}

var x = new UI.Picker('sound', {
	fields: [
		{
			data: true,
			caption: 'Yes'
		},
		{
			data: false,
			caption: 'No'
		},
		{
			data: true,
			caption: 'Maybe'
		}
	]
});

var z = new UI.Picker('video', {
	fields: [
		{
			data: true,
			caption: 'Yes'
		},
		{
			data: false,
			caption: 'No'
		},
		{
			data: true,
			caption: 'Yes'
		},
		{
			data: false,
			caption: 'No'
		},
		{
			data: true,
			caption: 'Yes'
		},
		{
			data: false,
			caption: 'No'
		},
		{
			data: true,
			caption: 'Maybe'
		}
	],
	position: 1
});
