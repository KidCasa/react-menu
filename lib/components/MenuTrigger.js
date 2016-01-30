'use strict';

var React = require('react');
var buildClassName = require('../mixins/buildClassName');

var MenuTrigger = module.exports = React.createClass({
  displayName: 'exports',

  contextTypes: {
    id: React.PropTypes.string,
    active: React.PropTypes.bool
  },

  mixins: [buildClassName],

  toggleActive: function toggleActive() {
    this.props.onToggleActive(!this.context.active);
  },

  handleKeyUp: function handleKeyUp(e) {
    if (e.key === ' ') this.toggleActive();
  },

  handleKeyDown: function handleKeyDown(e) {
    if (e.key === 'Enter') this.toggleActive();
  },

  handleClick: function handleClick() {
    this.toggleActive();
  },

  render: function render() {
    var triggerClassName = this.buildClassName('Menu__MenuTrigger ' + (this.context.active ? 'Menu__MenuTrigger__active' : 'Menu__MenuTrigger__inactive'));

    return React.createElement(
      'div',
      {
        className: triggerClassName,
        onClick: this.handleClick,
        onKeyUp: this.handleKeyUp,
        onKeyDown: this.handleKeyDown,
        tabIndex: '0',
        role: 'button',
        'aria-owns': this.context.id,
        'aria-haspopup': 'true'
      },
      this.props.children
    );
  }

});