/**
 * @file: model-comp-v2.js
 * @author: Liang
 */
export const symbol = typeof Symbol === 'function' ? Symbol('model-comp') : '__model-comp__'

export function isViewModel(Comp) {
  return !!Comp[symbol]
}

function slice(props) {
  // eslint-disable-next-line no-unused-vars
  const { local, ...rest } = props
  return rest
}

export default function modelComp(CompClass) {
  if (isViewModel(CompClass)) {
    return CompClass
  }

  class WrappedComp extends CompClass {
    get local() {
      return this.props.local
    }

    static [symbol] = true

    componentDidMount() {
      if (this.props.local) {
        this.props.local.init && this.props.local.init(slice(this.props))
      }

      if (super.componentDidMount) {
        super.componentDidMount.apply(this, arguments)
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.local !== this.props.local) {
        if (this.props.local.exit) {
          this.props.local.exit(slice(this.props))
        }
        if (nextProps.local.init) {
          nextProps.local.init(slice(nextProps))
        }
        if (super.componentWillReceiveProps) {
          super.componentWillReceiveProps.apply(this, arguments)
        }
        return
      }

      if (this.props.local) {
        if (this.props.local.update) {
          this.props.local.update(slice(nextProps))
        }
        else if (this.props.local.init) {
          this.props.local.init(slice(nextProps))
        }
      }

      if (super.componentWillReceiveProps) {
        super.componentWillReceiveProps.apply(this, arguments)
      }
    }

    componentWillUnmount() {
      this.props.local
      && this.props.local.exit && this.props.local.exit(slice(this.props))
      if (super.componentWillUnmount) {
        super.componentWillUnmount.apply(this, arguments)
      }
    }
  }

  return WrappedComp
}
