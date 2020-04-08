import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Select } from 'semantic-ui-react'
import { observable, action, computed } from 'mobx'
import { observer } from 'mobx-react'

import { TypeaheadApi } from '@api'

@observer
export default class Typeahead extends Component {
  static propTypes = {
    source: PropTypes.string.isRequired,
    allowAdditions: PropTypes.bool,
    value: PropTypes.any,
  }

  static defaultProps = {
    allowAdditions: false,
  }

  @observable loading = false
  @observable options = []
  @observable savedOptions = []

  debouncer = null

  @computed get allowAdditions() {
    return this.props.allowAdditions
  }

  constructor(props) {
    super(props)

    this.api = TypeaheadApi(props.source)
  }

  @action addItem = (_, { value }) => {
    this.options.push({ text: value, value })
  }

  loadOptions = (_, { searchQuery }) => {
    if(this.debouncer) { clearTimeout(this.debouncer) }
    if(searchQuery.length < 3) { return }

    this.debouncer = setTimeout(action(() => {
      this.loading = true
      this.api(searchQuery).then((result) => {
        this.options = result.data
        this.loading = false
      })
    }), 500)
  }

  render() {
    const { source, value, ...rest } = this.props
    return <Select
      search
      value={value}
      options={this.options.concat(this.savedOptions)}
      loading={this.loading}
      allowAdditions={this.allowAdditions}

      onSearchChange={this.loadOptions}
      onAddItem={this.addItem}

      {...rest}
    />
  }
}
