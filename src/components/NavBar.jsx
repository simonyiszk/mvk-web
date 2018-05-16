import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { Link, StaticQuery } from 'gatsby';
import React from 'react';
import MVKLogoWhiteURL from '../data/assets/mvk-logo-white.svg';
import styles from './NavBar.module.scss';

const NavBar = ({ ...props }) => (
  <AppBar {...props}>
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

export default NavBar;
