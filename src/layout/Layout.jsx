import React from 'react'
import PropTypes from 'prop-types'

import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

/**
 * Layout component that provides a common structure for pages, including a header,
 * content area (children), and footer.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {React.Node} props.children - The content to be rendered inside the layout.
 *
 * @returns {JSX.Element} The rendered layout with header, content (children), and footer.
 */
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

Layout.propTypes = {
  /**
   * The children prop is expected to be any valid React node.
   * This allows the Layout component to wrap any content passed to it,
   * such as other components, text, or elements.
   */
  children: PropTypes.node.isRequired,
}

export default Layout
