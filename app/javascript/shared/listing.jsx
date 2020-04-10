import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import cx from 'classnames'
import { keys, get, isFunction } from 'lodash'

import { Divider, List, Segment, Transition, Visibility } from 'semantic-ui-react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import './listing.scss'

function InternalList(props) {
  const { children, className, loading, paging, onBottomVisible, ...rest } = props
  const classes = cx(className, 'listing')

  return <Segment className={classes} loading={loading} basic>
    <List {...rest}>{children}</List>
    {paging && <Visibility onOnScreen={onBottomVisible} once={false} />}
  </Segment>
}

InternalList.propTypes = {
  paging: PropTypes.bool,
  loading: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  onBottomVisible: PropTypes.func,
}

const DIVIDER_FORMATS = {
  day: 'MMMM D, YYYY',
  month: 'MMMM YYYY',
}

@observer
export default class Listing extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    fetcher: PropTypes.func.isRequired,
    renderer: PropTypes.func.isRequired,
    fallback: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    dividedBy: PropTypes.oneOf(keys(DIVIDER_FORMATS)),
    dividedProp: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    dividedBy: 'day',
  }

  @observable loading = false

  currentDivider = ''

  pages = 0

  page = 0

  constructor(props) {
    super(props)

    this.hasDivider = !!get(props, 'dividedProp.length')
  }

  @action componentDidMount() {
    if(this.props.items.length === 0) {
      this.fetch()
    } else {
      this.page = 1
    }
  }

  get hasMorePages() {
    return this.pages === 0 || this.pages > this.page
  }

  newDivider(item) {
    const format = DIVIDER_FORMATS[this.props.dividedBy]
    const value = moment(get(item, this.props.dividedProp)).format(format)
    if(value === this.currentDivider || !value.length) { return false }

    this.currentDivider = value
    return true
  }

  @action fetch = () => {
    if(this.loading) { return }
    const { fetcher, items } = this.props

    this.loading = true
    return fetcher({ page: this.page += 1 }).then(result => {
      result.update([...items, ...result.data])
      this.loading = false

      if(this.pages === 0) {
        this.pages = Number(result.headers['x-chunks'])
      }
    })
  }

  render() {
    this.currentDivider = ''
    const { items, className } = this.props
    const sendProps = {
      loading: this.loading,
      divided: this.hasDivider,
      paging: this.hasMorePages,
      onBottomVisible: this.fetch,
    }

    const classes = cx(className, { empty: items.length === 0 })

    return <Fragment>
      <Transition.Group as={InternalList} animation="scale" duration={300} className={classes} {...sendProps}>
        {items.length === 0 ? this.renderFallback() : this.renderItemsList()}
      </Transition.Group>
    </Fragment>
  }

  renderFallback() {
    const { fallback } = this.props
    if(this.loading || !fallback) { return null }

    return <List.Item className="fallback">
      {isFunction(fallback) ? fallback(this) : fallback}
    </List.Item>
  }

  renderItemsList() {
    const result = []
    this.props.items.map((item, idx) => {
      if(this.hasDivider && this.newDivider(item)) {
        result.push(this.renderDivider())
      }

      result.push(this.renderItem(item, idx))
    })

    return result
  }

  renderDivider() {
    return <List.Item className="divider" key={`d-${this.currentDivider}`}>
      <Divider horizontal>
        {this.currentDivider}
      </Divider>
    </List.Item>
  }

  renderItem(item, idx) {
    return <List.Item key={idx}>
      {this.props.renderer(item, idx, this)}
    </List.Item>
  }
}
