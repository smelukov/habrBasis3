let Value = require('basis.data').Value;
let Expression = require('basis.data.value').Expression;
let STATE = require('basis.data').STATE;
let Node = require('basis.ui').Node;

module.exports = Node.subclass({
  active: basis.PROXY,
  binding: {
    loading: Value.query('childNodesState').as(state => state == STATE.PROCESSING),
    error: Value.query('childNodesState').as(state => state == STATE.ERROR && state.data),
    empty: node => new Expression(
      Value.query(node, 'childNodesState'),
      Value.query(node, 'dataSource.itemCount'),
      (state, itemCount) => !itemCount && state == STATE.READY
    )
  },
  handler: {
    activeChanged() {
      if (this.active) {
        this.dataSource.deprecate();
      }
    }
  }
});
