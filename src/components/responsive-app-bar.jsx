import Link from 'gatsby-link';
import { css } from 'glamor';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import Hidden from 'material-ui/Hidden';
import IconButton from 'material-ui/IconButton';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withTheme } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import 'normalize.css';
import PropTypes from 'prop-types';
import React from 'react';
import Headroom from 'react-headroom';
import BarsIcon from 'react-icons/lib/fa/bars';
import MVKLogo from '../components/mvk-logo';

const drawerWidth = '17.5rem';

const NavLink = ({ ...props }) => <Link activeClassName="active" {...props} />;

class ResponsiveAppBar extends React.Component {
  static propTypes = {
    hideLogoWhenUnfixed: PropTypes.bool,
    theme: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    hideLogoWhenUnfixed: false,
  };

  state = {
    isDrawerOpen: false,
  };

  handleDrawerOpen = () => {
    this.setState({ isDrawerOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ isDrawerOpen: false });
  };

  render() {
    const { hideLogoWhenUnfixed, theme } = this.props;

    return (
      <div>
        <Headroom
          disableInlineStyles
          {...css({
            '& #header-logo-container, & header': {
              transitionDuration: '0.4s',
              transitionProperty: 'background-color, box-shadow, opacity, transform, visibility',
            },
            '&.headroom--pinned.headroom--scrolled': {
              '& #header-logo-container': {
                opacity: 1,
                visibility: 'visible',
              },
            },
            '&.headroom--unfixed': {
              '& header': {
                backgroundColor: 'transparent',
                boxShadow: 'none',
              },
            },
            '&.headroom--unpinned': {
              '& header': {
                boxShadow: 'none',
                transform: 'translateY(-100%)',
              },
            },
          })}
        >
          <AppBar>
            <Toolbar {...css({ '& a': { textDecoration: 'none' } })}>
              <Hidden mdUp implementation="css">
                <IconButton
                  color="contrast"
                  aria-label="open drawer"
                  onClick={this.handleDrawerOpen}
                >
                  <BarsIcon />
                </IconButton>
              </Hidden>

              <Typography
                id="header-logo-container"
                type="title"
                {...css({
                  [theme.breakpoints.down('md')]: {
                    textAlign: 'center',
                  },
                  flex: 1,
                  opacity: hideLogoWhenUnfixed && 0,
                  visibility: hideLogoWhenUnfixed && 'hidden',
                })}
              >
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <Link to="/" exact>
                  <MVKLogo white {...css({ height: '2rem' })} />
                </Link>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
              </Typography>

              <Hidden mdDown implementation="css">
                <NavLink to="/about">
                  <Button color="contrast">Bemutatkozás</Button>
                </NavLink>
                <NavLink to="/teams">
                  <Button color="contrast">Csapatok</Button>
                </NavLink>
                <NavLink to="/events">
                  <Button color="contrast">Eseménynaptár</Button>
                </NavLink>
                <NavLink to="/development-center">
                  <Button color="contrast">Fejlesztői Központ</Button>
                </NavLink>
              </Hidden>
            </Toolbar>
          </AppBar>
        </Headroom>

        <Drawer
          open={this.state.isDrawerOpen}
          onRequestClose={this.handleDrawerClose}
          classes={{
            paper: `${css({ width: drawerWidth })}`,
          }}
          {...css({ '& a': { color: 'inherit', textDecoration: 'none' } })}
        >
          <div {...css(theme.mixins.toolbar)} />

          <Divider />

          <List>
            <NavLink to="/about" onClick={this.handleDrawerClose}>
              <ListItem button>
                <ListItemText primary="Bemutatkozás" />
              </ListItem>
            </NavLink>
            <NavLink to="/teams" onClick={this.handleDrawerClose}>
              <ListItem button>
                <ListItemText primary="Csapatok" />
              </ListItem>
            </NavLink>
            <NavLink to="/events" onClick={this.handleDrawerClose}>
              <ListItem button>
                <ListItemText primary="Eseménynaptár" />
              </ListItem>
            </NavLink>
            <NavLink to="/development-center" onClick={this.handleDrawerClose}>
              <ListItem button>
                <ListItemText primary="Fejlesztői Központ" />
              </ListItem>
            </NavLink>
          </List>
        </Drawer>
      </div>
    );
  }
}

export default withTheme()(ResponsiveAppBar);
