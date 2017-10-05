/*TO_DO_LIST
	книпки утопают при нажатии, убрать выделение для кнопок-ссылок
*/

$(document).ready(function() {
	var buttons = [];
	var display = $("#display");
	var symbolButtons = {
		'dot': '.',
		'devidedBy': '/',
		'times': '*',
		'minus': '-',
		'plus': '+'
	};
	var symbolKeys = {
		42: '*',
		43: '+',
		44: '.',
		45: '-',
		46: '.',
		47: '/',
		48: 0,
		49: 1,
		50: 2,
		51: 3,
		52: 4,
		53: 5,
		54: 6,
		55: 7,
		56: 8,
		57: 9
	};

	//create a constructor and prototype
	function Button (element) {
		this.element = element;
		this.value = element.getAttribute('id');
	}

	//функции кнопок
	Button.prototype.buttonFunction = function() {
		var expressionLength = display.html().length;
		if (expressionLength < 16) {
			if (this.element.getAttribute('class') == 'button yellow') {
				displayHtmlCheckZero();
				display.append(this.value[1]);
			} else {
				display.append(symbolButtons[this.value]);
			}
		}
		switch (this.value) {
			case 'c': display.html('0');
				break;
			case 'backspace': display.html(backspace());
				break;
			case 'equals':
				display.html(calculate()); 
				break;
		}
	};
		
	//проверяет выражение по маске, возвращает результат
	function calculate () {
		var expression = display.text();
		var regex = /^\-?\d+(\.\d+)?([\+\-\/\*]\d+(\.\d+)?([\+\-\/\*]\d+(\.\d+)?)*)*$/;
		if (expression.length < 16 && regex.test(expression)) {
			var result;
			function calculateExpression(expression) {
 				return (new Function('return ' + expression))();
			}
			result = String((Math.round(calculateExpression(expression) * 1000) / 1000));
			if (result.length > 15) {
				return expression;
			}
			br(result);
			return result;
		} else {
			return expression;
		}
	}
	
	//если символы не входят в дисплей
	function br(string) {
		var stringLength = string.length;
		if (stringLength >= 8 && stringLength < 16) {
			display.css({	'font-size': '50%',
							'padding-top': '30px'}
			);
		} else if (stringLength < 8) {
			display.css({	'font-size': '100%',
							'padding-top': '0px'}
			);
		}  
	}

	function backspace() {
		if (display.html() == 0) {
			return 0;
		} else {
			var html = display.html();
			html = html.substr(0, (html.length - 1));
			return html;
		}
	}

	//добавление кнопки в массив кнопок
	function addButtonToArray (target) {
		var button = new Button (target);
		buttons.push(button);
		return button;
	}

	//создаем объект кнопки по клику, если в массиве нет, добавляем
	//вызываем функцию-действие для кнопки
	$('.button span').click(function(evt) {
		evt.preventDefault();
		var expressionLength = display.html().length;
		var button;
		var index;
		var flag = false;
		for (var i = 0; i < buttons.length; i++) {
			if (buttons[i].element == evt.target.parentNode) {
					index = i;
				flag=true;
				
			}
		}
			
		button = flag ? buttons[index] : addButtonToArray(evt.target.parentNode);
		
			button.buttonFunction();
		br(display.html());
	});//end click

	//обработчик для клавиш Delete, Esc, Enter, Backspace
	$(document).keyup(function(evt) {
		switch (evt.which) {
			case 27: //Esc
			case 46: //Delete
				display.html('0');
				break;
			case 8: display.html(backspace()); //Backspace
				break;
			case 13: //Enter
				display.html(calculate()); 
				break;
		}
		br(display.html());
	});//end keyup

	function displayHtmlCheckZero () {
		if (display.html() == 0) {
			display.html('');
		}
	}

	//обработчик цифр и символов
	$(document).keypress(function(evt) {
		var expressionLength = display.html().length;
		if (expressionLength < 16) {
			if (evt.which >= 48 && evt.which <= 58) { 
				displayHtmlCheckZero ();
			}
		display.append(symbolKeys[evt.which]);
		br(display.html());
		}
	});
	
});//end ready
