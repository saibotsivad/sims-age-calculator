var App = (function () { 'use strict';

function recompute ( state, newState, oldState, isInitial ) {
	if ( isInitial || ( 'yearsOld' in newState && differs( state.yearsOld, oldState.yearsOld ) ) ) {
		state.remaining = newState.remaining = template.computed.remaining( state.yearsOld );
	}

	if ( isInitial || ( 'daysLeft' in newState && differs( state.daysLeft, oldState.daysLeft ) ) ) {
		state.actualAge = newState.actualAge = template.computed.actualAge( state.daysLeft );
	}
}

var template = (function () {
function ageCalculator(daysRemaining) {
	if (daysRemaining < 553 && daysRemaining >= 0) {
		const daysAvailableInLife = 552 + 72 + 84 + 72
		const daysElapsedInLife = daysAvailableInLife - daysRemaining

		const yearsElapsed = Math.floor(daysElapsedInLife / 12)
		const daysOfLastYearElapsed = daysElapsedInLife % 12

		return {
			years: yearsElapsed,
			days: daysOfLastYearElapsed
		}
	} else {
		return undefined
	}
}

function daysLeftCalculator(years) {
	if (years > 0 && years < 6) {
		return {
			days: 72 - years * 12,
			stage: 'toddler'
		}
	} else if (years >= 6 && years < 13) {
		return {
			days: 84 - (years * 12 - 72),
			stage: 'child'
		}
	} else if (years >= 13 && years < 19) {
		return {
			days: 72 - (years * 12 - 72 - 84),
			stage: 'teen'
		}
	} else if (years >= 19 && years < 65) {
		return {
			days: 552 - (years * 12 - 72 - 84 - 72),
			stage: 'adult'
		}
	} else {
		return undefined
	}
}

return {
	data() {
		return {
			yearsOld: '',
			daysLeft: ''
		}
	},
	computed: {
		remaining(yearsOld) {
			return daysLeftCalculator(yearsOld)
		},
		actualAge(daysLeft) {
			return ageCalculator(daysLeft)
		}
	}
}
}());

function create_main_fragment ( state, component ) {
	var p, text, text_1, input, input_updating = false, text_2, text_3, hr, text_4, p_1, text_5, text_6, input_1, input_1_updating = false, text_7, if_block_1_anchor;

	function input_input_handler () {
		input_updating = true;
		component._set({ yearsOld: input.value });
		input_updating = false;
	}

	var if_block = (state.remaining) && create_if_block( state, component );

	function input_1_input_handler () {
		input_1_updating = true;
		component._set({ daysLeft: input_1.value });
		input_1_updating = false;
	}

	var if_block_1 = (state.actualAge) && create_if_block_1( state, component );

	return {
		create: function () {
			p = createElement( 'p' );
			text = createText( "Enter an age from 1 to 64, inclusive:" );
			text_1 = createText( "\n" );
			input = createElement( 'input' );
			text_2 = createText( "\n" );
			if ( if_block ) if_block.create();
			text_3 = createText( "\n\n" );
			hr = createElement( 'hr' );
			text_4 = createText( "\n\n" );
			p_1 = createElement( 'p' );
			text_5 = createText( "Or, enter days left in adult stage:" );
			text_6 = createText( "\n" );
			input_1 = createElement( 'input' );
			text_7 = createText( "\n" );
			if ( if_block_1 ) if_block_1.create();
			if_block_1_anchor = createComment();
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			p.className = "lead";
			input.type = "text";
			input.className = "form-control";
			input.placeholder = "Age in whole years";

			addListener( input, 'input', input_input_handler );

			p_1.className = "lead";
			input_1.type = "text";
			input_1.className = "form-control";
			input_1.placeholder = "Days remaining";

			addListener( input_1, 'input', input_1_input_handler );
		},

		mount: function ( target, anchor ) {
			insertNode( p, target, anchor );
			appendNode( text, p );
			insertNode( text_1, target, anchor );
			insertNode( input, target, anchor );

			input.value = state.yearsOld;

			insertNode( text_2, target, anchor );
			if ( if_block ) if_block.mount( target, anchor );
			insertNode( text_3, target, anchor );
			insertNode( hr, target, anchor );
			insertNode( text_4, target, anchor );
			insertNode( p_1, target, anchor );
			appendNode( text_5, p_1 );
			insertNode( text_6, target, anchor );
			insertNode( input_1, target, anchor );

			input_1.value = state.daysLeft;

			insertNode( text_7, target, anchor );
			if ( if_block_1 ) if_block_1.mount( target, anchor );
			insertNode( if_block_1_anchor, target, anchor );
		},

		update: function ( changed, state ) {
			if ( !input_updating ) {
				input.value = state.yearsOld;
			}

			if ( state.remaining ) {
				if ( if_block ) {
					if_block.update( changed, state );
				} else {
					if_block = create_if_block( state, component );
					if_block.create();
					if_block.mount( text_3.parentNode, text_3 );
				}
			} else if ( if_block ) {
				if_block.unmount();
				if_block.destroy();
				if_block = null;
			}

			if ( !input_1_updating ) {
				input_1.value = state.daysLeft;
			}

			if ( state.actualAge ) {
				if ( if_block_1 ) {
					if_block_1.update( changed, state );
				} else {
					if_block_1 = create_if_block_1( state, component );
					if_block_1.create();
					if_block_1.mount( if_block_1_anchor.parentNode, if_block_1_anchor );
				}
			} else if ( if_block_1 ) {
				if_block_1.unmount();
				if_block_1.destroy();
				if_block_1 = null;
			}
		},

		unmount: function () {
			detachNode( p );
			detachNode( text_1 );
			detachNode( input );
			detachNode( text_2 );
			if ( if_block ) if_block.unmount();
			detachNode( text_3 );
			detachNode( hr );
			detachNode( text_4 );
			detachNode( p_1 );
			detachNode( text_6 );
			detachNode( input_1 );
			detachNode( text_7 );
			if ( if_block_1 ) if_block_1.unmount();
			detachNode( if_block_1_anchor );
		},

		destroy: function () {
			removeListener( input, 'input', input_input_handler );
			if ( if_block ) if_block.destroy();
			removeListener( input_1, 'input', input_1_input_handler );
			if ( if_block_1 ) if_block_1.destroy();
		}
	};
}

function create_if_block ( state, component ) {
	var h2, text_value, text, text_1, small, text_2, text_3, text_4_value, text_4, text_5, small_1, text_6;

	return {
		create: function () {
			h2 = createElement( 'h2' );
			text = createText( text_value = state.remaining.days );
			text_1 = createText( " " );
			small = createElement( 'small' );
			text_2 = createText( "days left in" );
			text_3 = createText( " " );
			text_4 = createText( text_4_value = state.remaining.stage );
			text_5 = createText( " " );
			small_1 = createElement( 'small' );
			text_6 = createText( "stage" );
		},

		mount: function ( target, anchor ) {
			insertNode( h2, target, anchor );
			appendNode( text, h2 );
			appendNode( text_1, h2 );
			appendNode( small, h2 );
			appendNode( text_2, small );
			appendNode( text_3, h2 );
			appendNode( text_4, h2 );
			appendNode( text_5, h2 );
			appendNode( small_1, h2 );
			appendNode( text_6, small_1 );
		},

		update: function ( changed, state ) {
			if ( text_value !== ( text_value = state.remaining.days ) ) {
				text.data = text_value;
			}

			if ( text_4_value !== ( text_4_value = state.remaining.stage ) ) {
				text_4.data = text_4_value;
			}
		},

		unmount: function () {
			detachNode( h2 );
		},

		destroy: noop
	};
}

function create_if_block_1 ( state, component ) {
	var h2, text_value, text, text_1, small, text_2, text_3, text_4_value, text_4, text_5, small_1, text_6;

	return {
		create: function () {
			h2 = createElement( 'h2' );
			text = createText( text_value = state.actualAge.years );
			text_1 = createText( " " );
			small = createElement( 'small' );
			text_2 = createText( "years, and" );
			text_3 = createText( " " );
			text_4 = createText( text_4_value = state.actualAge.days );
			text_5 = createText( " " );
			small_1 = createElement( 'small' );
			text_6 = createText( "days old" );
		},

		mount: function ( target, anchor ) {
			insertNode( h2, target, anchor );
			appendNode( text, h2 );
			appendNode( text_1, h2 );
			appendNode( small, h2 );
			appendNode( text_2, small );
			appendNode( text_3, h2 );
			appendNode( text_4, h2 );
			appendNode( text_5, h2 );
			appendNode( small_1, h2 );
			appendNode( text_6, small_1 );
		},

		update: function ( changed, state ) {
			if ( text_value !== ( text_value = state.actualAge.years ) ) {
				text.data = text_value;
			}

			if ( text_4_value !== ( text_4_value = state.actualAge.days ) ) {
				text_4.data = text_4_value;
			}
		},

		unmount: function () {
			detachNode( h2 );
		},

		destroy: noop
	};
}

function App ( options ) {
	options = options || {};
	this._state = assign( template.data(), options.data );
	recompute( this._state, this._state, {}, true );

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root || this;
	this._yield = options._yield;

	this._torndown = false;

	this._fragment = create_main_fragment( this._state, this );

	if ( options.target ) {
		this._fragment.create();
		this._fragment.mount( options.target, null );
	}
}

assign( App.prototype, {
 	get: get,
 	fire: fire,
 	observe: observe,
 	on: on,
 	set: set,
 	_flush: _flush
 });

App.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = assign( {}, oldState, newState );
	recompute( this._state, newState, oldState, false )
	dispatchObservers( this, this._observers.pre, newState, oldState );
	this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

App.prototype.teardown = App.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	if ( detach !== false ) this._fragment.unmount();
	this._fragment.destroy();
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

function createElement(name) {
	return document.createElement(name);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function createText(data) {
	return document.createTextNode(data);
}

function appendNode(node, target) {
	target.appendChild(node);
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function createComment() {
	return document.createComment('');
}

function differs(a, b) {
	return a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

function assign(target) {
	var k,
		source,
		i = 1,
		len = arguments.length;
	for (; i < len; i++) {
		source = arguments[i];
		for (k in source) target[k] = source[k];
	}

	return target;
}

function dispatchObservers(component, group, newState, oldState) {
	for (var key in group) {
		if (!(key in newState)) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		if (differs(newValue, oldValue)) {
			var callbacks = group[key];
			if (!callbacks) continue;

			for (var i = 0; i < callbacks.length; i += 1) {
				var callback = callbacks[i];
				if (callback.__calling) continue;

				callback.__calling = true;
				callback.call(component, newValue, oldValue);
				callback.__calling = false;
			}
		}
	}
}

function noop() {}

function get(key) {
	return key ? this._state[key] : this._state;
}

function fire(eventName, data) {
	var handlers =
		eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
}

function observe(key, callback, options) {
	var group = options && options.defer
		? this._observers.post
		: this._observers.pre;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function() {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	this._root._flush();
}

function _flush() {
	if (!this._renderHooks) return;

	while (this._renderHooks.length) {
		this._renderHooks.pop()();
	}
}

return App;

}());