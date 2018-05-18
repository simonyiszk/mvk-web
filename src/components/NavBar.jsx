import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { Link, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import MVKLogoWhiteURL from '../data/assets/mvk-logo-white.svg';
import styles from './NavBar.module.scss';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowScrollY: 0,
    };

    this.handleScroll = this.handleScroll.bind(this);

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  handleScroll() {
    this.setState({
      windowScrollY: window.scrollY,
    });
  }

  render() {
    const { style, ...props } = this.props;
    const { windowScrollY } = this.state;

    return (
      <AppBar
        elevation={windowScrollY === 0 ? 0 : undefined}
        style={{
          transition: 'all 0.5s ease-out',
          ...(windowScrollY === 0
            ? {
                background: 'transparent',
                textShadow: '0 0 0.75em rgba(0, 0, 0, 0.8)',
              }
            : {}),
          ...style,
        }}
        {...props}
      >
        <Toolbar>
          <div className={styles.brandContainer}>
            <Link to="/">
              <img
                src={MVKLogoWhiteURL}
                alt="Kezdőlap"
                className={styles.brandLogo}
              />
            </Link>
          </div>

          <StaticQuery
            query={graphql`
              query NavBarQuery {
                allNavbarItemsYaml {
                  edges {
                    node {
                      label
                      url
                    }
                  }
                }
              }
            `}
            render={staticData =>
              staticData.allNavbarItemsYaml.edges.map(({ node }) => (
                <Button
                  key={node.url}
                  component={Link}
                  to={node.url}
                  color="inherit"
                >
                  {node.label}
                </Button>
              ))
            }
          />
        </Toolbar>
      </AppBar>
    );
  }
}

NavBar.propTypes = {
  style: PropTypes.shape(),
};

NavBar.defaultProps = {
  style: {},
};
