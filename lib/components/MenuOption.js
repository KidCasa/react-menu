'use strict';

var React = require('react');
var buildClassName = require('../mixins/buildClassName');

var MenuOption = module.exports = React.createClass({
  displayName: 'exports',

  propTypes: {
    active: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    onDisabledSelect: React.PropTypes.func,
    disabled: React.PropTypes.bool
  },

  mixins: [buildClassName],

  notifyDisabledSelect: function notifyDisabledSelect() {
    if (this.props.onDisabledSelect) {
      this.props.onDisabledSelect();
    }
  },

  onSelect: function onSelect() {
    if (this.props.disabled) {
      this.notifyDisabledSelect();
      //early return if disabled
      return;
    }
    if (this.props.onSelect) {
      this.props.onSelect();
    }
    this.props._internalSelect();
  },

  handleKeyDown: function handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.onSelect();
    }
  },

  handleClick: function handleClick() {
    this.onSelect();
  },

  handleHover: function handleHover() {
    this.props._internalFocus(this.props.index);
  },

  buildName: function buildName() {
    var name = this.buildClassName('Menu__MenuOption');
    if (this.props.active) {
      name += ' Menu__MenuOption--active';
    }
    if (this.props.disabled) {
      name += ' Menu__MenuOption--disabled';
    }
    return name;
  },

  render: function render() {
    return React.createElement(
      'div',
      {
        onClick: this.handleClick,
        onKeyDown: this.handleKeyDown,
        onMouseOver: this.handleHover,
        className: this.buildName(),
        role: 'menuitem',
        tabIndex: '-1',
        'aria-disabled': this.props.disabled
      },
      this.props.children
    );
  }

});