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
import { translate } from 'react-i18next';
import BarsIcon from 'react-icons/lib/fa/bars';
import MVKLogo from '../components/mvk-logo';

const drawerWidth = '17.5rem';

const NavLink = ({ ...props }) => <Link activeClassName="active" {...props} />;

class ResponsiveAppBar extends React.Component {
  static propTypes = {
    hideLogoWhenUnfixed: PropTypes.bool,
    t: PropTypes.func.isRequired,
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
    const { hideLogoWhenUnfixed, t, theme } = this.props;
    const menuItems = t('items', { returnObjects: true });

    return (
      <div>
        <Headroom
          disableInlineStyles
          pinStart={64}
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
                [theme.breakpoints.down('md')]: {
                  backgroundColor: hideLogoWhenUnfixed && 'transparent',
                  boxShadow: hideLogoWhenUnfixed && 'none',
                },
                [theme.breakpoints.up('md')]: {
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                },
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
                {menuItems.map(menuItem => (
                  <NavLink to={menuItem.url} key={menuItem.url}>
                    <Button color="contrast">{menuItem.text}</Button>
                  </NavLink>
                ))}
              </Hidden>
            </Toolbar>
          </AppBar>
        </Headroom>

        {!hideLogoWhenUnfixed && (
          <Hidden mdUp implementation="css">
            <div {...css(theme.mixins.toolbar)} />
          </Hidden>
        )}

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
            {menuItems.map(menuItem => (
              <NavLink to={menuItem.url} onClick={this.handleDrawerClose} key={menuItem.url}>
                <ListItem button>
                  <ListItemText primary={menuItem.text} />
                </ListItem>
              </NavLink>
            ))}
          </List>
        </Drawer>
      </div>
    );
  }
}

export default withTheme()(translate('menu')(ResponsiveAppBar));
