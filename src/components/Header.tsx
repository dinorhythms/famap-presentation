import React, { Component } from 'react'

interface IProps {
    title: string;
}
class Header extends Component<IProps> {
  render() {
      const { title } = this.props;
    return (
      <div>
          <section className="pt-4 pb-4">
              <div className="container">
                <div className="row">
                    <div className="col">
                        <h2 className="">{title}</h2>
                    </div>
                </div>
              </div>
          </section>
      </div>
    )
  }
}

export default Header
